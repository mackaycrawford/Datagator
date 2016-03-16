if (Meteor.isClient) {
  sqlToObj = function(sql, isTranslated=false) {
    outObj = {
        text: sql,
        type: null,
        fields: null,
        selectAll: false,
        isTranslated: isTranslated,
        where: {
          sheetId: queryString()['sheetId']
        },
        like: {}
      }
      // if the first word is select this should be a type of 'select'
    if (sql.split(" ")[0].toLowerCase() === "select") {
      outObj['type'] = 'select'
    }
    // check to see if the second field is "*"
    // If yes, then get the fields from the reference and add to the object
    if (sql.split(" ")[1] === "*") {
        outObj['selectAll'] = true
    }
    else {
      fromPosition = sql.search("from")
      sub = sql.substring(6, fromPosition)
      na = sub.split(",")
      for (var i = 0; i < na.length; i++) {
        na[i] = na[i].trim()
        na[i] = na[i].replace(/'/g, "")
      }
      outObj['fields'] = na
    }
    // Search for the "where" 
    if (sql.search("where") > 0) {
      whereSub = sql.substring(sql.search("where") + 5, sql.length)

      // Search for "and"
      isAnd = whereSub.search("and")

      if (isAnd > 0) {

      } else {
        isEquals = whereSub.search("=")
        if (isEquals > 0) {
          ws = whereSub.split("=")
          ws[0] = ws[0].trim()
          ws[0] = ws[0].replace(/'/g, "")
          ws[0] = ws[0].replace(/"/g, "")
          ws[1] = ws[1].trim()
          ws[1] = ws[1].replace(/'/g, "")
          ws[1] = ws[1].replace(/"/g, "")
          outObj['where'][ws[0]] = ws[1]
        }
        isLike = whereSub.search("like")
        if (isLike > 0) {
          ws = whereSub.split("like")
          ws[0] = ws[0].trim()
          ws[0] = ws[0].replace(/'/g, "")
          ws[0] = ws[0].replace(/"/g, "")
          ws[1] = ws[1].trim()
          ws[1] = ws[1].replace(/'/g, "")
          ws[1] = ws[1].replace(/"/g, "")
            //outObj['where'][ws[0]] = "\/" + ws[0] + "\/"
          outObj['where'][ws[0]] = new RegExp(ws[1], "");
          //outObj['like'][ws[0]] = \" ws[1] \"
        }
      }
    }

    return outObj
  }

objToMongo = function(sqlObj){
  // type: "Select"
  // fields: ['firstname', 'lastname']
  // where: "{name: Dave}"
  mongoFields = {_id: 0}
  whereConditions= sqlObj['where']
  
  if(sqlObj['fields'] != 1){
  for(var i=0; i<sqlObj['fields'].length; i++){
    var keyName = sqlObj['fields'][i]
    mongoFields[keyName] = 1
  }
  } 
  returnData = sheetData.find(whereConditions,{fields: mongoFields}).fetch()
  return returnData
 
}


  orderGridColumns = function(sqlObj, gridData) {
    outputArr = []
    fieldArray = sqlObj['fields']


    for (var g = 0; g < gridData.length; g++) {
      lineObject = {}
      for (var f = 0; f < fieldArray.length; f++) {
        res = gridData[g][fieldArray[f]]
          //cLog("PLUCKED")
          //cLog(res)
        lineObject[fieldArray[f]] = res
      }
      outputArr.push(lineObject)
    }
    return outputArr
  }
  
  
  SQL = function(query, isTranslated) {
    sqlObjectOutput = sqlToObj(query, isTranslated)
    result = objToMongo(sqlObjectOutput)
    
    if (_.isEmpty(result[0])) {
      cLog("No results because there are no columns that match what was specified")
      return 0
    }
    result = orderGridColumns(sqlObjectOutput, result)
    for (i = 0; i < result.length; i++) {
      cLog(result[i])
    }


    return result
  }

}

if (Meteor.isServer) {
    
    Meteor.methods({
        fetchMongoData: function(sqlObject){
            
        }
        
    })

}
