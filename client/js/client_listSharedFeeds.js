Template.listSharedFeeds.onRendered(function() {

    
    appendSharedSheetName = function(groupId, sheetId, sheetName){
        snip = "<li class='list-group-item'><a href='/view?sheetId="+sheetId+"&groupId=" + groupId + "'> " + sheetName + "</a></li>"
        $("#sharedSheetList").append(snip)
    }
    
    $(document).ready(function(){
    Meteor.call('methodGetSharedSheets', function(err,res){
        console.log(err)
        console.log(res)
        for(var i=0; i<res.length; i++){
            appendSharedSheetName(res[i]['groupId'], res[i]['sheetId'], res[i]['sheetName'])
        }
        
    })
        
    })


})


Template.listSharedFeeds.helpers({

})