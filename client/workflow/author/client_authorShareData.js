Template.authorShareData.onRendered(function() {
displayGroupDropdownValues = function(stub) {
  for (var i = 0; i < stub.length; i++) {
    gName = stub[i]['groupName']
    str = "<option value='" + stub[i]['_id'] + "'> " + gName + " </option>"
    $("#groupDropDown").append(str)
  }
}

templateDisplayGroupSQL = function(groupId, groupName, sqlText) {
  t = "<div class='row shareRow' id='"+groupId+"'><div class='col-xs-2'></div><div class='col-xs-3'><div class='form-group'><input type='text' class='form-control' id='gName' readonly value='" + groupName + "'></div></div><div class='col-xs-3'><div class='form-group'><input type='text' class='form-control' id='sqlText' value='" + sqlText + "'></div></div><input type='hidden' id='gId' value='" + groupId + "' ><div class='col-xs-2'><div class='form-group'><!--<button type='button' class='btn btn-danger'>Delete</button>--><button type='button' class='btn btn-default updateShareButton'>Save </button></div></div></div>"
  $("#groupListContainer").append(t)
}

renderShareGroups = function(stub, sheetId) {
  var workingArray = filterStubsToRelevantSheets(stub, sheetId)
  for (var z = 0; z < workingArray.length; z++) {
    templateDisplayGroupSQL(workingArray[z]['groupId'], workingArray[z]["groupName"], workingArray[z]["sql"])
  }
 $(".updateShareButton").on('click', function(){
    d = $(this).parent().parent().parent()
    d_id = $(d).attr('id')
    console.log(d_id)
    q = $("#" + d_id).find("#sqlText").val()
    console.log(q)
    Meteor.call('upsertGroupPermissions', d_id, queryString()['sheetId'], sqlToObj(q))
  })
}

renderPublicGroup = function(sheetId){
  Meteor.call('getPublicShareSettings', queryString()['sheetId'], function(err,res){
    console.log(err)
    console.log(res)
    if(res['publicAcessType'] === "noAccess"){
      $("#publicAccessSelect").val("noAccess")
      $("#publicQuery").hide()
    }
    if(res['publicAcessType'] === "allAccess"){
      $("#publicAccessSelect").val("allAccess")
      $("#publicQuery").hide()
    }
    if(res['publicAcessType'] === "accessByQuery"){
      $("#publicAccessSelect").val("accessByQuery")
      $("#publicQuery").show()
      $("#publicQueryText").val(res['sql'])
    }
  })
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
  renderPublicGroup(sheetId)
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


getNewGroupInput = function(){
    nrt = $("#newRowText").val()
  if (nrt.length > 0) {
    miniObj = {}
    gdd = $("#groupDropDown").val()
    gddname = $("#groupDropDown option:selected").text();
    miniObj['groupId'] = gdd
    miniObj['groupName'] = gddname
    miniObj['sql'] = nrt
    return miniObj
  }
  
  
}

$(document).ready(function() {
  //renderShareGroupsInterface(stub, stubSheetId)
  $("#publicQuery").hide()
  Meteor.call('server_getShareGroups', queryString()['sheetId'], function(err,res){
    console.log("CALLED")
    console.log(res)
    
    if(typeof(res) != 'undefined'){
      renderShareGroupsInterface(res, queryString()['sheetId'])
    }
  })
  
  $("#publicAccessSelect").on('change', function(){
    cv = $("#publicAccessSelect").val()
    if(cv === "accessByQuery"){
      $("#publicQuery").show()
    } else {
      $("#publicQuery").hide()
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
      ai("ShareGroup updated")
    }
  })

  $("#publicQuerySave").click(function(){
    s = queryString()['sheetId']
    access = $("#publicAccessSelect").val()
    
    if(access === "accessByQuery"){
      accessQuery = $("#publicQueryText").val()
      Meteor.call("savePublicQuery", s, access, sqlToObj(accessQuery))
    } else {
      Meteor.call("savePublicQuery", s, access)
    }
  })
  
  $("#newQuerySave").click(function(){
    console.log('clicked')
    d = getNewGroupInput()
    sqlObj = sqlToObj(d['sql'], true)
    Meteor.call("upsertGroupPermissions", d['groupId'], queryString()['sheetId'], sqlObj)
    templateDisplayGroupSQL(d['groupId'], d['groupName'], d['sql'])
    $("#newRowText").val("")
    
  })
  


})
})

Template.authorShareData.helpers({
  groups: function(){
    return groups.find({'groupOwner': Meteor.userId()})
  }
})
