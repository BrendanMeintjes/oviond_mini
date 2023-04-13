import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'
import { NewClient } from '../NewClient'

const TestScreen = () => {
  const clients = useTracker(() => ClientsCollection.find({}, { sort: { createdAt: -1 } }).fetch())

  return (
    <div>
      <Link className='cardLink' to={'/addclient'}>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='button'>
          Add Client
        </button>
      </Link>
      {clients.map((client) => (
        <Client key={client._id} client={client} />
      ))}{' '}
    </div>
  )
}

export default TestScreen
