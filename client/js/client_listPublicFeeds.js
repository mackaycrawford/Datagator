Template.listPublicFeeds.onRendered(function() {

    
    appendPublicSheetName = function(groupId, sheetId, sheetName){
        snip = "<li class='list-group-item'><a href='/view?sheetId="+sheetId+"&groupId=" + "public" + "'> " + sheetName + "</a></li>"
        $("#publicSheetList").append(snip)
    }
    
    $(document).ready(function(){
    Meteor.call('methodGetPublicSheets', function(err,res){
        console.log(err)
        console.log(res)
        for(var i=0; i<res.length; i++){
            appendPublicSheetName("public", res[i]['_id'], res[i]['sheetName'])
        }
        
    })
        
    })


})


Template.listPublicFeeds.helpers({

})