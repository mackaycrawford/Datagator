Template.authorViewRawData.onRendered(function() {
  //Meteor.subscribe('data')
  console.log("template rendered")
  $(document).ready(function() {
    console.log("document ready")
    /*
      Meteor.call('getSheetData', queryString()['sheetId'], function(err,res){
          cLog(err)
          cLog(res)
          console.log("HELLO")
          sm_renderGrid("#rawSheetDataGrid", res)
          OGDATA = $container.handsontable('getData')

      })
    */
  })
})

Template.authorViewRawData.helpers({
  showData: function() {
    return "HELLO THERE"
  }, 
  listData: function(){
    return [{"myKey": "apple"},{"myKey": "banaa"}, {"myKey": "cat"},{"myKey": "dog"} ]
  }
})
