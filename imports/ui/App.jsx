import { Meteor } from 'meteor/meteor'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data'
import HomeScreen from './screens/HomeScreen'
import ClientScreen from './screens/ClientScreen'
import AddClientScreen from './screens/AddClientScreen'
import IntegrationsScreen from './screens/IntegrationsScreen'
import ProjectScreen from './screens/ProjectScreen'
import ClientEditScreen from './screens/ClientEditScreen'
import LoginScreen from './screens/LoginScreen'
import Navbar from './Navbar'

export const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const user = useTracker(() => Meteor.user())

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <Router>
        <Navbar />

        <main className='container mx-auto px-4 max-w-screen-xl'>
          <LoginScreen />
        </main>
      </Router>
    )
  }
  return (
    <Router>
      <Navbar />
      <main className='container mx-auto px-4 max-w-screen-xl'>
        {' '}
        <Routes>
          <Route path='/addclient' element={<AddClientScreen />} />
          <Route path='/client/:id/integrations' element={<IntegrationsScreen />} />
          <Route path='/client/:id/projects/:projectId' element={<ProjectScreen />} />
          <Route path='/client/:id/edit' element={<ClientEditScreen />} />
          <Route path='/client/:id' element={<ClientScreen />} />
          <Route path='/' element={<HomeScreen />} exact />
        </Routes>
      </main>
    </Router>
  )
}
