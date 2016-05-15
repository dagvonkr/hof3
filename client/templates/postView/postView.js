import subs from '../../modules/subscriptionsManager';

let tpl = Template.postView;

tpl.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar;
  initializeOn(self);
});

tpl.onRendered(function () {
  let self = this;

});

tpl.helpers({
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
      aTemplate.data = Posts.findOne(FlowRouter.current().params.postId);
      Meteor.setTimeout(function () {
        Posts.updatePostStyleOn(aTemplate, postId);
      }, Meteor.settings.public.postInRowOnReadyDelay);
    }
  });

  Posts.find().observe({
    changed: function (newDoc, oldDoc, atIndex) {
      if(aTemplate.data._id === newDoc._id) {
        Posts.updatePostStyleOn(aTemplate, postId);
      }
    }
  });
}
