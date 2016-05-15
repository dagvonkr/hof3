import subs from '../../modules/subscriptionsManager';
import Posts from '../../../model/posts';

let tpl = Template.postInRow;

tpl.onCreated(function() {
  let self = this;

  self.ready = new ReactiveVar();
  self.autorun(() => {
    const postId = self.data._id;
    const handle = subs.subscribe('post', postId);
    self.ready.set(handle.ready());
    if(self.ready.get()) {
      Meteor.setTimeout(function () {
        updatePostStyleOn(self);
      }, Meteor.settings.public.postInRowOnReadyDelay);
    }
  });
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

function updatePostStyleOn (aTemplate) {
  // Updates the style of the post on aTemplate.
  let title = aTemplate.find('[name="title"]');
  const customStyle = getPostStyle(aTemplate.data);
  $(title).css(customStyle);
}

function getPostStyle (aPost) {
    // Answers the custom style of this post.

    const customStyle = {
      top: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.top)?`${aPost.style.header.top}px`:'50px',
      left: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.left)?`${aPost.style.header.left}px`:'0px',
      width: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.width)?`${aPost.style.header.width}px`:'400px',
      'font-size': (!!aPost.style && !!aPost.style.header && !!aPost.style.header.fontSize)?`${aPost.style.header.fontSize}px`:'50px',
      color: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.color)?aPost.style.header.color:'#2d2c2c',
      'text-shadow': (!!aPost.style && !!aPost.style.header && !!aPost.style.header.textShadow)?aPost.style.header.textShadow:'none',
      'text-align': (!!aPost.style && !!aPost.style.header && !!aPost.style.header.textAlign)?aPost.style.header.textAlign:'center'
    };
    return customStyle;
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
