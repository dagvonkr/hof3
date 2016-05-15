let tpl = Template.postSettings;

tpl.onCreated( function () {

});

tpl.helpers({

});

tpl.events({
  'change #postIsPublished': function (event, template) {
    const whichPost = this._id;
    Meteor.call('publishPost',
      whichPost,
      $(template.find('#postIsPublished')).prop('checked'));
  },

  'change #postHeaderTop': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'top',
      $(template.find('#postHeaderTop')).val());
  },

  'change #postHeaderLeft': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'left',
      $(template.find('#postHeaderLeft')).val());
  },

  'change #postHeaderWidth': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'width',
      $(template.find('#postHeaderWidth')).val());
  },

  'change #postHeaderFontSize': function (event, template) {
    const whichPost = this._id;
    Meteor.call('updateHeaderStyle',
      whichPost,
      'fontSize',
      $(template.find('#postHeaderFontSize')).val());
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
