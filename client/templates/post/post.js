let tpl = Template.post;

tpl.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function () {
    var postId = FlowRouter.getQueryParam('postId');
    var handle = subs.subscribe('post', postId);
    self.ready.set(handle.ready());
  });
});