sm_renderGrid = function(containerId, gridData) {
  $container = $(containerId);
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
}

Template.sheetManagement.onRendered(function() {
    cLog("sheetManagement Rendered")

  Session.set("sessionSheetId", queryString()['sheetId']) // Set the SheetID just in case we need it in a helper
  
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
    ai("csv downloaded")
  }
  
  sId = queryString()['sheetId']
  Meteor.subscribe("sheetIdData", sId, {
    onReady: function() {
      sm_renderGrid("#rawSheetDataGrid", sheetData.find({
        sheetId: sId
      }, {
        fields: {
          _id: 0,
          sheetId: 0,
          authorId: 0
        }
      }).fetch())
    }
  })

  showSheetName = function(sheetName) {
    //sName = "<span class='glyphicon glyphicon-file' aria-hidden='true'></span>"
    sName = ""
    
    $("#sheetNameText").html(sName + sheetName)
    $("#sheetNameTextInput").val(sheetName)
  }

  $(document).ready(function() {
    Meteor.call('getSheetName', queryString()['sheetId'], function(err, res) {
      if (typeof(res) != 'undefined') {
        showSheetName(res)
      }
    })
  })
})


