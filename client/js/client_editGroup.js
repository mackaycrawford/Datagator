Template.editGroup.onRendered(function() {
    
    clientGetGroupData = function(){
        gid = queryString()['groupId']
        Meteor.call('getGroupDataById', gid, function(err,res){
            console.log(res)
            $("#groupNameText").val(res['groupName'])
            $("#groupEmailsText").val(res['groupEmails'].toString())
        })
    }

  $(document).ready(function() {
      
      clientGetGroupData()

    $("#updateGroupSubmitButton").click(function(x){
        x.preventDefault()
        gName = $("#groupNameText").val()
        gEmails = $("#groupEmailsText").val()
        Meteor.call('updateGroup', queryString()['groupId'], gName, gEmails)
        console.log(gEmails)
        
        //clientCreateGroup(gName, gEmails)
    })
    
  })
})

Template.createGroup.helpers({

})
