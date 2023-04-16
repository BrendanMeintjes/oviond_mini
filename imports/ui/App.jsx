import { Meteor } from 'meteor/meteor'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TestScreen from './screens/TestScreen'
import ClientScreen from './screens/ClientScreen'
import AddClientScreen from './screens/AddClientScreen'
import IntegrationsScreen from './screens/IntegrationsScreen'
import ProjectScreen from './screens/ProjectScreen'
import { ClientEditScreen } from './screens/ClientEditScreen'
import Navbar from './Navbar'

export const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-4 max-w-screen-xl">
        {' '}
        <Routes>
          <Route path="/addclient" element={<AddClientScreen />} />
          <Route
            path="/client/:id/integrations"
            element={<IntegrationsScreen />}
          />
          <Route
            path="/client/:id/projects/:projectId"
            element={<ProjectScreen />}
          />
          <Route path="/client/:id/edit" element={<ClientEditScreen />} />
          <Route path="/client/:id" element={<ClientScreen />} />
          <Route path="/" element={<TestScreen />} exact />
        </Routes>
      </main>
    </Router>
  )
}
