


insertOrSkip = function(existingData, newData){
    newLines = new Array()
    
    for(var n=0; n<newData.length; n++){
        console.log("TRYING N")
        delete newData[n]['_id']
        delete newData[n]['sheetId']
        delete newData[n]['authorId']
        isMatch = false
        
        for(var e=0; e<existingData.length; e++){
            
            console.log("TRYING E")
            delete existingData[e]['_id']
            delete existingData[e]['sheetId']
            delete existingData[e]['authorId']
            
            if(_.isEqual(existingData[e], newData[n]) == true){
                isMatch = true
                console.log("There is a match")
            } else {
                
            }          
        }
        if(isMatch == false){
            console.log("there was no match")
            newLines.push(newData[n])
        }
        
    }
    
    return newLines
    
}