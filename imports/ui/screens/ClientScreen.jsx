import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'

import { ClientsCollection } from '/imports/db/ClientsCollection'

const ClientScreen = () => {
  const { id } = useParams()
  //   const [client, seClient] = useState(null)

  //   useEffect(() => {
  //     const foundClient = ClientsCollection.findOne({ _id: id })
  //     setClient(foundClient)
  //     console.log('FOUND', foundClient)
  //     return () => subscription.stop()
  //   })

  const client = useTracker(() => ClientsCollection.findOne({ _id: id }))

  return (
    <div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>New Project</button>

      <h1>ClientScreen</h1>
      <p>Client name: {client?._id}</p>
    </div>
  )
}

export default ClientScreen
