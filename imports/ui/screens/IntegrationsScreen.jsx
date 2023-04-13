import { Meteor } from 'meteor/meteor'
import React, { useState, useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { Client } from '../Client'

const IntegrationsScreen = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [selectedPage, setSelectedPage] = useState(null)
  const { id } = useParams()

  // const page = useTracker(() => ClientsCollection.findOne({ _id: id }))

  const user = useTracker(() => Meteor.user())
  const pages = user?.profile?.pages
  console.log(pages)

  const handlePageChange = (e) => {
    setSelectedPage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    ClientsCollection.upsert(
      { _id: id }, // filter by client ID
      {
        $set: {
          pageId: selectedPage,
        },
      }
    )
    console.log(selectedPage)
  }

  return (
    <>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button' onClick={() => setShowModal(true)}>
        Facebook
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
                  <h2>Select your page:</h2>
                  {pages.map((page) => (
                    <div key={page.id}>
                      <input type='radio' id={page.id} name='pages' value={page.id} checked={selectedPage === page.id} onChange={handlePageChange} />
                      <label htmlFor={page.id}>{page.name}</label>
                    </div>
                  ))}
                  {/* {selectedPage && <p>You selected: {selectedPage}</p>} */}
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

export default IntegrationsScreen
