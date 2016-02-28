// a process called "Exchange Processor should be kicked off
// It should look for NEW emails with attachments 
// If there are new emails 
    // It should see if there are any matching datafeeds and authors
        //If there are new datafeeds
            // It should process the files
            
//sheetData.remove({})
//sheetDefinitions.remove({})
            
if (Meteor.isServer) {
    ep_getEmailsWithAttachments = function(){
         ctxioClient.accounts(contextIOAccountId).messages().get({
            limit: 15,
            subject: "/datagator/", 
            file_name: "*x"
        }, 
            Meteor.bindEnvironment(function(err, response) {
                for(var i=0; i<response.body.length; i++){
                    if(sheetDefinitions.find({processedFiles: response.body[i]['files'][0]['file_id']}).fetch().length > 0){
                        //This email has already been processed
                        console.log("AlreadyProcessed")
                        return
                    } else{
                        
                        //This email has not been processed yet
                        fName = response.body[i]['files'][0]['file_name']
                        //console.log(fName)
                        fId = response.body[i]['files'][0]['file_id']
                        // Assuming here that the sender matches the sheetAuthor 
                        // Get the email senders equivilant datagator id 
                        emailFrom = response.body[i]['addresses']['from']['email']
                        dgAuthor = Meteor.users.findOne({'emails.address': emailFrom})
                        if(typeof(dgAuthor) != 'undefined'){
                            dgAuthorId = dgAuthor['_id']
                        }
                        
                        // See if there is at least one sheet def that is looking for that name 
                        if(typeof(dgAuthorId) != 'undefined'){
                            console.log("looking for fileName: " + fName)
                            m = sheetDefinitions.findOne({'insertFileName':  fName, 'authorId': dgAuthorId})
                            console.log(m)
                            console.log(typeof(m))
                            if(typeof(m) != 'undefined'){
                                console.log("THISH IS RUN")
                                sheetId = m['_id']
                                authorId = m['authorId']
                                fileName = fName
                                    // Get the file
                                ctxioClient.accounts(contextIOAccountId).files(fId).content().get(process.env.PWD + '/.emails/' + fileName, Meteor.bindEnvironment(function(err, response) {
                                    // process the file
                                    if(sheetDefinitions.find({processedFiles: fId}).fetch().length == 0){
                                        processExcel(fileName, authorId, sheetId, 'append')
                                        sheetDefinitions.update({_id: sheetId}, {$push: {processedFiles: fId}})
                                    }
                                }));
                                
                                
                                
                            }
                            
                        }
                    
                    
                        
                    }
                }
            })
        )
    }

    
    exchangeProcessor = function(){
        ep_getEmailsWithAttachments()
    }
}


if (Meteor.isServer) {
    Meteor.methods({
        callExchangeProcessor: function(){
            exchangeProcessor()
        }
    })
}