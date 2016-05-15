let tpl = Template.postInRow;

tpl.onCreated(function() {
  var self = this;

  self.ready = new ReactiveVar();
  self.autorun(function () {
    debugger
    var postId = FlowRouter.getQueryParam('postId');
    var handle = subs.subscribe('post', postId);
    self.ready.set(handle.ready());
  });
});

tpl.helpers({
  isReady() {
    return Template.instance().ready.get();
  }
})
