import htmlToText from 'html-to-text';

SSR.compileTemplate('seoPostView', Assets.getText('postView.html'));

Template.seoPostView.helpers({
  getTitleFor (aPost) {
    return aPost.title.toUpperCase();
  },
  getUrlFor (aPost) {
    return `${Meteor.absoluteUrl()}posts/${aPost._id}`;
  },
  getImageUrlFor (aPost) {
    return Posts.getMainImageUrlFor(aPost);
  },
  getExcerptFor (aPost) {
    return extractTextFromHTML(aPost.content);
  }
});

function extractTextFromHTML (someHTML) {
  return _(htmlToText.fromString(someHTML)).without('\n').join('');
}