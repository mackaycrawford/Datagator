Template.import.onRendered(function() {
  cLog("import Rendered")
  $(document).ready(function() {
    $("#renameSheetButton").click(function() {
      var nsn = $("#sheetNameTextInput").val()
      Meteor.call('updateSheetName', queryString()['sheetId'], nsn, function(err, res) {
        $("#sheetNameText").html(res)
      })
      ai("Sheet Renamed")
    })
    $("#deleteSheetButton").click(function() {
      Meteor.call('deleteEntireSheet', queryString()['sheetId'], function(err, res) {
        if (res == true) {
          Router.go("listOwnedSheets")
        }
      })
      ai("ShareGroup Deleted")
    })
  })
})
