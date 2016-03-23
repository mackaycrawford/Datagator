Template.authorViewSharedData.onRendered(function() {
  //Meteor.subscribe('data')
  console.log("template rendered")
  $(document).ready(function() {
    console.log("document ready")
  
    $("#getSharedDataButton").click(function(){
      sg = $("#shareGroupsDropdown").val()
      console.log(sg)
      Meteor.call('getSharedData', sg, queryString()['sheetId'], function(err, res){
          console.log(err)
          console.log(res)
          if(typeof(res) != 'undefined'){
            $("#authorSharedDataGrid").show()
            sm_renderGrid("#authorSharedDataGrid", res)
          } else {
            $("#authorSharedDataGrid").hide()
          }
        
      })
       ai("getSharedData called")
    })
    
    
    
  })
})

Template.authorViewSharedData.helpers({
  groups: function(){
    return groups.find({'groupOwner': Meteor.userId(), 'sheetPermissions.sheetId': queryString()['sheetId']})
  }
})
