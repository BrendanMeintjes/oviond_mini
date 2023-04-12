import { Meteor } from 'meteor/meteor'
import React, { useState, Fragment } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '/imports/db/TasksCollection'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Task } from './Task'
import { TaskForm } from './TaskForm'
import { LoginForm } from './LoginForm'
import { LoginWithFaceBook } from './LoginWithFaceBook'
import { NewClient } from './NewClient'
import { Client } from './Client'

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked)

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id)

export const App = () => {
  const user = useTracker(() => Meteor.user())

  const [hideCompleted, setHideCompleted] = useState(false)

  const hideCompletedFilter = { isChecked: { $ne: true } }

  const userFilter = user ? { userId: user._id } : {}

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter }

  const tasks = useTracker(() => {
    if (!user) {
      return []
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch()
  })

  const clients = useTracker(() =>
    ClientsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  )
  console.log(clients)
  console.log(tasks)

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0
    }

    return TasksCollection.find(pendingOnlyFilter).count()
  })

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`

  const logout = () => Meteor.logout()

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              {pendingTasksTitle}
            </h1>{' '}
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>{' '}
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>
            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
            <LoginWithFaceBook />
            <NewClient user={user} />
            <ul className="tasks">
              {clients.map((client) => (
                <Client key={client._id} client={client} />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}
