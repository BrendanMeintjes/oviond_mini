import React from 'react'
import { useParams } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import NewProject from '../NewProject'
import { ListProject } from '../ListProject'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { ProjectsCollection } from '/imports/db/ProjectsCollection'

const ClientScreen = () => {
  const { id } = useParams()

  const client = useTracker(() => ClientsCollection.findOne({ _id: id }))
  const projects = useTracker(() => ProjectsCollection.find({ clientId: id }).fetch())
  return (
    <div>
      <div className='flex justify-between items-center pb-5'>
        <div className='flex items-center py-2'>
          <i className='fa-solid fa-briefcase text-5xl mr-2 text-blue-600 opacity-75'></i>
          <div>
            <h4 className='text-2xl font-bold'>Projects</h4>
            <p className='text-gray-500'>Client: {client?.clientCompanyName}</p>
          </div>
        </div>
        <NewProject />
      </div>

      {projects.map((project) => (
        <ListProject key={project._id} project={project} />
      ))}
    </div>
  )
}

export default ClientScreen
