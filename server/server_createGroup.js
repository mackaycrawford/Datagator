Meteor.methods({
  createGroup: function(groupName, groupEmails){
      d =  groups.insert({groupOwner: this.userId, groupName: groupName, groupEmails: groupEmails, sheetPermissions: []})
      console.log("created group id: " + d)
      return d
  }  
    
})