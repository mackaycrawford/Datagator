t1 = "select City, Essential from table where Owner = 'DC'"
t2 = "SELECT firstName, lastName from table"
t3 = "select 'First Name', 'Last Name' from table"

sqlToObj = function(sql) {
  outObj = {
    type: null,
    fields: null,
    where: {sheetId: queryString()['sheetId']},
    like: {}
  }
  // if the first word is select this should be a type of 'select'
  if (sql.split(" ")[0].toLowerCase() === "select") {
    outObj['type'] = 'select'
  }
  // check to see if the second field is "*"
  // If yes, then get the fields from the reference and add to the object
  if (sql.split(" ")[1] === "*") {
    outObj['fields'] = _.keys(sheetData.find({sheetId:queryString()['sheetId']},{fields: {_id: 0, sheetId: 0, authorId:0}}).fetch()[0])
    //outObj['fields'] = 1

  }
  // If no do the following: 
  // Find the "From" keyword position
  // reduce the string to everything between the select and the from 
  // split based on teh commas 
  // add the fields
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
      if(isLike > 0){
        ws = whereSub.split("like")
        ws[0] = ws[0].trim()
        ws[0] = ws[0].replace(/'/g, "")
        ws[0] = ws[0].replace(/"/g, "")
        ws[1] = ws[1].trim()
        ws[1] = ws[1].replace(/'/g, "")
        ws[1] = ws[1].replace(/"/g, "")
        //outObj['where'][ws[0]] = "\/" + ws[0] + "\/"
        outObj['where'][ws[0]] = new RegExp(ws[1],"");
        //outObj['like'][ws[0]] = \" ws[1] \"
      }
    }
  }

  return outObj
}

objToUnderscore = function(sqlObj) {
  d = $container.handsontable('getData')
  cLog("here is sqlobjwhere")
  cLog(sqlObj['where'])
  resText = "_.where(" + d + "," + sqlObj['where'] + ")"
  cLog(resText)
  res = _.where(d, sqlObj['where'])
  cLog(res)
  outAr = []
  for (var i = 0; i < res.length; i++) {
    f = _.pick(res[i], sqlObj['fields'])
    outAr.push(f)
  }
  return outAr
}
//objToUnderscore(sqlToObj(t1))


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

orderGridColumns = function(sqlObj, gridData){
  outputArr = []
  fieldArray = sqlObj['fields']
  
  
  for(var g=0; g<gridData.length; g++){
    lineObject = {}
    for(var f = 0 ; f<fieldArray.length; f++){
      res = gridData[g][fieldArray[f]]
      //cLog("PLUCKED")
      //cLog(res)
      lineObject[fieldArray[f]] = res
    }
    outputArr.push(lineObject)
  }
  return outputArr
}

SQL = function(query){
  sqlObjectOutput = sqlToObj(query)
  cLog("query Object Fields:")
  cLog(sqlObjectOutput['fields'])
  cLog("query Object Where:")
  cLog(sqlObjectOutput['where'])
  cLog("query Object Like:")
  cLog(sqlObjectOutput['like'])
  cLog("end query object")
  result = objToMongo(sqlObjectOutput)
  cLog("begin result")
  
  
  if(_.isEmpty(result[0])){
    cLog("No results because there are no columns that match what was specified")
    return 0
  }
  
  result = orderGridColumns(sqlObjectOutput, result)
  
  
  for(i=0; i<result.length; i++){
    cLog(result[i])

    
  }
  
  
  return result
}


Template.viewSheet.onRendered(function() {
  $(document).ready(function(){
      
      $("#runSql").click(function(){
          getVal = $("#sqlText").val()
          res = SQL(getVal)
          if(res == 0){
            showNoResults()
          } else {
              showResults()
              renderGrid(res)
          }
          
          //newGrid = objToUnderscore(sqlObjectOutput)
          
          

          
      })
      
  })  
    
    
})