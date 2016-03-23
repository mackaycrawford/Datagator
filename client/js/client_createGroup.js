Template.createGroup.onRendered(function() {
    
    clientCreateGroup = function(groupName, groupEmailsArray){
        Meteor.call('createGroup', groupName, groupEmailsArray)
    }
  //Meteor.subscribe('data')
  console.log("template rendered")
  $(document).ready(function() {
    console.log("document ready")
    $("#createGroupSubmitButton").click(function(x){
        x.preventDefault()
        gName = $("#groupNameText").val()
        gEmails = $("#groupEmailsText").val()
        gEmails = gEmails.split(",")
        
        
        clientCreateGroup(gName, gEmails)
        ai("Group Created")
    })
    
  })
})

Template.createGroup.helpers({

})
