// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

let tpl = Template.post;

tpl.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function () {
    var postId = FlowRouter.getQueryParam('postId');
    var handle = PostSubs.subscribe('post', postId);
    self.ready.set(handle.ready());
  });
});