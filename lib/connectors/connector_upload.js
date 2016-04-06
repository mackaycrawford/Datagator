if (Meteor.isClient) {
  Template.createSheet.onRendered(function() {
    connector_upload = function(sheetId){
      console.log("CONNECTOR UPLOAD RUN")
      fName = $("#uploadFileName").val()
      Meteor.call('processOGUpload', sheetId, fileName, function(err,res){
        console.log(err)
        console.log(res)
      })

    }
  })
  
  
  // file: client/init.js
/*
Meteor.startup(function() {

  Uploader.finished = function(index, fileInfo, templateContext) {
    console.log(fileInfo);
    fName = fileInfo['name']
    $("#uploadFileName").val(fName)
  }
})

*/
}




if (Meteor.isServer) {
  Meteor.methods({
    
    processOGUpload: function(sheetId, fileName){
      res = processUploadedExcelToJSON(fileName)
      processExcelJSONtoDB(res, this.userId, sheetId, "overwrite")
      return res
      
    }

  })
}
