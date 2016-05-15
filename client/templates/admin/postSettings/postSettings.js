let tpl = Template.postSettings;

tpl.onCreated( function () {

});

tpl.helpers({

});

tpl.events({
  'change #postHeaderColor': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderColor', whichPost, $(template.find('select')).val());
    // console.log(`postHeaderColor ${$(template.find('select')).val()}`);
  }

});
