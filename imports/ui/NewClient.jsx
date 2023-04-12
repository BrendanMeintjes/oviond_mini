import { Meteor } from 'meteor/meteor'

import React, { useState } from 'react'
import { ClientsCollection } from '/imports/db/ClientsCollection'

export const NewClient = () => {
  const [clientCompanyName, setClientCompanyName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!clientCompanyName) return

    Meteor.call('clients.insert', clientCompanyName)
  }

  return (
    <div>
      <h3>New Client</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='company name' value={clientCompanyName} onChange={(e) => setClientCompanyName(e.target.value)} />
        {/* <br />
        <label htmlFor='name'>Client Website</label>

        <input type='text' name='clientWebsite' onChange={(e) => setFormData({ ...formData, clientWebsite: e.target.value })} required />
        <br />

        <label htmlFor='name'>Client Name</label>
        <input type='text' name='clientName' onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} required />
        <br /> */}

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
