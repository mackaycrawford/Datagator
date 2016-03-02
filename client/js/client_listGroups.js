Template.listGroups.onRendered(function() {
  //Meteor.subscribe('data')
  console.log("template rendered")
  $(document).ready(function() {
    console.log("document ready")
    $("#createGroupButton").click(function(){
      Router.go("createGroup")
    })
    
    
  })
})

Template.listGroups.helpers({
  groups: function(){
    return groups.find({'groupOwner': Meteor.userId()})
  }
})
