sheetDefinitions = new Mongo.Collection("sheetDefinitions");


if (Meteor.isServer) {
  Meteor.publish('sheetDefinitions', function() {
    //return sheetDefinitions.find({authorId: this.userId})
    return sheetDefinitions.find()
  })
}


if (Meteor.isClient) {
  Meteor.subscribe("sheetDefinitions")
}
