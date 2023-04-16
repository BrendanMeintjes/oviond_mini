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
      <button
        className={`border-2 rounded-lg px-8 py-4 w-96 ${
          client?.accessToken
            ? 'border-blue-500'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        type="button"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center justify-between h-full align-items-end">
          <div className="flex items-center">
            <i className="fa-brands fa-square-facebook text-5xl mr-2 text-blue-900 opacity-75"></i>
            <div className="">
              <h4 className="font-semibold text-left">Facebook</h4>
              <div className="flex">
                <p className="text-gray-500">Social Media</p>
              </div>
            </div>
          </div>
          {client?.accessToken && (
            <div className="flex items-center align-bottom">
              <p className="text-gray-500 mr-2">Connected</p>
              <i className="fas fa-check-circle text-green-500"></i>
            </div>
          )}
        </div>
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div>
                  <h2>Select your page:</h2>
                  {pages.map((page) => (
                    <div key={page.id}>
                      <input
                        type="radio"
                        id={page.id}
                        name="pages"
                        value={page.id}
                        checked={selectedPage === page.id}
                        onChange={handlePageChange}
                      />
                      <label htmlFor={page.id}>{page.name}</label>
                    </div>
                  ))}
                  {/* {selectedPage && <p>You selected: {selectedPage}</p>} */}
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default IntegrationsScreen
