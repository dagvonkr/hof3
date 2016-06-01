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
      renderMetaOn(Posts.findOne(postId));
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

function extractTextFromHTML (aHTMLString) {
  var span = document.createElement('span');
  span.innerHTML = aHTMLString;
  return span.textContent || span.innerText;
};

function getImageUrlOf (aPost) {
  return Posts.getMainImageUrlFor(aPost);
}

function getExcerptOf (aPost) {
  return extractTextFromHTML(aPost.content);
}

function renderMetaOn (aPost) {
  $('head').append(`<meta property="og:title" content="${aPost.title}" />`);
  $('head').append(`<meta property="og:description" content="${getExcerptOf(aPost)}" />`);
  $('head').append(`<meta property="og:image" content="${getImageUrlOf(aPost)}" />`);
}
