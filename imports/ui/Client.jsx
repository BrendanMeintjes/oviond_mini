import React from 'react'
import { Link } from 'react-router-dom'

export const Client = ({ client }) => {
  return (
    <Link className="cardLink" to={`/client/${client._id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg my-6 ">
        <img className="w-full" src="/images/client.jpg" alt="client"></img>
        <div className="px-6 py-4">
          <div className="font-semibold text-lg text-center mb-1">
            {client.clientCompanyName}
          </div>
        </div>
      </div>
    </Link>
  )
}
