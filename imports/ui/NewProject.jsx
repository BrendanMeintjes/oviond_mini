import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import axios from 'axios'

const NewProject = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [projectName, setProjectName] = useState('')

  const { id } = useParams()
  navigate = useNavigate()

  const fetchLikesData = async () => {
    const foundClient = ClientsCollection.findOne({ _id: id })
    if (foundClient) {
      const pageId = foundClient?.pageId
      const accessToken = foundClient?.accessToken

      const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
      const now = Math.floor(Date.now() / 1000) - 24 * 60 * 60
      const response = await axios.get(`https://graph.facebook.com/v16.0/${pageId}/insights/page_fans?since=${thirtyDaysAgo}&until=${now}&period=day&access_token=${accessToken}`)
      const likesData = await response?.data.data[0].values
      if (likesData) {
        Meteor.call('projects.insert', projectName, id, likesData, (error, newProjectId) => {
          if (error) {
            console.log(error)
          } else {
            navigate(`/client/${id}/projects/${newProjectId}`)
          }
        })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    fetchLikesData()
  }

  return (
    <>
      <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button' onClick={() => setShowModal(true)}>
        New Project
      </button>
      {showModal ? (
        <>
          <div className='fixed inset-0 flex items-center justify-center'>
            <div className='fixed inset-0 bg-gray-900 opacity-75'></div>
            <div className='bg-white rounded-lg p-6 z-10'>
              <h2 className='text-lg font-bold mb-4'>New Project</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor='projectName' className='block font-bold mb-2'>
                    Project name
                  </label>
                  <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='projectName' type='text' placeholder='project name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
                <div className='flex justify-end'>
                  <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
                    Add Project
                  </button>
                  <button type='button' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default NewProject
