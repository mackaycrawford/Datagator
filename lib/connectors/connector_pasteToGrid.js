if (Meteor.isClient) {
  Template.createSheet.onRendered(function() {
    connector_paste = function(sheetId) {
      data = getPasteData()
      for (i = 0; i < data.length; i++) {
        cLog("Called connector paste with shset id:" + sheetId)
        data[i]['sheetId'] = sheetId
      }
      Meteor.call('connector_paste', data)
    }

    getPasteData = function() {
      outputArr = []
      data = $container.handsontable('getData')
      dataHeaders = data[0]
      dataHeaders.pop()
      
      
      console.log(dataHeaders)
      remainingData = data
      remainingData.shift()
      for (i = 0; i < remainingData.length; i++) {
        createObj = {}
        for (x = 0; x < remainingData[i].length - 1; x++) {
          if(remainingData[i][x] != null){
            remainingData[i][x] = remainingData[i][x].trim()
          }
          createObj[dataHeaders[x].trim()] = remainingData[i][x]
        }
        outputArr.push(createObj)
      }
      outputArr.pop()
      return outputArr
    }

    $(document).ready(function() {
      $container = $("#example1");
      $container.handsontable({
        data: [
          [""]
        ],
        rowHeaders: false,
        colHeaders: true,
        contextMenu: false,
        minSpareRows: 1,
        minSpareCols: 1,
        startRows: 1,
        startCols: 5
      });

      // This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
      var hotInstance = $("#example1").handsontable('getInstance');
      $container.handsontable("getData")
    })
  })
}



if (Meteor.isServer) {
  Meteor.methods({
    connector_paste: function(sheetDataArray) {
      for (i = 0; i < sheetDataArray.length; i++) {
        sheetDataArray[i]["authorId"] = this.userId
        sheetData.insert(sheetDataArray[i])
      }
    }
  })
}
