Meteor.methods({
    methodGetSharedSheets: function(){
        res = server_getSharedSheets(this.userId)
        return res
    }
})

server_getSharedSheets = function(userId){
      // Get the users email
      userEmail = Meteor.users.find({_id: userId}).fetch()[0]['emails'][0]['address']
      
      // find groups that the user is in 
      gps = groups.find({groupEmails: userEmail}).fetch()
      // Get the sheet Ids from those groups 
      outArray = []
      
      for(g = 0; g < gps.length; g++ ){
          
          for(s = 0; s < gps[g]['sheetPermissions'].length; s++){
              groupObject = {}
              groupObject['groupId'] = gps[g]['_id']
              s = gps[g]['sheetPermissions'][s]['sheetId']
              groupObject['sheetId'] = s
              sqlData = sheetDefinitions.find({_id: s}).fetch()
              if(typeof(sqlData[0]) != 'undefined' ){
                  groupObject['sheetName'] = sqlData[0]['sheetName'] 
                outArray.push(groupObject)
              }
          }
          
      }
      console.log(outArray)
      // Get sheetnames for each sh; eet Id
      
return outArray
      

  }