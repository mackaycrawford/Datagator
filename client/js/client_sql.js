t1 = "select City, Essential from table where Owner = 'DC'"
t2 = "SELECT firstName, lastName from table"
t3 = "select 'First Name', 'Last Name' from table"

sqlToObj = function(sql) {
  outObj = {
    type: null,
    fields: null,
    where: {}
  }
  // if the first word is select this should be a type of 'select'
  if (sql.split(" ")[0].toLowerCase() === "select") {
    outObj['type'] = 'select'
  }
  // check to see if the second field is "*"
  // If yes, then get the fields from the reference and add to the object
  if (sql.split(" ")[1] === "*") {
    outObj['fields'] = _.keys($container.handsontable('getData')[0])
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
    console.log(whereSub)
      // Search for "and"
    isAnd = whereSub.search("and")

    if (isAnd > 0) {

    } else {
      isEquals = whereSub.search("=")
      if (isEquals > 0) {
        ws = whereSub.split("=")
        ws[0] = ws[0].trim()
        ws[0] = ws[0].replace(/'/g, "")
        ws[1] = ws[1].trim()
        ws[1] = ws[1].replace(/'/g, "")
        outObj['where'][ws[0]] = ws[1]
      }
    }
  }
  console.log(outObj)
  return outObj
}

objToUnderscore = function(sqlObj) {
  d = $container.handsontable('getData')
  res = _.where(d, sqlObj['where'])
  outAr = []
  for (var i = 0; i < res.length; i++) {
    f = _.pick(res[i], sqlObj['fields'])
    outAr.push(f)
  }
  return outAr
}
//objToUnderscore(sqlToObj(t1))
