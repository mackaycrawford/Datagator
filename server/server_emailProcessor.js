contextIOKey = "ju6vky80"
contextIOSecret = "RFcFydgT5fmzpDko"
contextIOAccountId = "56cb15138d9b27ec1c8b4569" // Giraffebones
  // Playground: https://console.context.io/#explore/2.0/accounts/messages/get
ContextIO = Meteor.npmRequire('contextio');
fs = Meteor.npmRequire('fs');
path = Meteor.npmRequire('path');
ctxioClient = new ContextIO.Client({
  key: contextIOKey,
  secret: contextIOSecret
});

clearEmailContents = function() {
  emails.remove({})
}

function pe(fn) {
  ctxioClient.accounts(contextIOAccountId).messages().get({
    limit: 15,
    subject: "/datagator/"
  }, Meteor.bindEnvironment(function(err, response) {
    fn(response.body)
  }))
}

function pf(fileId, fileExt, fn) {
  if (fileExt === ".js") {
    fileExt = ".txt"
  }
  ctxioClient.accounts(contextIOAccountId).files(fileId).content().get(process.env.PWD + '/.emails/' + fileId + fileExt, Meteor.bindEnvironment(function(err, response) {
    fn(response)
  }));
}

getEmailsWithAttachments = function() {
  pe(function(response) {

    // Testing only 
    clearEmailContents()
      // end testing
    for (i = 0; i < response.length; i++) {
      aId = Meteor.users.findOne({'emails.address': response[i]['addresses']['from']['email']})
      if ((typeof(response[i]['files']) !== 'undefined') && (typeof(aId) !== 'undefined')) {
        aId =  Meteor.users.findOne({'emails.address': response[i]['addresses']['from']['email']})['_id']
        matchingLine = sheetDefinitions.findOne({insertFileName: response[i]['files'][0]['file_name'], authorId: aId})
        if(typeof(matchingLine) != 'undefined'){ // begin seeing if there is a matchign file name in sheetdefinitions
        emailObj = {}
        stFileName = response[i]['files'][0]['file_id'] +  response[i]['files'][0]['file_name_structure'][1][0]
        emailObj['file_name'] = response[i]['files'][0]['file_name']
        emailObj['file_name_structure'] = response[i]['files'][0]['file_name_structure']
        emailObj['file_ext'] = response[i]['files'][0]['file_name_structure'][1][0]
        emailObj['subject'] = response[i]['subject']
        emailObj['documentPassword'] = response[i]['subject'].split(" ")[1]
        emailObj['message_id'] = response[i]['message_id']
        emailObj['resource_url'] = response[i]['resource_url']
        emailObj['fromEmail'] = response[i]['addresses']['from']['email']
        emailObj['fromName'] = response[i]['addresses']['from']['name']
        emailObj['date_received'] = response[i]['date_received']
        emailObj['ownerUserId'] = matchingLine['authorId']
        emailObj['processData'] = new Date()
        emailObj['file_id'] = response[i]['files'][0]['file_id']
        emailObj['attachmentProcessed'] = null
        emailObj['storedFileName'] = stFileName
        emailObj['sheedId'] = matchingLine['_id']
        existingEntry = emails.find({
          'message_id': emailObj['message_id']
        }).fetch()
        if (existingEntry.length > 0) {
        
        } else {
          emails.insert(emailObj)
        }
      
      } // End see if there is a matching file in sheetDefinitions
      } else {
        
      }
      
      
    }
  })
}


fetchAttachments = function() {
  // get all meteor entries with the 'attachmentProcessed' = Null
  wd = emails.find({
    "attachmentProcessed": null
  }).fetch()

  // For each item 
  for (i = 0; i < wd.length; i++) {

    // call the content url https://context.io/docs/2.0/accounts/files/content
    pf(wd[i]['file_id'], wd[i]['file_ext'], function(err, res) {
      console.log(wd[i]['storedFileName'])
      processExcel(wd[i]['storedFileName'], wd[i]['authorId'], wd[i]['sheedId'], 'email', 'append')
    })
  }
}

emailExchange = function() {
  getEmailsWithAttachments()
  fetchAttachments()
}

Meteor.methods({
  callEmailExchange: function(){
    console.log("Call email exchange called")
    emailExchange()
  }
  
})


