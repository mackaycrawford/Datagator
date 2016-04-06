server_fetchAndTransform = function(sheetId, sObj) {
  sheetDef = sheetDefinitions.find({
    _id: sheetId
  }).fetch()
  sd1 = sheetDef[0]
  ecn = sd1['authorTransformations']['excludeColumnNames'];
  tcn = sd1['authorTransformations']['translateColumnNames'];
  tfv = sd1['authorTransformations']['translateFieldValues'];

  if (sObj == null) {
    sheetD = sheetData.find({
      sheetId: sheetId
    }).fetch()
  }

  if (sObj != null) {
    whereKeys = _.keys(sObj['where'])
    for (var w = 0; w < whereKeys.length; w++) {
      if (tcn != null) {
        for (t = 0; t < tcn.length; t++) {
          var newValue = tcn[t]['newValue']
          var oldValueArray = tcn[t]['oldValues'].split(",")
          var ov = oldValueArray[0]
          if (whereKeys[w] === newValue) {
            sObj['where'][ov] = sObj['where'][whereKeys[w]]
            delete sObj['where'][whereKeys[w]]
          }
        }
      }
    }

    if (sObj['selectAll'] == true) {
      k = _.keys(sheetData.find({
        sheetId: sheetId
      }, {
        fields: {
          authorId: 0,
          _id: 0,
          sheetId: 0
        }
      }).fetch()[0])
      sObj['fields'] = k
    }
    if (sObj['fields'] != null) {
      for (ff = 0; ff < sObj['fields'].length; ff++) {
        if (tcn != null) {
          for (var x = 0; x < tcn.length; x++) {
            var newValue = tcn[x]['newValue']
            var oldValueArray = tcn[x]['oldValues'].split(",")
            var ov = oldValueArray[0]
              // See if there is a match between teh field requested in teh SQL object and a "new Value"
            if (newValue === sObj['fields'][ff]) {
              sObj['fields'][ff] = ov
            } else {}
          }
        }
      }
    }

    mongoFields = {
      _id: 0
    }
    whereConditions = sObj['where']
    if (sObj['fields'] != 1) {
      for (var i = 0; i < sObj['fields'].length; i++) {
        var keyName = sObj['fields'][i]
        mongoFields[keyName] = 1
      }
    }
    sheetD = sheetData.find(whereConditions, {
      fields: mongoFields
    }).fetch()
  }

  for (l = 0; l < sheetD.length; l++) {
    // This is where you would want to remove author id and stuff
    delete sheetD[l]['_id']
    delete sheetD[l]['authorId']
    delete sheetD[l]['sheetId']

    if (ecn != null) {
      for (e = 0; e < ecn.length; e++) {
        delete sheetD[l][ecn[e]]
      }
    }

    if (tcn != null) {
      for (c = 0; c < tcn.length; c++) {
        newValue = tcn[c]['newValue']
        oldValueArray = tcn[c]['oldValues'].split(",")
        ov = oldValueArray[0]
        sheetD[l][newValue] = sheetD[l][ov]
        delete sheetD[l][ov]
      }
    }

    if (tfv != null) {
      for (f = 0; f < tfv.length; f++) {
        tfvOld = tfv[f]['oldValues'].split(",")
        tfvNew = tfv[f]['newValue']
        for (b = 0; b < tfvOld.length; b++) {
          v = _.invert(sheetD[l])[tfvOld[b]]
          if (typeof(v) != 'undefined') {
            sheetD[l][v] = tfvNew
          }
        }
      }
    }
  }
  return sheetD
}

Meteor.methods({
  insertAuthorTransformations: function(sheetId, transformationObject) {
    sheetDefinitions.update({
      _id: sheetId
    }, {
      $set: {
        authorTransformations: transformationObject
      }
    })
  },

  getSheetName: function(sheetId) {
    var res = sheetDefinitions.find({
      _id: sheetId
    }).fetch()
    res = res[0]
    return res['sheetName']
  },

  updateSheetName: function(sheetId, sheetName) {
    sheetDefinitions.update({
      _id: sheetId
    }, {
      $set: {
        sheetName: sheetName
      }
    })
    return sheetName
  },

  deleteEntireSheet: function(sheetId) {
    u = this.userId
    sheetDefinitions.remove({
      _id: sheetId,
      authorId: u
    })
    sheetData.remove({
      sheetId: sheetId,
      authorId: u
    })
    return true

  },

  getAuthorTransformations: function(sheetId) {
    return sheetDefinitions.find({
      _id: sheetId
    }).fetch()
  },

  authorFetchTransformedData: function(sheetId, sObj = null) {
    return server_fetchAndTransform(sheetId, sObj)
  },

  upsertGroupPermissions: function(groupId, sheetId, sqlObj) {
    t = groups.find({
      _id: groupId,
      'sheetPermissions.sheetId': sheetId
    }).fetch()
    if (t.length > 0) {
      groups.update({
        _id: groupId,
        'sheetPermissions.sheetId': sheetId
      }, {
        $set: {
          'sheetPermissions.$.sqlObject': sqlObj
        }
      }, {
        upsert: true
      })
    } else {
      objectToPush = {}
      objectToPush['sheetId'] = sheetId
      objectToPush['sqlObject'] = sqlObj
      groups.update({
        _id: groupId
      }, {
        $push: {
          'sheetPermissions': objectToPush
        }
      }, {
        upsert: true
      })
    }
  },

  server_getUserCreatedShareGroups: function() {
    data = groups.find({
      'groupOwner': Meteor.userId()
    }).fetch()
    return data
  },

  server_getShareGroupsBySheetId: function(sheetId) {
    data = groups.find({
      'groupOwner': Meteor.userId(),
      sheetId: sheetId
    }).fetch()
    return data
  },

  getSharedData(groupId, sheetId) {
    gInfo = groups.find({
      _id: groupId,
      'sheetPermissions.sheetId': sheetId
    }).fetch()
    gInfoZero = gInfo[0]['sheetPermissions'][0]['sqlObject']
    returnData = server_fetchAndTransform(sheetId, gInfoZero)
    return returnData
  },
  savePublicQuery: function(sheetId, accessType, accessQuery = null) {

    if (accessType === "noAccess") {
      sql = null
    }
    if (accessType === "allAccess") {
      sql = accessQuery
    }
    if (accessType === "accessByQuery") {
      sql = accessQuery
    }
    if (accessQuery == null) {
      sheetDefinitions.update({
        _id: sheetId
      }, {
        $set: {
          publicAccessType: accessType,
          publicAccessQuery: sql
        }
      })
    } else {
      sheetDefinitions.update({
        _id: sheetId
      }, {
        $set: {
          publicAccessType: accessType,
          publicAccessQuery: sql
        }
      })

    }
  },

  getPublicShareSettings: function(sheetId) {
    returnObject = {}

    r = sheetDefinitions.findOne({
      _id: sheetId
    })

    if (r['publicAcessType'] === "noAccess") {
      returnObject['publicAcessType'] = "noAccess"
    }
    if (r['publicAcessType'] === "allAccess") {
      returnObject['publicAcessType'] = "allAccess"
    }
    if (r['publicAcessType'] === "accessByQuery") {
      returnObject['publicAcessType'] = "accessByQuery"
      if (typeof(r['publicAccessQuery']) != 'undefined') {
        if (typeof(r['publicAccessQuery']['text']) != 'undefined') {
          if (r['publicAccessQuery']['text'].length > 0) {
            returnObject['sql'] = r['publicAccessQuery']['text']

          }
        }
      }

    }
    return returnObject
  }
})
