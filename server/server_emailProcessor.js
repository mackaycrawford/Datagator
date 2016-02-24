contextIOKey = "ju6vky80"
contextIOSecret = "RFcFydgT5fmzpDko"
contextIOAccountId = "56cb15138d9b27ec1c8b4569" // Giraffebones
// Playground: https://console.context.io/#explore/2.0/accounts/messages/get
var ContextIO = Meteor.npmRequire('contextio');
fs = Meteor.npmRequire('fs');
path = Meteor.npmRequire('path');
var ctxioClient = new ContextIO.Client({
  key: contextIOKey,
  secret: contextIOSecret
});

clearEmailContents = function(){
  emails.remove({})
}

function pe(fn){ctxioClient.accounts(contextIOAccountId).messages().get({limit:15, subject: "/datagator/"},Meteor.bindEnvironment(function (err, response) {
      //fn("HI")
      fn(response.body)
  }))
}

function pf(fileId, fn){
  			ctxioClient.accounts(contextIOAccountId).files(fileId).content().get(process.env.PWD + '/tmp/hi.txt',Meteor.bindEnvironment(function (err, response) {
      //fn("HI")
      fn(response)
  }) );
}


pe(function(response){
  
  // Testing only 
  clearEmailContents()
  // end testing
  for(i=0; i<response.length; i++){
    if(typeof(response[i]['files']) !== 'undefined'){
    emailObj = {}
    emailObj['file_name'] = response[i]['files'][0]['file_name']
    emailObj['file_name_structure'] = response[i]['files'][0]['file_name_structure']
    
    emailObj['subject'] = response[i]['subject']
    emailObj['documentPassword'] = response[i]['subject'].split(" ")[1]
    emailObj['message_id'] = response[i]['message_id']
    emailObj['resource_url'] = response[i]['resource_url']
    emailObj['fromEmail'] = response[i]['addresses']['from']['email']
    emailObj['fromName'] = response[i]['addresses']['from']['name']
    emailObj['date_received'] = response[i]['date_received']
    emailObj['ownerUserId'] = null
    emailObj['ownerUserEmail'] = null
    emailObj['processData'] = new Date()
    
    
    emailObj['file_id'] = response[i]['files'][0]['file_id']
    emailObj['attachmentProcessed'] = null
    emailObj['attachmentContentUrl'] = null
    emailObj['attachmentContent'] = null
    
    existingEntry = emails.find({'message_id': emailObj['message_id']}).fetch()
    if(existingEntry.length > 0){
      console.log("Already exists")
    } else {
    emails.insert(emailObj)
    }
    }
  }
})



fetchAttachments = function(){
  // get all meteor entries with the 'attachmentProcessed' = Null
    wd = emails.find({"attachmentProcessed": null}).fetch()
  
  // For each item 
      for(i=0; i<wd.length; i++){
  
    // call the content url https://context.io/docs/2.0/accounts/files/content
        
  
    // Add the content url to the object 
    
    // Get the content 
    
    // Store the content
      }
}


testFileId = "56cb1ace2944fb173d8b4578"
pf(testFileId, function(err,res){
  console.log(err)
  console.log(res)
})