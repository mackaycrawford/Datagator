groups = new Mongo.Collection("groups");

//groups.insert({groupOwner: "sWbBmNYof57xWhhke", groupName: "myFirstGroup", groupEmails: ["sirmartymoose@gmail.com", "mackaycrawford@gmail.com"], sheetPermissions: [{sheetId: "123", sheetAccessQuery: "select * from t"}]})

if (Meteor.isServer) {
  Meteor.publish('groups',function() {
    return groups.find({'groupOwner': this.userId})
  })
}


if (Meteor.isClient) {
  Meteor.subscribe("groups")
  console.log("Subscribed to Groups")
}
