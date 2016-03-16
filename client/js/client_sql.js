
Template.viewSheet.onRendered(function() {
  $(document).ready(function(){
      
      $("#runSql").click(function(){
          getVal = $("#sqlText").val()
          res = SQL(getVal)
          if(res == 0){
            showNoResults()
          } else {
              showResults()
              renderGrid(res)
          }
          
          //newGrid = objToUnderscore(sqlObjectOutput)
          
          

          
      })
      
  })  
    
    
})