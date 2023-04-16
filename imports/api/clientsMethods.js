import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { ClientsCollection } from '/imports/db/ClientsCollection'
import { ProjectsCollection } from '/imports/db/ProjectsCollection'

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

  'client.update'(id, name) {
    ClientsCollection.update({ _id: id }, { $set: { clientCompanyName: name } })
  },

  'client.remove'(id) {
    check(id, String)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    ProjectsCollection.remove({ clientId: id })
    ClientsCollection.remove(id)
  },
})
