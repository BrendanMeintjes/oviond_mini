import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import DeleteClient from '../DeleteClient'

const ClientEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // get the client data from the database
  const client = useTracker(() => ClientsCollection.findOne({ _id: id }))

  // create a state variable for the updated client name
  const [name, setName] = useState(client?.clientCompanyName)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault()
    Meteor.call('client.update', id, name)
    navigate(`/client/${id}`)
  }

  const handleDeleteModalOpen = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Edit Client</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 font-medium">
            Client Name
          </label>
          <input
            type="text"
            id="name"
            className="border rounded-lg py-2 px-3"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </form>
      <button
        onClick={handleDeleteModalOpen}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg ml-4"
      >
        Delete Client
      </button>
      {showDeleteModal && (
        <DeleteClient client={client} onClose={handleDeleteModalClose} />
      )}
    </div>
  )
}

export default ClientEditScreen
