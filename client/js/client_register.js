if (Meteor.isClient) {
  
    Template.register.rendered = function () {

        $(document).ready(function(){
         })
    }
    
    
  Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;
        

      Accounts.createUser({email: email, password : password, profile: {isAdmin: false}}, function(err){
          if (err) {
              
          } else {
            Router.go('dashboard')
          }
        });

      return false;
    }
  });
}