Template.listOwnedSheets.onRendered(function() {

showSheetName = function(){
    sId = queryString()['sheetId']
    sheetName = sheetDefinitions.find({'_id': sId}).fetch()[0]['sheetName']
    $("#sheetNameText").html(sheetName)
}

  $(document).ready(function() {
      
  })
})

Template.listOwnedSheets.helpers({
  listSheets: function(){
    return sheetDefinitions.find({authorId: Meteor.userId()})
  }
})
