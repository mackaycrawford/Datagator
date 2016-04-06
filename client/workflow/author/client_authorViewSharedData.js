Template.authorViewSharedData.onRendered(function() {
  cLog("authorViewSharedData Rendered")

  $(document).ready(function() {

    $("#getSharedDataButton").click(function() {
      sg = $("#shareGroupsDropdown").val()
      console.log(sg)
      Meteor.call('getSharedData', sg, queryString()['sheetId'], function(err, res) {
        if (typeof(res) != 'undefined') {
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
  sharedGroupsList: function() {
    return groups.find({
      'sheetPermissions.sheetId': Session.get("sessionSheetId")
    })
  }
})
