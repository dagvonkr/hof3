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
  isReady() {
    return Template.instance().ready.get();
  },
  posts() {
    return Posts.find({}, {sort: {createdOn: -1}} );
  }
});

tpl.events({
  'click .postSettings': function (event, template) {
    console.log(`postSettings would use ${this._id}`);
    showModalOn(this._id);
  },
  'click .editPost': function (event, template) {
    FlowRouter.go('postEditor', {postId: this._id});

  }
});

function showModalOn (anId) {
  let post = Posts.findOne(anId);
  Modal.show('postSettings', post, {});
}