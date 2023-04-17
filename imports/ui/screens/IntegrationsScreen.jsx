import { Meteor } from 'meteor/meteor'
import React, { useState, useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'

const IntegrationsScreen = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const { id } = useParams()
  navigate = useNavigate()

  const client = useTracker(() => ClientsCollection.findOne({ _id: id }))

  const user = useTracker(() => Meteor.user())
  const pages = user?.profile?.pages

  const handlePageChange = (e) => {
    const selectedPageId = e.target.value
    setSelectedPage(selectedPageId)
    const selectedPage = pages.find((page) => page.id === selectedPageId)
    setAccessToken(selectedPage.access_token)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    Meteor.call('client.addToken', id, selectedPage, accessToken, (error) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Client page and token updated successfully!')
      }
    })
    navigate(`/client/${id}`)
  }

  return (
    <>
      <button className={`border-2 rounded-lg px-8 py-4 w-96 ${client?.accessToken ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'}`} type='button' onClick={() => setShowModal(true)}>
        <div className='flex items-center justify-between h-full align-items-end'>
          <div className='flex items-center'>
            <i className='fa-brands fa-square-facebook text-5xl mr-2 text-blue-900 opacity-75'></i>
            <div className=''>
              <h4 className='font-semibold text-left'>Facebook</h4>
              <div className='flex'>
                <p className='text-gray-500'>Social Media</p>
              </div>
            </div>
          </div>
          {client?.accessToken && (
            <div className='flex items-center align-bottom'>
              <p className='text-gray-500 mr-2'>Connected</p>
              <i className='fas fa-check-circle text-green-500'></i>
            </div>
          )}
        </div>
      </button>

      {showModal ? (
        <>
          <div className='fixed inset-0 flex items-center justify-center'>
            <div className='fixed inset-0 bg-gray-900 opacity-75'></div>
            <div className='bg-white rounded-lg p-6 z-10 w-full max-w-md'>
              <div className='flex items-top'>
                <i className='fa-brands fa-square-facebook text-xl mr-2 text-blue-900 opacity-75'></i>
                <h2 className='text-lg font-bold mb-4'>Facebook Integration</h2>
              </div>
              <div className='mb-4'>
                <label htmlFor='projectName' className='block font-bold mb-2'>
                  Select Page
                </label>
                {pages.map((page) => (
                  <div key={page.id}>
                    <input type='radio' id={page.id} name='pages' value={page.id} checked={selectedPage === page.id} onChange={handlePageChange} />
                    <label htmlFor={page.id}> {page.name}</label>
                  </div>
                ))}
                {/* {selectedPage && <p>You selected: {selectedPage}</p>} */}
              </div>

              {/*footer*/}
              <div className='flex justify-end'>
                <button type='button' className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2' onClick={handleSubmit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default IntegrationsScreen
