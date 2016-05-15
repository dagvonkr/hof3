let tpl = Template.postSettings;

tpl.onCreated( function () {

});

tpl.helpers({

});

tpl.events({
  'change #postHeaderFontSize': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'fontSize',
      $(template.find('#postHeaderTextAlign')).val());
  },

  'change #postHeaderTextAlign': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'textAlign',
      $(template.find('#postHeaderTextAlign')).val());
  },

  'change #postHeaderTextShadow': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'textShadow',
      $(template.find('#postHeaderTextShadow')).val());
  },

  'change #postHeaderColor': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'color',
      $(template.find('#postHeaderColor')).val());
    // console.log(`postHeaderColor ${$(template.find('select')).val()}`);
  }

});
