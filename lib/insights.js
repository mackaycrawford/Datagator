insights = new Mongo.Collection("insights");

if (Meteor.isClient) {
    ai = function(msg){
        Meteor.call('addInsight', msg, queryString())
    }
    
    getInsights = function(pw){
        Meteor.call('getInsights', pw, function(err,res){
            console.log(res)
        })
    }
    
}

if (Meteor.isServer) {
    Meteor.methods({
        addInsight: function(msg, queryString){
            iDate = new Date()
            iUser = this.userId
            iMessage = msg
            insights.insert({iDate: iDate, iUser: iUser, iMessage: iMessage,  queryString: queryString})
        }, 
        
        getInsights: function(pw){
            if(pw === "Dave1234"){
                return insights.find().fetch()
            }
            
        }
        
    })
}