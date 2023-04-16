import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'
import { NewClient } from '../NewClient'
import { Chart, client, project } from '../Project'

const ProjectScreen = () => {
  return (
    <div>
      <Chart />
    </div>
  )
}

export default ProjectScreen
