import subs from '../../modules/subscriptionsManager';
let tpl = Template.post;

tpl.onCreated(function() {
  var self = this;
  self.data.postId = new ReactiveVar(FlowRouter.current().params.postId);
  self.ready = new ReactiveVar();

  self.autorun(function () {
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