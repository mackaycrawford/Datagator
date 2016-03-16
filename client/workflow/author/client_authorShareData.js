Template.authorShareData.onRendered(function() {
stubSheetId = "123"

//groups.update({_id: "LL3D3BubmYTtmssuy",'sheetPermissions.sheetId': "123"}, {$set: {'sheetPermissions.sheetId.$.text': "HI"}},  { upsert: true })

stub = [{
  "_id": "qdfa",
  "groupEmails": ["sirmartymoose@gmail.com", "mackaycrawford@gmail.com"],
  "groupName": "MySecondGrouup",
  "groupOwner": "sWbBmNYof57xWhhke",
  "sheetPermissions": [{
      "sheetId": "123",
      "sqlObject": {
        "text": "Select Name from t where sheetId = 123",
        "type": "select",
        "fields": ["Name"],
        "selectAll": false,
        "isTranslated": true,
        "where": {
          "sheetId": "fXzSPimyFbcT9gyec"
        },
        "like": {}
      }
    }, {
      "sheetId": "456",
      "sqlObject": {
        "text": "Select Name from t sheetID = 456",
        "type": "select",
        "fields": ["Name"],
        "selectAll": false,
        "isTranslated": true,
        "where": {
          "sheetId": "fXzSPimyFbcT9gyec"
        },
        "like": {}
      }
    }

  ]
}, {
  "_id": "qdfa",
  "groupEmails": ["sirmartymoose@gmail.com", "mackaycrawford@gmail.com"],
  "groupName": "ANTOTHER",
  "groupOwner": "sWbBmNYof57xWhhke",
  "sheetPermissions": [{
      "sheetId": "123",
      "sqlObject": {
        "text": "Select Name from t sjeet2 id = 123",
        "type": "select",
        "fields": ["Name"],
        "selectAll": false,
        "isTranslated": true,
        "where": {
          "sheetId": "fXzSPimyFbcT9gyec"
        },
        "like": {}
      }
    }, {
      "sheetId": "456",
      "sqlObject": {
        "text": "Select Name from t2 sheet2 = 456",
        "type": "select",
        "fields": ["Name"],
        "selectAll": false,
        "isTranslated": true,
        "where": {
          "sheetId": "fXzSPimyFbcT9gyec"
        },
        "like": {}
      }
    }

  ]
}]

displayGroupDropdownValues = function(stub) {

  for (var i = 0; i < stub.length; i++) {
    gName = stub[i]['groupName']
    str = "<option value='" + stub[i]['_id'] + "'> " + gName + " </option>"
    $("#groupDropDown").append(str)
  }
}

templateDisplayGroupSQL = function(groupId, groupName, sqlText) {
  t = "<div class='row shareRow'><div class='col-xs-4'><div class='form-group'><input type='text' class='form-control' id='gName' readonly value='" + groupName + "'></div></div><div class='col-xs-4'><div class='form-group'><input type='text' class='form-control' id='sqlText' value='" + sqlText + "'></div></div><input type='hidden' id='gId' value='" + groupId + "' ><div class='col-xs-1'><div class='form-group'><button type='button' class='btn btn-danger'>Delete</button></div></div></div>"
  $("#groupListContainer").append(t)
}

renderShareGroups = function(stub, sheetId) {
  var workingArray = filterStubsToRelevantSheets(stub, sheetId)
  for (var z = 0; z < workingArray.length; z++) {
    templateDisplayGroupSQL(workingArray[z]['groupId'], workingArray[z]["groupName"], workingArray[z]["sql"])
  }

}

filterStubsToRelevantSheets = function(stub, sheetId) {
  matchingStubArray = []
  for (var v = 0; v < stub.length; v++) {
    sPerms = stub[v]['sheetPermissions']
    for (b = 0; b < sPerms.length; b++) {
        //var myRes = _.findWhere(sPerms[b], {
        //  sheetId: sheetId
        //})
      if (sPerms[b]['sheetId'] === sheetId) {
        if(typeof(sPerms[b]['sqlObject']['text'] != 'undefined')){
        miniObj = {}
        miniObj['groupId'] = stub[v]['_id']
        miniObj['groupName'] = stub[v]['groupName']
        miniObj['sql'] = sPerms[b]['sqlObject']['text']
        matchingStubArray.push(miniObj)
        }
        

      }
    }
  }
  return matchingStubArray
}


renderShareGroupsInterface = function(stub, sheetId) {
  displayGroupDropdownValues(stub)
  renderShareGroups(stub, sheetId)
}

getShareGroupsInput = function() {
  outArray = []
  $(".shareRow").each(function() {
    miniObj = {}
    gIdForm = $(this).find("#gId").val()
    gNameForm = $(this).find("#gName").val()
    sqlTextForm = $(this).find("#sqlText").val()
    miniObj['groupId'] = gIdForm
    miniObj['groupName'] = gNameForm
    miniObj['sql'] = sqlTextForm
    outArray.push(miniObj)
  })

  nrt = $("#newRowText").val()
  if (nrt.length > 0) {
    miniObj = {}
    gdd = $("#groupDropDown").val()
    gddname = $("#groupDropDown option:selected").text();
    miniObj['groupId'] = gdd
    miniObj['groupName'] = gddname
    miniObj['sql'] = nrt
    outArray.push(miniObj)
  }
  return outArray
}

$(document).ready(function() {
  //renderShareGroupsInterface(stub, stubSheetId)

  Meteor.call('server_getShareGroups', queryString()['sheetId'], function(err,res){
    console.log("CALLED")
    console.log(res)
    
    if(typeof(res) != 'undefined'){
      renderShareGroupsInterface(res, queryString()['sheetId'])
    }
  })


  $("#saveShareGroups").click(function() {
    t = getShareGroupsInput()
    for(var x=0; x<t.length; x++){
      gid = t[x]['groupId']
      objToUpdate = {}
      objToUpdate['sheetId'] = queryString()['sheetId']
      so = sqlToObj(t[x]['sql'], true)
      objToUpdate['sqlObject'] = so
      Meteor.call('upsertGroupPermissions', gid, queryString()['sheetId'], objToUpdate)
      
    }
  })

})
})

Template.authorShareData.helpers({
  groups: function(){
    return groups.find({'groupOwner': Meteor.userId()})
  }
})
