sheetData = new Mongo.Collection("sheetData");


if (Meteor.isServer) {
  Meteor.publish('sheetData', function() {
    return sheetData.find({authorId: this.userId})
  })
}


if (Meteor.isClient) {
  Meteor.subscribe("sheetData")
}
