Meteor.methods({
  createSheet: function(dataFeedName){
      sheetDefinitions.insert({authorId: this.userId, sheetName: dataFeedName})
  }  
    
})