// server/seo/layout.js
SSR.compileTemplate('seoLayout', Assets.getText('seoLayout.html'));
// Blaze does not allow to render templates with DOCTYPE in it.
// This is a trick to made it possible
Template.seoLayout.helpers({
  getDocType: function() {
    return "<!DOCTYPE html>";
  }
});