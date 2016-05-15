let tpl = Template.postSettings;

tpl.onCreated( function () {

});

tpl.helpers({

});

tpl.events({
  'change #postHeaderTextShadow': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderTextShadow', whichPost, $(template.find('#postHeaderTextShadow')).val());
  },

  'change #postHeaderColor': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderColor', whichPost, $(template.find('#postHeaderColor')).val());
    // console.log(`postHeaderColor ${$(template.find('select')).val()}`);
  }

});
