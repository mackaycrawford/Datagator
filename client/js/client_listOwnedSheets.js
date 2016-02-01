Template.listOwnedSheets.onRendered(function() {

  $(document).ready(function() {
      
  })
})

Template.listOwnedSheets.helpers({
  listSheets: function(){
    return sheetDefinitions.find()
  }
})
