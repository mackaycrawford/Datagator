Template.logs.onRendered(function() {
  cl("logs rendered");
  $(document).ready(function() {
    cl("logs Document Ready");


    getData = function() {
      return logs.find().fetch()
    }


    $container = $("#logsTable");

    $container.handsontable({
      
      
      data: getData(),
      //data: runHelper('logs', 'logData'),
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true
    });

    hotInstance = $("#logsTable").handsontable('getInstance');

  })
})


Template.logs.helpers({

  logData: function() {
    return logs.find();
  }
})
