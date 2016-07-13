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
    return Posts.getMainImageUrlFor(aPost);
  },
  isReady() {
    return Template.instance().ready.get();
  },
  posts() {
    const query = { notAdded: { $ne: true } };
    return Posts.find(query, {sort: {createdOn: -1}} );
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

function showModalOn (anId) {
  let post = Posts.findOne(anId);
  Modal.show('postSettings', post, {});
}