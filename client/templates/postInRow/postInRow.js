import subs from '../../modules/subscriptionsManager';
import Posts from '../../../model/posts';

let tpl = Template.postInRow;

tpl.onCreated(function() {
  let self = this;

  self.ready = new ReactiveVar();
  // initializeOn(self);
});

tpl.onRendered(function () {
  let self = this;

});

tpl.helpers({
  mainImageUrl() {
    return Posts.getMainImageUrlFor(this);
  },

  isReady() {
    return Template.instance().ready.get();
  }
});

function initializeOn (aTemplate) {

  aTemplate.autorun(() => {
    const postId = aTemplate.data._id;
    const handle = subs.subscribe('post', postId);
    aTemplate.ready.set(handle.ready());
    if(aTemplate.ready.get()) {
      Meteor.setTimeout(function () {
        Posts.updatePostStyleOn(aTemplate, postId);
      }, Meteor.settings.public.postInRowOnReadyDelay);
    }
  });

  Posts.find().observe({
    changed: function (newDoc, oldDoc, atIndex) {
      const postId = aTemplate.data._id;
      if(postId === newDoc._id) {
        Posts.updatePostStyleOn(aTemplate, postId);
      }
    }
  });
}


