getViewerData = function(groupId, sheetId, userId){
    // get the email of the users 
    userEmail = Meteor.users.find({_id: "7EEHyDxhACr3bji8Y"}).fetch()[0]['emails'][0]['address']
    // Make sure the user has access to the group specified and the group has the sheet specified
    group = groups.find({_id: groupId, groupEmails: userEmail, 'sheetPermissions.sheetId': sheetId}).fetch()
    if(group.length > 0){
        // Make sure the group has access to the sheet Specified 
        sheetPermissionsArray = group[0]['sheetPermissions']
        res = _.findWhere(sheetPermissionsArray, {sheetId: sheetId})
        sObject = res['sqlObject']
        fin = server_fetchAndTransform(sheetId, sObject)
        return fin
        
    }
    
    
}


Meteor.methods({
    getViewerDataMethod: function(groupId, sheetId){
        re = getViewerData(groupId, sheetId, this.userId)
        return re
    }
    
})