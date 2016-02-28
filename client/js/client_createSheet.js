Template.createSheet.onRendered(function() {
  sheetId = ""
  connectorType = ""

  createSheet = function(sheetName) {
    cLog("CREATESHETCALLSED")
    Meteor.call("createSheet", sheetName, function(err, res) {
      sheetId = res
      if (connectorType === "paste") {
        cLog("connector type is paste")
        connector_paste(res)
      }
      if (connectorType === "emailMyself") {
        cLog("connector type is emailMyself")
        connector_emailMyself(res)
      }
    })
  }

  $("#connectorSelect").on("change", function() {
    connectorSelected = $('#connectorSelect').find(":selected").val();
    loadConnectorTemplate(connectorSelected)
  })

  loadConnectorTemplate = function(connectorSelected) {
    if (connectorSelected === "paste") {
      $("#connector_paste").show()
      connectorType = "paste"
    } else {
      $("#connector_paste").hide()
      //connectorType = null
    }
    
    if (connectorSelected === "emailMyself") {
      $("#connector_emailMyself").show()
      $("#connector_paste").hide()
      connectorType = "emailMyself"
    } else {
      $("#connector_emailMyself").hide()
      //connectorType = null
    }
    
    
  }


  //Meteor.subscribe('data')
  $(document).ready(function() {

    $("#connector_paste").hide()
    $("#connector_emailMyself").hide()

    $("#createNewDataFeedButton").click(function(x) {
      cLog("CreateNewDataFeedButton Clicked")
      x.preventDefault()
      dfName = $("#dataFeedName").val()
      createSheet(dfName)
    })




  })
})

Template.createSheet.helpers({

})
