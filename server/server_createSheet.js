Meteor.methods({
  createSheet: function(dataFeedName){
      return sheetDefinitions.insert({authorId: this.userId, sheetName: dataFeedName})
  }  
    
})