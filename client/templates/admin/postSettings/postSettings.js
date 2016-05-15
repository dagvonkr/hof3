let tpl = Template.postSettings;

tpl.onCreated( function () {

});

tpl.helpers({

});

tpl.events({
  'change #postHeaderTextAlign': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'style.header.textAlign',
      $(template.find('#postHeaderTextAlign')).val());
  },

  'change #postHeaderTextShadow': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'style.header.textShadow',
      $(template.find('#postHeaderTextShadow')).val());
  },

  'change #postHeaderColor': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'style.header.color',
      $(template.find('#postHeaderColor')).val());
    // console.log(`postHeaderColor ${$(template.find('select')).val()}`);
  }

});
