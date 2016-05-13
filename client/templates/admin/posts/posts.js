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
  'click .editPost': function (event, template) {
    FlowRouter.go('postEditor', {postId: this._id});

  }
})