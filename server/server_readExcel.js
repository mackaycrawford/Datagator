var fs = Npm.require('fs');
var path = Npm.require('path');



processEmailedExcelToJSON = function(filename){
    var basepath = path.resolve('.').split('.meteor')[0];
    var excel = new Excel('xlsx');
    var workbook = excel.readFile( basepath+'.emails/' + filename); 
    yourSheetsName = workbook.SheetNames;
    sheetOne = yourSheetsName[0]
    var sheet = workbook.Sheets[sheetOne]
    var options = {}
    var workbookJson = excel.utils.sheet_to_json( sheet, options );
    return workbookJson
}

processUploadedExcelToJSON = function(filename){
    var basepath = path.resolve('.').split('.meteor')[0];
    var excel = new Excel('xlsx');
    var workbook = excel.readFile( basepath+'.uploads/' + filename); 
    yourSheetsName = workbook.SheetNames;
    sheetOne = yourSheetsName[0]
    var sheet = workbook.Sheets[sheetOne]
    var options = {}
    var workbookJson = excel.utils.sheet_to_json( sheet, options );
    return workbookJson
}


processExcelJSONtoDB = function(fileJSON, authorId, sheetId, writeType){
    if(writeType === "append"){
        for(i=0; i<fileJSON.length; i++){
            fileJSON[i]['authorId'] = authorId
            fileJSON[i]['sheetId'] = sheetId
            //console.log("Inserting Sheet Data!")
            //console.log(fileJSON[i])
            sheetData.insert(fileJSON[i])
        }
    }
    if(writeType === "overwrite"){
        sheetData.remove({sheetId: sheetId})
        for(i=0; i<fileJSON.length; i++){
            fileJSON[i]['authorId'] = authorId
            fileJSON[i]['sheetId'] = sheetId
            sheetData.insert(fileJSON[i])
        }
    }
    if(writeType === 'smartAppend'){
        existingData = sheetData.find({sheetId: sheetId}).fetch()
        newData = fileJSON 
        res = insertOrSkip(existingData, newData)
        for(i=0; i<res.length; i++){
            res[i]['authorId'] = authorId
            res[i]['sheetId'] = sheetId
            sheetData.insert(fileJSON[i])
        }
        
    }
    
    
}

//processEmailedExcel('56cf0c6acd055381088b4570.xlsx')

processExcel = function(filename, authorId, sheetId, inputType, writeType){
    if(inputType === "email"){
        js = processEmailedExcelToJSON(filename)
    }
    
    if(inputType === "upload"){
        js = processUploadedExcelToJSON(filename)
    }
    
    processExcelJSONtoDB(js, authorId, sheetId, writeType)
}

//processExcel('56cf0c6acd055381088b4570.xlsx', "AUTHO", "SHEETID", 'append')

Meteor.methods({
    callProcessEmailedExcelToJSON: function(fname){
        res = processEmailedExcelToJSON(fname)
        return res
    }, 
    callUploadedExcelToJSON: function(fname){
        res = processUploadedExcelToJSON(fname)
        
        return res
    }
})