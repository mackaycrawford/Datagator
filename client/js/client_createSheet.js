Template.createSheet.onRendered(function() {
    
  createSheet = function(sheetName){
      Meteor.call("createSheet", sheetName)
  }
  
  
    
  //Meteor.subscribe('data')
  $(document).ready(function() {
      $("#createNewDataFeedButton").click(function(x){
          x.preventDefault()
          dfName = $("#dataFeedName").val()
          createSheet(dfName)
          
          
      })

  })
})

Template.createSheet.helpers({

})