Template.viewSheet.onRendered(function() {
    
showSheetName = function(){
    sId = queryString()['sheetId']
    sheetName = sheetDefinitions.find({'_id': sId}).fetch()[0]['sheetName']
    $("#sheetNameText").html(sheetName)
}

deleteSheet = function(){
    Meteor.call('deleteSheet', queryString()['sheetId'], function(err,res){
        Router.go("listOwnedSheets")
    } )
}

showNoResults = function(){
    $("#noResults").show()
    $("#example1").hide()
}

showResults = function(){
    $("#noResults").hide()
    $("#example1").show()
}

showAdvanced = function(){
    $("#advanced").show()
}

toggleAdvanced = function(){
    $("#advanced").toggle()
}

hideShareResults = function(){
    $("#advanced").hide()
}

renderGrid = function(gridData){
      $container = $("#example1");
      $container.handsontable({
        data: gridData,
        rowHeaders: false,
        colHeaders: _.keys(gridData[0]),
        contextMenu: false,
        minSpareRows: 0,
        minSpareCols: 0,
        startRows: 0,
        startCols: 0, 
        readOnly: true,
        stretchH: "all"
      });

      // This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
      var hotInstance = $("#example1").handsontable('getInstance');
      $container.handsontable("getData")
}

   convertArrayOfObjectsToCSV = function(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    window.downloadCSV = function(args) {
        var data, filename, link;

        var csv = convertArrayOfObjectsToCSV({
            data: $container.handsontable('getData')
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
  
  
  
  console.log("template rendered")
  $(document).ready(function() {
    $("#sqlText").keypress(function(e) {
    if(e.which == 13) {
        $("#runSql").click();
    }
});


$("#showAdvancedButton").click(function() {
    toggleAdvanced()
})

      
      
$("#noResults").hide()
        Meteor.call('getSheetData', queryString()['sheetId'], function(err,res){
          cLog(err)
          cLog(res)
          renderGrid(res)
        showSheetName()

      })
        
        
        


$("#deleteSheet").click(function(){
    deleteSheet()
})
        
        
        



  })
})

Template.viewSheet.helpers({

})
