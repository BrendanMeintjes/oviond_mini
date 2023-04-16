import React from 'react'
import { Meteor } from 'meteor/meteor'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { ProjectsCollection } from '/imports/db/ProjectsCollection'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteClient = ({ client, onClose }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDelete = () => {
    console.log(id)
    Meteor.call('projects.removeAll', id)
    Meteor.call('client.remove', id)
    onClose()
    navigate('/')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Confirm deletion</h2>
        <p>
          Are you sure you want to delete the client "{client.clientCompanyName}
          "?
        </p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteClient
