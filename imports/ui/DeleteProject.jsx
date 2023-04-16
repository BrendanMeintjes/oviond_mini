import React from 'react'
import { Meteor } from 'meteor/meteor'
import { ProjectsCollection } from '/imports/db/ProjectsCollection'

const DeleteProject = ({ project, onClose }) => {
  const handleDelete = () => {
    Meteor.call('projects.remove', project._id)
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Confirm deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete the project "{project.projectName}"?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProject
