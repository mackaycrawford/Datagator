Template.authorTransform.onRendered(function() {


Meteor.call('getAuthorTransformations', queryString()['sheetId'], function(err, res){
  t = res[0]['authorTransformations']
  console.log(res); 
  console.log(err)
    if(typeof(t) != 'undefined'){
    $("#excludeColumnNames").val(t['excludeColumnNamesText'])
    $("#translateColumnNames").val(t['translateColumnNamesText'])
    $("#translateFieldValues").val(t['translateFieldValuesText'])
  }
  
})

    
client_insertAuthorauthorTransformations = function(transformationObject){
  Meteor.call('insertAuthorTransformations', queryString()['sheetId'], transformationObject)
}

translateColumnNamesFn = function(){
  
  t = $("#translateColumnNames").val()
  
  if(t.length > 0){
  // Define output
  outArray = new Array()
  
  // Split it by new line
  t = t.split("\n")
  //console.log(t)
  
  // For each new line
  for(i=0; i<t.length; i++){
  
    // Split it by the "=" 
    x = t[i].split("=")
    console.log(x)
      
      // for each array item

      newObj = {}
      console.log(x[0])
      newObj['newValue'] = x[0].trim().replace(/"/g, "")
      newObj['oldValues'] = x[1].trim().replace(/"/g, "").replace(/, /g, ",")
      
        // Add object to output
      outArray.push(newObj)
  }
  
  
  // REturn output
    return outArray
  }
  else{
    return null
  }
  
} 



excludeColumnNamesFn = function(){
  e = $("#excludeColumnNames").val()
  if(e.length > 0){
  // Define the output obj
  outArray = new Array()
  
  // Split into array by , 
  e = e.split(",")
  // add each item to output obj
  for(z=0; z<e.length; z++){
    outArray.push(e[z].trim().replace(/"/g, ""))
  }
  return outArray 
  } else {
     return null
  }
  // Return output
  
  

}


translateFieldValuesFn = function(){
  t = $("#translateFieldValues").val()
  if(t.length > 0){
  // Define output
  
  outArray = new Array()
  
  // Split it by new line
  t = t.split("\n")
  //console.log(t)
  
  // For each new line
  for(i=0; i<t.length; i++){
  
    // Split it by the "=" 
    x = t[i].split("=")
    console.log(x)
      
      // for each array item

      newObj = {}
      console.log(x[0])
      newObj['newValue'] = x[0].trim().replace(/"/g, "")
      newObj['oldValues'] = x[1].trim().replace(/"/g, "").replace(/, /g, ",")
      
        // Add object to output
      outArray.push(newObj)
  }
  
  
  // REturn output
    return outArray
  } else {
    return null
  }
    

  
} 

createTransformObj = function(){
  outObj = {}
  ecnText = $("#excludeColumnNames").val()
  tcnText = $("#translateColumnNames").val()
  tfvText = $("#translateFieldValues").val()
  tcn = translateColumnNamesFn()
  ecn = excludeColumnNamesFn()
  tfv = translateFieldValuesFn()
  outObj['excludeColumnNamesText'] = ecnText
  outObj['excludeColumnNames'] = ecn
  outObj['translateColumnNamesText'] = tcnText
  outObj['translateColumnNames'] = tcn
  outObj['translateFieldValuesText'] = tfvText
  outObj['translateFieldValues'] = tfv
  return outObj

}




    
    
    
    
    
    
  
    $("#saveAuthorTranslationButton").click(function(){
        o = createTransformObj()
        client_insertAuthorauthorTransformations(o)
        
    })

  $(document).ready(function() {
    console.log("t ready")
  // displaySavedAuthorTransformations(t)
    console.log("it ran ready")
    
    
    
  })
})

Template.authorTransform.helpers({

})
