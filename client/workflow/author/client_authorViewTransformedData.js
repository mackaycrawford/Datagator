Template.authorViewTransformedData.onRendered(function() {
  $(document).ready(function() {
    $("#runTransformedSql").click(function() {
      qry = $("#transformedSqlText").val()
      if(qry.length > 0){
        sto = sqlToObj(qry, true)
        Meteor.call("authorFetchTransformedData", sId, sto, function(err, res) {
          console.log(err)
          console.log(res)
          if(typeof(res) != 'undefined'){
            $("#authorTransformedDataGrid").show()
            sm_renderGrid("#authorTransformedDataGrid", res)
          } else {
            $("#authorTransformedDataGrid").hide()
          }
        })
      } else {
        Meteor.call("authorFetchTransformedData", sId,function(err, res) {
          console.log(err)
          console.log(res)
          if(typeof(res) != 'undefined'){
            $("#authorTransformedDataGrid").show()
            sm_renderGrid("#authorTransformedDataGrid", res)
          } else {
            $("#authorTransformedDataGrid").hide()
          }
        })
        
      }
    })

  })
})

Template.authorViewTransformedData.helpers({

})
