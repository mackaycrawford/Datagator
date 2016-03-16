Template.import.onRendered(function() {
  //Meteor.subscribe('data')
  console.log("template rendered")
  $(document).ready(function() {
    console.log("document ready")
  })
})

Template.import.helpers({
  showData: function() {
    return "HELLO THERE"
  }, 
  listData: function(){
    return [{"myKey": "apple"},{"myKey": "banaa"}, {"myKey": "cat"},{"myKey": "dog"} ]
  }
})
