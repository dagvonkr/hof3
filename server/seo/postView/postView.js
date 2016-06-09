SSR.compileTemplate('seoPostView', Assets.getText('postView.html'));

Template.seoPostView.helpers({
  getUrlFor (aPost) {
    return `${Meteor.absoluteUrl()}posts/${aPost._id}`;
  },
  getImageUrlFor (aPost) {
    return Posts.getMainImageUrlFor(aPost);
  },
  getExcerptFor (aPost) {
    // return extractTextFromHTML(aPost.content);
    return 'Urna vut dictumst enim penatibus lectus vel tortor et dictumst turpis augue adipiscing. Mattis a ridiculus risus elementum elit egestas egestas amet, tempor sagittis nisi mauris? Augue, nunc porttitor, nunc scelerisque nec, elementum dictumst nec. Ut, sit a lectus montes dolor? Ac duis vel tincidunt elementum nec, placerat amet sagittis amet elementum et, egestas tortor odio, ultrices egestas enim? Aenean nisi! Urna eros ut pid risus tempor, ac scelerisque magna etiam quis enim nec ut elementum sit scelerisque habitasse urna? Cursus porta! Hac, aliquet nunc ultrices? Non nec, tempor? Tincidunt amet phasellus et magna urna, cum ut, nisi phasellus a tristique dis ac! Cursus, placerat natoque cursus, adipiscing in dis, porttitor tortor facilisis. Dolor non tempor. Tristique platea purus.';
  }
});
