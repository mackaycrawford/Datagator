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


processExcelJSONtoDB = function(fileJSON, authorId, sheetId, writeType){
    if(writeType === "append"){
        for(i=0; i<fileJSON.length; i++){
            fileJSON[i]['authorId'] = authorId
            fileJSON[i]['sheetId'] = sheetId
            console.log("Inserting Sheet Data!")
            console.log(fileJSON[i])
            sheetData.insert(fileJSON[i])
        }
    }
    
}

//processEmailedExcel('56cf0c6acd055381088b4570.xlsx')

processExcel = function(filename, authorId, sheetId, writeType){
    js = processEmailedExcelToJSON(filename)
    processExcelJSONtoDB(js, authorId, sheetId, writeType)
}

//processExcel('56cf0c6acd055381088b4570.xlsx', "AUTHO", "SHEETID", 'append')

Meteor.methods({
    callProcessEmailedExcelToJSON: function(fname){
        res = processEmailedExcelToJSON(fname)
        return res
    }
})