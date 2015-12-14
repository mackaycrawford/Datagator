Template.logs.onRendered(function() {
  cl("logs rendered");
  $(document).ready(function() {
    cl("logs Document Ready");


    getData = function() {
      return logs.find({}, {sort: {'logDate': -1}} ).fetch()
    }


    $container = $("#logsTable");

    $container.handsontable({
      
      
      data: getData(),
      //data: runHelper('logs', 'logData'),
      rowHeaders: false,
      colHeaders: true,
      contextMenu: false, 
       columns: [
          {data: 'message'},
          {data: 'userId'},
          {data: 'logDate'},
    ]
    });

    hotInstance = $("#logsTable").handsontable('getInstance');

  })
})


Template.logs.helpers({

  logData: function() {
    return logs.find();
  }
})
