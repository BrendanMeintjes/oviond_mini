import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import DeleteClient from '../DeleteClient'

const ClientEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const client = useTracker(() => ClientsCollection.findOne({ _id: id }))

  const [name, setName] = useState(client?.clientCompanyName)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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
    <div className='w-full max-w-3xl mx-auto py-5'>
      <div className='px-5 bg-blue-50 py-5 border-t-2 border-blue-600'>
        <h1 className='text-3xl font-bold mb-4'>Edit Client</h1>
        <form className='' onSubmit={handleSubmit}>
          <div className='flex flex-col mb-4'>
            <label htmlFor='name' className='mb-2 font-medium'>
              Client Name
            </label>
            <input type='text' id='name' className='border rounded-lg py-2 px-3' value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4  rounded-lg'>
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <div className='flex justify-between items-center bg-red-100 border-t-2 border-red-500 px-5'>
        <h1 className='text-3xl font-bold mb-4 my-5'>Delete Client</h1>

        <div className='flex justify-end '>
          <button onClick={handleDeleteModalOpen} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg ml-4'>
            Delete Client
          </button>
          {showDeleteModal && <DeleteClient client={client} onClose={handleDeleteModalClose} />}
        </div>
      </div>
    </div>
  )
}

export default ClientEditScreen
