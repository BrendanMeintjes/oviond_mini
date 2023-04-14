import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'
import { NewClient } from '../NewClient'
import { Chart } from '../Project'

const ProjectScreen = () => {
  return (
    <div>
      <h3>HELLO FROM THE PROJECT SCREEN</h3> <Chart />
    </div>
  )
}

export default ProjectScreen
