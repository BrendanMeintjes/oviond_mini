import React, { useState } from 'react'
import { ClientsCollection } from '/imports/db/ClientsCollection'

export const ClientForm = async () => {
  const [userAccessToken, setUserAccessToken] = useState('')
  const user = await Meteor.users.findOne(userId)
  const fbAccessToken = user?.services.facebook.accessToken
  console.log(user)
  console.log(fbAccessToken)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text) return

    ClientsCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id,
    })

    setText('')
  }

  return <></>
}
