import React from 'react'
import { Meteor } from 'meteor/meteor'

export const LoginWithFaceBook = () => {
  const handleFaceBookLogin = () => {
    Meteor.loginWithFacebook({
      requestPermissions: ['public_profile', 'email'],
      loginStyle: 'popup',
    })
  }

  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 w-100"
      onClick={handleFaceBookLogin}
    >
      <div className="flex">
        <i className="fa-brands fa-square-facebook text-xl mr-2 text-white opacity-75"></i>
        <p className="text-white opacity-75">Login with FaceBook</p>
      </div>
    </button>
  )
}
