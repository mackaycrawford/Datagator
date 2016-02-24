var fs = Npm.require('fs');
var path = Npm.require('path');
var basepath = path.resolve('.').split('.meteor')[0];
var excel = new Excel('xlsx');
var workbook = excel.readFile( basepath+'.uploads/test.xlsx'); 
yourSheetsName = workbook.SheetNames;
console.log(yourSheetsName)