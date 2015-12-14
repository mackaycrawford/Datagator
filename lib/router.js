Router.route('/', function () {
  this.render('welcome');
});


Router.route('/welcome', function () {
  this.render('welcome');
});

Router.route('/logs', function () {
  this.render('logs');
});


Router.route('/register', function () {
  this.render('register');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/dashboard', function () {
  this.render('dashboard');
});

Router.route('/testPage', function () {
  this.render('testPage');
});

Router.route('/admin', function () {
  if(Meteor.user()['profile']['isAdmin'] === true){
        this.render('admin');
      }
   else {this.render('welcome')}
});