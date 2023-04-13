import { Meteor } from 'meteor/meteor'
import { ClientsCollection } from '/imports/db/ClientsCollection'

Meteor.methods({
  'clients.insert'(clientCompanyName) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    const newClientId = ClientsCollection.insert({
      clientCompanyName,
      userId: this.userId,
    })
    return newClientId
  },

  'clients.remove'(clientId) {
    check(clientId, String)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    ClientsCollection.remove(clientId)
  },
})
