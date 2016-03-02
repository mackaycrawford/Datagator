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

Router.route('/createSheet', function () {
  this.render('createSheet');
});

Router.route('/listOwnedSheets', function () {
  this.render('listOwnedSheets');
});

Router.route('/admin', function () {
  if(Meteor.user()['profile']['isAdmin'] === true){
        this.render('admin');
      }
   else {this.render('welcome')}
});


Router.route('/viewSheet', function () {
  //var item = Items.findOne({_id: this.params._id});
  this.render('viewSheet');
});

Router.route('/excel', function () {
  this.render('connector_uploadExcel');
});

Router.route('/createGroup', function () {
  this.render('createGroup');
});

Router.route('/listGroups', function () {
  this.render('listGroups');
});