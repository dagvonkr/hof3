import subs from '../../modules/subscriptionsManager';

let tpl = Template.postView;

tpl.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar;
  self.data.postId = new ReactiveVar;
  initializeOn(self);
});

tpl.onRendered(function () {
  let self = this;
});

tpl.helpers({
  post() {
    return Posts.findOne(FlowRouter.current().params.postId);
  },
  isReady() {
    return Template.instance().ready.get();
  }
});

function initializeOn (aTemplate) {

  aTemplate.autorun(() => {
    const postId = FlowRouter.current().params.postId;
    const handle = subs.subscribe('post', postId);
    aTemplate.ready.set(handle.ready());
    if(aTemplate.ready.get()) {
      const post = Posts.findOne(FlowRouter.current().params.postId);
      aTemplate.data.postId.set(post._id);
      Meteor.setTimeout(function () {
        $('#postContent').html(post.content);
        Posts.updatePostStyleOn(aTemplate, postId);
      }, Meteor.settings.public.postInRowOnReadyDelay);
    }
  });

  Posts.find().observe({
    changed: function (newDoc, oldDoc, atIndex) {
      const postId = aTemplate.data._id;
      if(postId === newDoc._id) {
        $('#postContent').html(newDoc.content);
        Posts.updatePostStyleOn(aTemplate, postId);
      }
    }
  });
}
