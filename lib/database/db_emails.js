emails = new Mongo.Collection("emails");


if (Meteor.isServer) {
  Meteor.publish('emails', function() {
    return emails.find()
  })
}


if (Meteor.isClient) {
  Meteor.subscribe("emails")
}
