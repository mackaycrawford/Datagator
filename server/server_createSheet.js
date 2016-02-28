Meteor.methods({
  createSheet: function(dataFeedName){
      d =  sheetDefinitions.insert({authorId: this.userId, sheetName: dataFeedName, insertFileName: null, processedFiles: []})
      console.log("created sheet id: " + d)
      return d
  }  
    
})