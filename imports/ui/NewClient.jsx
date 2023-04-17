import { Meteor } from 'meteor/meteor'
import React, { useState } from 'react'
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
        navigate(`/client/${newClientId}/integrations`)
      }
    })
  }

  return (
    <div>
      <h5 className='text-lg font-semibold'>Add New Client</h5>
      <div className='mx-auto max-w-lg'>
        <form className='bg-white w-full shadow-md rounded px-8  pb-8 mb-4' onSubmit={handleSubmit}>
          <h3 className='py-5 text-xl font-semibold'>Client Details</h3>
          <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor='clientCompanyName'>
            Client Company Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='clientCompanyName'
            type='text'
            placeholder='enter company name...'
            value={clientCompanyName}
            onChange={(e) => setClientCompanyName(e.target.value)}
          />
          <div className='flex justify-end pt-10'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto' type='submit'>
              Add Client{' '}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
