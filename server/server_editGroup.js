Meteor.methods({
  getGroupDataById: function(gid){
      d = groups.find({_id: gid}).fetch()
      return d[0]
  }  ,
  
  updateGroup: function(gid, groupName, groupEmailsString){
      groupEmailsArray = groupEmailsString.split(",")
      groups.update({_id: gid}, {$set: {'groupName': groupName, 'groupEmails': groupEmailsArray}})
  }
    
})