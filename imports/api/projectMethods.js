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

  'projects.remove'(projectId) {
    check(projectId, String)

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.')
    }

    ProjectsCollection.remove(projectId)
  },
})
