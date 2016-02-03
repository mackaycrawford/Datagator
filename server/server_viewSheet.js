Meteor.methods({
    getSheetData: function(sheetId){
        console.log("get SheetData server called")
        console.log(sheetId)
        //res = sheetData.find({sheetId:sheetId}, {_id: 0, sheetId:0}).fetch()
        res = sheetData.find({sheetId:sheetId},{fields: {_id: 0, sheetId: 0, authorId:0}}).fetch()
        console.log(res)
        return res
    }
    
})