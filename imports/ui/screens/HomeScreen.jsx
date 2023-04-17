import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'

const HomeScreen = () => {
  const userId = Meteor.userId()
  const clients = useTracker(() => ClientsCollection.find({ userId }, { sort: { createdAt: -1 } }).fetch())

  return (
    <>
      <div className='flex justify-end'>
        <Link className='cardLink' to={'/addclient'}>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
            Add Client
          </button>
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {clients.map((client) => (
          <Client key={client._id} client={client} />
        ))}
      </div>
    </>
  )
}

export default HomeScreen
