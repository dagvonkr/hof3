let tpl = Template.adminPosts;

tpl.onCreated(function () {
  var self = this;
  initializeOn(self);
});

function initializeOn (aTemplate) {

  // aTemplate.ready = new ReactiveVar();
  // aTemplate.autorun(function () {
  //   var handle = PostSubs.subscribe('allPosts');
  //   aTemplate.ready.set(handle.ready());
  // });

}

tpl.helpers({
  posts: function () {
    return Posts.find();
  }
});