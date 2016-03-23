Template.import.onRendered(function() {

  $(document).ready(function() {
    
    $("#renameSheetButton").click(function(){
      console.log("rename clicked")
      var nsn = $("#sheetNameTextInput").val()
      Meteor.call('updateSheetName', queryString()['sheetId'], nsn, function(err,res){
        $("#sheetNameText").html(res)
      })
       ai("Sheet Renamed")
    })
    
        $("#deleteSheetButton").click(function(){
      console.log("delete clicked")
      Meteor.call('deleteEntireSheet', queryString()['sheetId'], function(err,res){
        if(res == true){
          Router.go("listOwnedSheets")
        }
      })
       ai("ShareGroup Deleted")
    })


  })
})

Template.import.helpers({

})
