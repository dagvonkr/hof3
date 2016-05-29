import subs from '../../modules/subscriptionsManager';
import Posts from '../../../model/posts';

let tpl = Template.posts;

tpl.onCreated(function () {
  var self = this;
  initializeOn(self);
});

function initializeOn (aTemplate) {
  aTemplate.ready = new ReactiveVar();
  aTemplate.autorun(function () {
    var handle = subs.subscribe('publishedPosts');
    aTemplate.ready.set(handle.ready());
  });
}

tpl.helpers({
  isReady () {
    return Template.instance().ready.get();
  },
  publishedPosts() {
    return Posts.find({ isPublished: true },{sort: {createdOn: -1}});
  }
})