sqlToMongo = function(s){
    a = s.split(" ")
    
    for(i=0; i<a.length; i++){
        a[i] = a[i].toLowerCase()
    }
    
    console.log(a)

    if(a[0] != "select"){
        return ["error", 'first must be select']
    }
    
    // get position of "From" keyword
    fromPosition = _.indexOf(a, "from")
    console.log("FromPosition: "+ fromPosition)
    

    
    
}


testSqlToMongo = function(){
    testArray = ["select * from weddingGuestimates", "select firstName, lastName from WeddingGuestimates", "select 'first name', 'last name' from WeddingGuestimates", 'select FIRSTNAME from weddingGuestimates"']
    for(var i=0; i<testArray.length; i++){
        console.log("HI")
        sqlToMongo(testArray[i])
        
    }

    
    
}


