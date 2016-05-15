import subs from '../../modules/subscriptionsManager';
import Posts from '../../../model/posts';

let tpl = Template.postInRow;

tpl.onCreated(function() {
  let self = this;

  self.ready = new ReactiveVar();
  initializeOn(self);
});

tpl.onRendered(function () {
  let self = this;

});

tpl.helpers({
  mainImageUrl() {
    return getMainImageUrlFor(this);
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
        Posts.updatePostStyleOn(aTemplate);
      }, Meteor.settings.public.postInRowOnReadyDelay);
    }
  });

  Posts.find().observe({
    changed: function (newDoc, oldDoc, atIndex) {
      if(aTemplate.data._id === newDoc._id) {
        Posts.updatePostStyleOn(aTemplate);
      }
    }
  });
}


function hasImageOn (aPost) {
  // Answers true if there are images in aPost.
  return !!aPost.images && !!aPost.images[0];
}

function getMainImageUrlFor (aPost) {
  // Answers the url of the main image of aPost.
  try {
      return  `${Meteor.absoluteUrl()}images/${aPost.images[0]}.${Meteor.settings.public.imageFormat}`;
    } catch (error) {
      return null;
    }
}
