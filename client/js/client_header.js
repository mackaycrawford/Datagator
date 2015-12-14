if (Meteor.isClient) {
    
    /// Load Fo
    
    
    Template.header.events({
        'click #signOut': function (event) {

            Meteor.logout(function(){
                Router.go('welcome')
            })
            
        }
        
    })
  
  
    Template.header.rendered = function () {


        $(document).ready(function(){


            
         })
    }
}

Template.header.helpers({

    
})