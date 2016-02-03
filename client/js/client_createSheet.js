Template.createSheet.onRendered(function() {
  sheetId = ""
  connectorType = ""

  createSheet = function(sheetName) {
    Meteor.call("createSheet", sheetName, function(err, res) {
      sheetId = res
      if (connectorType === "paste") {
        connector_paste(res)
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
      connectorType = null
    }
  }


  //Meteor.subscribe('data')
  $(document).ready(function() {

    $("#connector_paste").hide()

    $("#createNewDataFeedButton").click(function(x) {
      x.preventDefault()
      dfName = $("#dataFeedName").val()
      createSheet(dfName)
    })




  })
})

Template.createSheet.helpers({

})
