import { Meteor } from 'meteor/meteor'

import React, { useState } from 'react'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { useNavigate } from 'react-router-dom'

export const NewClient = () => {
  const [clientCompanyName, setClientCompanyName] = useState('')
  navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!clientCompanyName) return

    Meteor.call('clients.insert', clientCompanyName, (error, newClientId) => {
      if (error) {
        console.log(error)
      } else {
        navigate(`/${newClientId}/integrations`)
      }
    })
  }

  return (
    <div className='w-full max-w-xs'>
      <h3>New Client</h3>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='clientCompanyName'>
          Company Name
        </label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='clientCompanyName' type='text' placeholder='company name' value={clientCompanyName} onChange={(e) => setClientCompanyName(e.target.value)} />

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
          Submit
        </button>
      </form>
      <p>I want to to go to integrations for this newly created client</p>
    </div>
  )
}
