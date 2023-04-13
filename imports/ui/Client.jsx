import React from 'react'
import { Link } from 'react-router-dom'

export const Client = ({ client }) => {
  return (
    <Link className='cardLink' to={`/${client._id}`}>
      <div className='max-w-sm rounded overflow-hidden shadow-lg my-6 '>
        <img className='w-full' src='/img/card-top.jpg' alt='Sunset in the mountains'></img>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{client.clientCompanyName}</div>
        </div>
      </div>
    </Link>
  )
}
