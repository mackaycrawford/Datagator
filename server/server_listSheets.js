Meteor.methods({
    methodGetSharedSheets: function(){
        res = server_getSharedSheets(this.userId)
        return res
    }, 
    methodGetPublicSheets: function(){
        res = server_getPublicSheets(this.userId)
        return res
    }
})

server_getSharedSheets = function(userId){
      // Get the users email
      userEmail = Meteor.users.find({_id: userId}).fetch()[0]['emails'][0]['address']
      console.log(userEmail)
      // find groups that the user is in 
      gps = groups.find({groupEmails: userEmail}).fetch()
      // Get the sheet Ids from those groups
      console.log(gps)
      outArray = []
      
      for(g = 0; g < gps.length; g++ ){
          sLength = gps[g]['sheetPermissions'].length
          console.log(sLength)
          for(s = 0; s < sLength; s++){
              console.log("PING")
              groupObject = {}
              groupObject['groupId'] = gps[g]['_id']
              si = gps[g]['sheetPermissions'][s]['sheetId']
              groupObject['sheetId'] = si
              sqlData = sheetDefinitions.find({_id: si},  {fields: {"sheetName": 1}}).fetch()
              if(typeof(sqlData[0]) != 'undefined' ){
                  groupObject['sheetName'] = sqlData[0]['sheetName'] 
                outArray.push(groupObject)
              }
          }
          
      }

      // Get sheetnames for each sh; eet Id
      
return outArray
      

  }
  
  server_getPublicSheets = function(userId){
      res = sheetDefinitions.find({publicAccessType: "allAccess"}, {fields: {"sheetName": 1}}).fetch()
      res2 = sheetDefinitions.find({publicAccessType: "accessByQuery"}, {fields: {"sheetName": 1}}).fetch()
      finalArray = []
      for(var z = 0; z < res.length; z++){
          finalArray.push(res[z])
      }
      for(var x = 0; x < res2.length; x++){
          finalArray.push(res2[x])
      }
      return finalArray
      
      
  }