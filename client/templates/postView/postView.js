import subs from '../../modules/subscriptionsManager';

let tpl = Template.postView;

tpl.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar;
  self.data.postId = new ReactiveVar;
  self.getUrlFor = getUrlFor;
  initializeOn(self);
});

tpl.onRendered(function () {
  let self = this;
});

tpl.onDestroyed(function () {
  removeMeta();
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
      const post = Posts.findOne(postId);
      if(!aTemplate.data.hasMeta) {
        aTemplate.data.hasMeta = true;
        renderMetaOn(post, aTemplate);
      }
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

function getUrlFor (aPost) {
  return `${Meteor.absoluteUrl()}posts/${aPost._id}`;
}

function removeMeta () {
  $('html').attr('xmlns','');
  $('html').attr('xmlns:og','');

  $('[property="og:url"]').remove();
  $('[property="og:title"]').remove();
  $('[property="og:site_name"]').remove();
  $('[property="og:description"]').remove();
  $('[property="og:image"]').remove();
}

function renderMetaOn (aPost, aTemplate) {
  $('html').attr('xmlns','http://www.w3.org/1999/xhtml');
  $('html').attr('xmlns:og','http://ogp.me/ns#');

  $('head').append(`<meta property="og:title" content="${aPost.title}" />`);
  $('head').append(`<meta property="og:url" content="${aTemplate.getUrlFor(aPost)}" />`);
  $('head').append(`<meta property="og:site_name" content="House Of Fam" />`);
  $('head').append(`<meta property="og:description" content="${getExcerptOf(aPost)}" />`);
  $('head').append(`<meta property="og:image" content="${getImageUrlOf(aPost)}" />`);
}
