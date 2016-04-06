Template.createSheet.onRendered(function() {
  sheetId = ""
  connectorType = ""
  
  populateConnectorDescription = function(txt){
    $("#connectorDescription").html(txt)    
  }

  createSheet = function(sheetName) {
    Meteor.call("createSheet", sheetName, function(err, res) {
      sheetId = res
      if (connectorType === "paste") {
        connector_paste(res)
      }
      if (connectorType === "upload") {
        connector_upload(res)
      }
      if (connectorType === "emailMyself") {
        connector_emailMyself(res)
      }
      
      Router.go("/sheetManagement?sheetId=" + res)
    })
  }

  $("#connectorSelect").on("change", function() {
    connectorSelected = $('#connectorSelect').find(":selected").val();
    console.log(connectorSelected)
    loadConnectorTemplate(connectorSelected)
  })

  loadConnectorTemplate = function(connectorSelected) {
    if (connectorSelected === "paste") {
      $("#connector_paste").show()
      populateConnectorDescription("Paste data directly into the grid")
      connectorType = "paste"
    } else {
      $("#connector_paste").hide()
      //connectorType = null
    }
    
    if (connectorSelected === "emailMyself") {
      $("#connector_emailMyself").show()
      populateConnectorDescription("Email yourself data")

      $("#connector_paste").hide()
      connectorType = "emailMyself"
    } else {
      $("#connector_emailMyself").hide()
      //connectorType = null
    }
    
    if (connectorSelected === "upload") {
      $("#connector_upload").show()
      populateConnectorDescription("upload data")
      connectorType = "upload"
    } else {
       $("#connector_upload").hide()

    }
    
    
  }


  //Meteor.subscribe('data')
  $(document).ready(function() {

    $("#connector_paste").hide()
    $("#connector_emailMyself").hide()
    $("#connector_upload").hide()

    $("#createNewDataFeedButton").click(function(x) {
      x.preventDefault()
      dfName = $("#dataFeedName").val()
      createSheet(dfName)
      ai("Sheet Created")
    })




  })
})

Template.createSheet.helpers({

})
