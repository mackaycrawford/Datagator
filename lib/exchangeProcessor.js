//sheetData.remove({})
//sheetDefinitions.remove({})

if (Meteor.isServer) {
  
  
  ep_getEmailsWithAttachments = function() {
    responseArray = new Array()
    responseArray.push('ep_getEmailsWithAttachments called')
    ctxioClient.accounts(contextIOAccountId).messages().get({
        limit: 15,
        subject: "/datagator/",
        file_name: "*x"
      },
      Meteor.bindEnvironment(function(err, response) {
        for (var i = 0; i < response.body.length; i++) {
          console.log("A")
          responseArray.push("started a new email")
          fName = response.body[i]['files'][0]['file_name'];
          responseArray.push(fName) 
          fId = response.body[i]['files'][0]['file_id'];
          responseArray.push(fId)
          emailFrom = response.body[i]['addresses']['from']['email']
          responseArray.push(emailFrom)
          isAuthorMatch = Meteor.users.find({'emails.address': emailFrom}).fetch()
          
          if(isAuthorMatch.length > 0){
              console.log("B")
              dgAuthor = isAuthorMatch[0]['emails']['address']
              dgAuthorId = isAuthorMatch[0]['_id']
              
          } else {
              dgAuthor = null
              dgAuthorId = null
          }
          responseArray.push(dgAuthorId)
          responseArray.push(dgAuthor)

          if (sheetDefinitions.find({
              processedFiles: fId
            }).fetch().length > 0) {
            //This email has already been processed
          } else {
              //This email has not been processed yet
              console.log("C")

            if (dgAuthorId != null) {
              console.log("D")
              m = sheetDefinitions.find({'insertFileName': fName,'authorId': dgAuthorId}).fetch()[0]
              console.log("insertFileName is:" + fName)
              console.log("authorId is:" + dgAuthorId)
              console.log(m)
            } else {
              m = null  
            }
            
            if(m != null){
              console.log("E")
                sheetId = m['_id']
                authorId = m['authorId']
                fId = response.body[i]['files'][0]['file_id']
                fileName = fName
            } else {
                sheetId = null
                authorId = null
                fId = null
                fileName = null
            }

if(sheetId != null && authorId != null && fId != null && fileName != null){ 
  console.log("F")
                  cFileName = fileName
                  cFileId = fId
                  cSheetId = sheetId
                  cAuthorId = authorId
                  // Get the file
 ctxioClient.accounts(contextIOAccountId).files(cFileId).content().get(process.env.PWD + '/.emails/' + cFileName, Meteor.bindEnvironment(function(err, response) {
                  
                  // process the file
                  if (sheetDefinitions.find({
                      _id: cSheetId,
                      processedFiles: cFileId
                    }).fetch().length == 0) {
                      console.log("G")
                        console.log("fileName is: " + cFileName)
                        console.log("authorId is: " + cAuthorId)
                        console.log("sheetId is: " + cSheetId)
                    

                    processExcel(cFileName, cAuthorId, cSheetId, 'append')
                    sheetDefinitions.update({
                      _id: cSheetId
                    }, {
                      $push: {
                        processedFiles: cFileId
                      }
                    })
                    
                    
                    
                  }
                }));
}
            
          }
        }
        
      })
    )
    return responseArray
  }


  exchangeProcessor = function() {
    res = ep_getEmailsWithAttachments()
    return res
  }
}


if (Meteor.isServer) {
  Meteor.methods({
    callExchangeProcessor: function() {
     return exchangeProcessor()
    }
  })
}
