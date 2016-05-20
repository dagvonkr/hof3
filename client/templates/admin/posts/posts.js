import subs from '../../../modules/subscriptionsManager';
import Posts from '../../../../model/posts';

let tpl = Template.adminPosts;

tpl.onCreated(function () {
  var self = this;
  initializeOn(self);
});

function initializeOn (aTemplate) {
  aTemplate.ready = new ReactiveVar();
  aTemplate.autorun(function () {
    var handle = subs.subscribe('allPosts');
    aTemplate.ready.set(handle.ready());
  });
}

tpl.helpers({
  getMainImageUrlFor(aPost) {
    return getMainImageUrlFor(aPost);
  },
  isReady() {
    return Template.instance().ready.get();
  },
  posts() {
    return Posts.find({}, {sort: {createdOn: -1}} );
  }
});

tpl.events({
  'click .removePost': function (event, template) {
    Meteor.call('removePost', this._id);
  },
  'click .postSettings': function (event, template) {
    showModalOn(this._id);
  },
  'click .editPost': function (event, template) {
    FlowRouter.go('postEditor', {postId: this._id});

  }
});

function hasImageOn (aPost) {
  // Answers true if there are images in aPost.
  return !!aPost.images && !!aPost.images[0];
}

function getMainImageUrlFor (aPost) {
  // Answers the url of the main image of aPost.
  try {
      return  `${Meteor.absoluteUrl()}images/${aPost.images[0]}.${Meteor.settings.public.imageFormat}`;
    } catch (error) {
      return null;
    }
}

function showModalOn (anId) {
  let post = Posts.findOne(anId);
  Modal.show('postSettings', post, {});
}