import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { TasksCollection } from '/imports/api/TasksCollection'
import { ServiceConfiguration } from 'meteor/service-configuration'
import axios from 'axios'

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  })

const SEED_USERNAME = 'meteorite'
const SEED_PASSWORD = 'password'

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME)

  if (TasksCollection.find().count() === 0) {
    ;['First Task', 'Second Task', 'Third Task', 'Fourth Task', 'Fifth Task', 'Sixth Task', 'Seventh Task'].forEach((taskText) => insertTask(taskText, user))
  }

  Accounts.onLogin(async (loginInfo) => {
    if (loginInfo && loginInfo.user && loginInfo.user.services && loginInfo.user.services.facebook) {
      const fbId = loginInfo.user.services.facebook.id
      const fbAccessToken = loginInfo.user.services.facebook.accessToken
      console.log(`Facebook ID: ${fbId}`)
      console.log(`Facebook access token: ${fbAccessToken}`)

      const newData = await axios.get(`https://graph.facebook.com/v16.0/${fbId}/accounts?access_token=${fbAccessToken}`)
      console.log(newData.data)
      console.log(Meteor.userId())
      Meteor.users.update
    }
  })
})

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      loginStyle: 'popup',
      appId: '756492626176890', // insert your clientId here
      secret: 'de71e36459a311eb1c1e56198da1ff15', // insert your secret here
    },
  }
)

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '2f0010d7f56069b770a7', // insert your clientId here
      secret: 'eb1029a463f862919a6ed06f44c3cc8de063d713', // insert your secret here
    },
  }
)
