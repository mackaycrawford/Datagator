var fs = Npm.require('fs');
var path = Npm.require('path');

getAllFilesEmailsFolder = function(){
    var basepath = path.resolve('.').split('.meteor')[0];
    finalpath = basepath +'.emails/'
    res = fs.readdirSync(finalpath)
    console.log(res)
    return res
}

removeFile = function(fileName){
    var basepath = path.resolve('.').split('.meteor')[0];
    finalpath = basepath +'.emails/'
    filePath = finalpath + fileName
    fs.unlinkSync(filePath);
}

//getAllFilesEmailsFolder()

//removeFile("56cb1ace2944fb173d8b4578.txt")