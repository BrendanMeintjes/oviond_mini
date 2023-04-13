import { Meteor } from 'meteor/meteor'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TestScreen from './screens/TestScreen'
import ClientScreen from './screens/ClientScreen'
import AddClientScreen from './screens/AddClientScreen'
import IntegrationsScreen from './screens/IntegrationsScreen'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/addclient' element={<AddClientScreen />} />
        <Route path='/:id/integrations' element={<IntegrationsScreen />} />
        <Route path='/:id' element={<ClientScreen />} />
        <Route path='/' element={<TestScreen />} exact />
      </Routes>
    </Router>
  )
}
