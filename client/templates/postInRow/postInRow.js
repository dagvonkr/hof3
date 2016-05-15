import subs from '../../modules/subscriptionsManager';
import Posts from '../../../model/posts';

let tpl = Template.postInRow;

tpl.onCreated(function() {
  var self = this;

  self.ready = new ReactiveVar();
  self.autorun(function () {

    var postId = FlowRouter.getQueryParam('postId');
    var handle = subs.subscribe('post', postId);
    self.ready.set(handle.ready());
  });
});

tpl.helpers({
  mainImageUrl() {
    return getMainImageUrlFor(this);
  },

  isReady() {
    return Template.instance().ready.get();
  }
});

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
