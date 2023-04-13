import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'
import { NewClient } from '../NewClient'

const AddClientScreen = () => {
  return (
    <div>
      <NewClient />
    </div>
  )
}

export default AddClientScreen
