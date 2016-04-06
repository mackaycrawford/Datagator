getViewerData = function(groupId, sheetId, userId) {
  // get the email of the users 
  if (groupId === 'public') {
    console.log('publicRoute')
    v = sheetDefinitions.findOne({
      _id: sheetId
    })
    console.log(v)
    console.log(v['publicAccessType'])
    if (v['publicAccessType'] === "allAccess") {
      console.log("AllAccess")
      console.log(v['authorTransformations'])
      fin = server_fetchAndTransform(sheetId, v['publicAccessQuery'])
      console.log("here comes fin")
      console.log(fin)
      return fin
    }
    if (v['publicAccessType'] === "noAccess") {
      console.log("noAccess")
      return null
    }
    if (v['publicAccessType'] === "accessByQuery") {
      console.log("accessByQuery")
      fin = server_fetchAndTransform(sheetId, v['publicAccessQuery'])
    }
  } else {
    userEmail = Meteor.users.find({
        _id: userId
      }).fetch()[0]['emails'][0]['address']
      // Make sure the user has access to the group specified and the group has the sheet specified
    group = groups.find({
      _id: groupId,
      groupEmails: userEmail,
      'sheetPermissions.sheetId': sheetId
    }).fetch()
    if (group.length > 0) {
      // Make sure the group has access to the sheet Specified 
      sheetPermissionsArray = group[0]['sheetPermissions']
      res = _.findWhere(sheetPermissionsArray, {
        sheetId: sheetId
      })
      sObject = res['sqlObject']
      fin = server_fetchAndTransform(sheetId, sObject)
      return fin

    }
  }

}


Meteor.methods({
  getViewerDataMethod: function(groupId, sheetId) {
    re = getViewerData(groupId, sheetId, this.userId)
    return re
  }

})
