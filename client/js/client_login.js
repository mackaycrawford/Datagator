if (Meteor.isClient) {
  
    Template.login.rendered = function () {

        $(document).ready(function(){
            
         })
    }
    
    
Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();

      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;
        Meteor.loginWithPassword(email, password, function(err){
        if (err) {

        }
        else {
          window.location.href = "/dashboard";
        }
      });
         return false; 
      }
  });
}