Meteor.methods({
    getSheetData: function(sheetId){
        res = sheetData.find({sheetId:sheetId},{fields: {_id: 0, sheetId: 0, authorId:0}}, {skip: 0, limit: 5}).fetch()
        return res
    }
    
})