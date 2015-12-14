if (Meteor.isClient) {

  runHelper = function(templateName, helper) {
    helperString = " " + helper
    returnData = Template[templateName]['__helpers'][helperString]().fetch()
    return returnData

  }


  cl = function(msg) {
    if (logging === true) {
      console.log(msg);
      logs.insert({
        "message": msg
      })

    }
  }
  
  cLog = function(msg) {
    if (logging === true) {
      console.log(msg);
      logs.insert({
        "message": msg
      })

    }
  }

}
