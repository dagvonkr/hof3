let tpl = Template.postInRow;

tpl.onCreated(function() {
  let self = this;

  self.ready = new ReactiveVar();
  initializeOn(self);
});

tpl.onRendered(function () {

  if(this.data._id) {
    Posts.updatePostStyleOn(this, this.data._id);
  }
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

  Posts.find().observe({
    changed: function (newDoc, oldDoc, atIndex) {
      const postId = aTemplate.data._id;
      if(postId === newDoc._id) {
        Posts.updatePostStyleOn(aTemplate, postId);
      }
    }
  });
}


