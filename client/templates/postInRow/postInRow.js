let tpl = Template.postInRow;

tpl.onCreated(function() {
  let self = this;

  self.ready = new ReactiveVar();
  initializeOn(self);
});

tpl.onRendered(function () {
  if(this.data.model._id) {
    Posts.updatePostStyleOn(this, this.data.model._id);
  }
});

tpl.helpers({
  mainImageUrl() {
    return Posts.getMainImageUrlFor(this.model);
  },

  isReady() {
    return Template.instance().ready.get();
  }
});

tpl.events({
  'click .postTitle': function (event, template) {
    if(this.hasToEdit) {
      FlowRouter.go(`/admin/posts/edit/${this.model._id}`);
    } else {
      FlowRouter.go(`/posts/${this.model._id}`);
    }
  }
})

function initializeOn (aTemplate) {

  Posts.find().observe({
    changed: function (newDoc, oldDoc, atIndex) {
      const postId = aTemplate.data.model._id;
      if(postId === newDoc._id) {
        Posts.updatePostStyleOn(aTemplate, postId);
      }
    }
  });
}


