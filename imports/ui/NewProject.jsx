import { Meteor } from 'meteor/meteor'
import React, { useState, useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link, useFetcher, useNavigate, useParams } from 'react-router-dom'
import { ProjectsCollection } from '/imports/db/ProjectsCollection'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import axios from 'axios'

import { Client } from './Client'

const NewProject = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [projectName, setProjectName] = useState('')
  const [likesData, setLikesData] = useState([])

  const { id } = useParams()
  navigate = useNavigate()

  // const page = useTracker(() => ClientsCollection.findOne({ _id: id }))

  const user = useTracker(() => Meteor.user())
  const pages = user?.profile?.pages
  console.log(pages)

  const fetchLikesData = async () => {
    const foundClient = ClientsCollection.findOne({ _id: id })
    if (foundClient) {
      const pageId = foundClient?.pageId
      const accessToken = foundClient?.accessToken

      const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
      const now = Math.floor(Date.now() / 1000)
      const response = await axios.get(`https://graph.facebook.com/${pageId}/insights/page_fans?since=${thirtyDaysAgo}&until=${now}&period=day&access_token=${accessToken}`)
      const data = await response.data.data[0].values
      setLikesData(data)
      console.log(likesData)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchLikesData()
    console.log('FETCHED DATA:', likesData)

    if (!projectName) return

    Meteor.call('projects.insert', projectName, id, likesData, (error, newProjectId) => {
      if (error) {
        console.log(error)
      } else {
        navigate(`/${id}/projects/${newProjectId}`)
      }
    })
  }

  return (
    <>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button' onClick={() => setShowModal(true)}>
        Add Project
      </button>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>Modal Title</h3>
                  <button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none' onClick={() => setShowModal(false)}>
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>×</span>
                  </button>
                </div>
                {/*body*/}

                <div>
                  <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='projectName'>
                      Project Name
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='projectName' type='text' placeholder='project name' value={projectName} onChange={(e) => setProjectName(e.target.value)} />

                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                      Submit
                    </button>
                  </form>
                </div>

                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                  <button className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' type='button' onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' type='button' onClick={handleSubmit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  )
}

export default NewProject
