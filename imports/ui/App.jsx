import { Meteor } from 'meteor/meteor'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TestScreen from './screens/TestScreen'
import ClientScreen from './screens/ClientScreen'
import AddClientScreen from './screens/AddClientScreen'
import IntegrationsScreen from './screens/IntegrationsScreen'
import ProjectScreen from './screens/ProjectScreen'
import Navbar from './Navbar'

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/addclient' element={<AddClientScreen />} />
        <Route path='/:id/integrations' element={<IntegrationsScreen />} />
        <Route path='/:id/projects/:projectId' element={<ProjectScreen />} />
        <Route path='/:id' element={<ClientScreen />} />
        <Route path='/' element={<TestScreen />} exact />
      </Routes>
    </Router>
  )
}
