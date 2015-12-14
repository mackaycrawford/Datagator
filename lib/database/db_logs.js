logs = new Mongo.Collection("logs");

logging = true;


if (Meteor.isServer) {
  Meteor.publish('logs', function() {
    return logs.find()
  })
}


if (Meteor.isClient) {
  Meteor.subscribe("logs")
}
