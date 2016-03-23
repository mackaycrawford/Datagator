Template.view.onRendered(function() {
  groupId = queryString()['groupId']
  sheetId = queryString()['sheetId']
  // Test group id: jb8KXeYCBZbX9qWEH
  //j test sheet id: QGnTFfzxgLHY7EwGC
  // TestURL https://datagatormeteor-sirmartymoose.c9users.io/view?sheetId=QGnTFfzxgLHY7EwGC&groupId=jb8KXeYCBZbX9qWEH
  console.log(groupId)
  console.log(sheetId)
  
  
  $(document).ready(function(){
      Meteor.call('getViewerDataMethod', groupId, sheetId, function(err,res){
          console.log(res)  
          if(typeof(res) != 'undefined'){
            $("#viewDataGrid").show()
            sm_renderGrid("#viewDataGrid", res)
          } else {
            $("#viewDataGrid").hide()
          }
      })
  })
  
  
 
})