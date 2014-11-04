Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient){
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
  Template.body.events({
  "submit .new-task": function (event) {
    // This function is called when the new task form is submitted

    var text = event.target.text.value;
    var subtext = event.target.subtext.value;

    Tasks.insert({
      text: text,
      subtext: subtext,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";
    event.target.subtext.value = "";

    // Prevent default form submit
    return false;
  }
  });

  Template.task.events({
    "click .toggle-checked": function(){

      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  });
}