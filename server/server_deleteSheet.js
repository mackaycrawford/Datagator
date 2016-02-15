Meteor.methods({
    deleteSheet: function(sheetId){
        sheetAuthor = sheetDefinitions.find({_id: sheetId}).fetch()[0]["authorId"]
        //verify that the author is the user
        if(sheetAuthor === this.userId){
            sheetDefinitions.remove({_id: sheetId})
            sheetData.remove({sheetId: sheetId})
            return "deleted"
            
        }
        

    }
    
})