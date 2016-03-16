sheetData = new Mongo.Collection("sheetData");


if (Meteor.isServer) {
  Meteor.publish('sheetData', function() {
    return sheetData.find({authorId: this.userId})
  })
  
  Meteor.publish('sheetIdData', function(sheetId) {
    return sheetData.find({authorId: this.userId, sheetId: sheetId})
  })
}


if (Meteor.isClient) {
  //Meteor.subscribe("sheetData")
}
