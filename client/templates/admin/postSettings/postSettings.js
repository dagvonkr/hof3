let tpl = Template.postSettings;

tpl.onCreated( function () {
  let self = this;

  self.isPublished = new ReactiveVar( self.data.isPublished || null );
  self.headerTop = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.top:null );
  self.headerLeft = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.left:null );
  self.headerWidth = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.width:null );
  self.headerFontSize = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.fontSize:null );
  self.headerTextAlign = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.textAlign:null );
  self.headerTextShadow = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.textShadow:null );
  self.headerColor = new ReactiveVar( (!!self.data.style && !!self.data.style.header)?self.data.style.header.color:null );
});

tpl.onRendered(function () {
  let self = this;

  $(self.find('#postIsPublished')).prop('checked', self.isPublished.get() );
  $(self.find('#postHeaderTop')).val( self.headerTop.get() );
  $(self.find('#postHeaderLeft')).val( self.headerLeft.get() );
  $(self.find('#postHeaderWidth')).val( self.headerWidth.get() );
  $(self.find('#postHeaderFontSize')).val( self.headerFontSize.get() );
  $(self.find('#postHeaderTextAlign')).val( self.headerTextAlign.get() );
  $(self.find('#postHeaderTextShadow')).val( self.headerTextShadow.get() );
  $(self.find('#postHeaderColor')).val( self.headerColor.get() );
  $(self.find('#postIsPublished')).focus();
});

tpl.helpers({
  isPublished() {
    return Template.instance().isPublished.get();
  },

  headerTop() {
    return Template.instance().headerTop.get();
  },

  headerLeft() {
    return Template.instance().headerLeft.get();
  },

  headerWidth() {
    return Template.instance().headerWidth.get();
  },

  headerFontSize() {
    return Template.instance().headerFontSize.get();
  },

  headerTextAlign() {
    return Template.instance().headerTextAlign.get();
  },

  headerTextShadow() {
    return Template.instance().headerTextShadow.get();
  },

  headerColor() {
    return Template.instance().headerColor.get();
  }
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
  }

});
