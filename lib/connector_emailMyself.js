if (Meteor.isClient) {
  Template.createSheet.onRendered(function() {
    connector_emailMyself = function(sheetId){
      console.log("connector_emailMyself called")
      fName = getFileName()
      console.log("Filename is" + fName)
      console.log("sheetid is " + sheetId)
      Meteor.call('insertFileName', sheetId, fName)
    }
    
    getFileName = function(){
      fName = $("#fileName").val()
      return fName
    }
  })
}



if (Meteor.isServer) {
  Meteor.methods({
    insertFileName: function(sheetId, fileName){
      console.log("filename = " + fileName)
      sheetDefinitions.update({_id: sheetId}, {$set:{"insertFileName": fileName}})
      
    }
  })
}
