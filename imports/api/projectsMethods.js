import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { ProjectsCollection } from '/imports/db/ProjectsCollection'

Meteor.methods({
  'projects.insert'(projectName, id, likesData) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    const newProjectId = ProjectsCollection.insert({
      projectName,
      clientId: id,
      fbLikes: likesData,
    })
    return newProjectId
  },

  'projects.update'(id, name) {
    ProjectsCollection.update({ _id: id }, { $set: { projectName: name } })
  },

  'projects.remove'(projectId) {
    check(projectId, String)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    ProjectsCollection.remove(projectId)
  },

  'projects.removeAll'(id) {
    check(id, String)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    ProjectsCollection.remove({ clientId: id })
  },
})
