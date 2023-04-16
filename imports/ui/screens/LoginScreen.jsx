import React from 'react'
import { LoginWithFaceBook } from '../LoginWithFaceBook'

const LoginScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-blue-500 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-md shadow-lg p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Login with Facebook</h1>
        <p className="pb-5">
          Please log in with the Facebook account that you use to manage the
          page(s) you'd like to access.
        </p>
        <LoginWithFaceBook />
      </div>
    </div>
  )
}
export default LoginScreen
