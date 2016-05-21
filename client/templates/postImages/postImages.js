let tpl = Template.postImages;

tpl.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar(false);
  self.postImages = new ReactiveVar([]);
});

tpl.onRendered(function () {
  let self = this;
  initializeOn(self);
});

tpl.helpers({
  isReady() {
    return Template.instance().ready.get();
  },
  getUrlFor (anId) {
    if(!anId) {
      return null;
    } else {
      // return Meteor.absoluteUrl()+'images/'+anId+'.'+Meteor.settings.public.imageFormat;
      return '/images/'+anId+'.'+Meteor.settings.public.imageFormat;
    }
  },
  postImages() {
    return Template.instance().postImages.get();
  }
});

function initializeOn (template) {
  template.autorun(function () {
    if(template.data.postId) {
      const post = Posts.findOne(template.data.postId.get());
      if(post) {
        const imageIds = post.images;
        let postHandle = template.subscribe('someImages', imageIds);
        template.ready.set(postHandle.ready());
        if(postHandle.ready()) {
          // console.log(`postImages autorun is READY ${Images.find().count()} images found`);
          const images = _(post.images).map(function (imageId) {
            return Images.findOne(imageId);
          });
          template.postImages.set(images);
        }
      } else {
        template.ready.set(true);
        if(!template.data.postId.get()){
          return template.postImages.set([]);
        }
      }
    }
  });
}