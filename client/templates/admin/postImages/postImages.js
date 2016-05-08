import subs from '../../../modules/subscriptionsManager';

let tpl = Template.postImages;

tpl.onCreated(function () {
  let self = this;
  initializeOn(self);
});

tpl.helpers({
  getUrlFor (anId) {
    return Meteor.absoluteUrl()+'images/'+anId;
  },
  postImages() {
    Template.instance().imagesId.get();
  }
});

function initializeOn (template) {
  template.ready = new ReactiveVar();
  template.imagesId = new ReactiveVar();

  template.autorun(function () {
    let postHandle = subs.subscribe('post', template.data.postId.get());
    template.ready.set(postHandle.ready());
    if(postHandle.ready()) {
      let found = Posts.findOne(template.data.postId.get());
      console.log('autorun Posts.findOne(template.data.postId.get())', found);
      if(found){
        template.model = found;
      }
    }

    let imagesHandle = subs.subscribe('images', template.data.postId.get());

  });
}

function updateImagesId (template) {
  const model = Posts.findOne(template.postId.get());
  if(!model) {
    return [];
  }

  const answer = _(model.images).map(function (each) {
    return { imageId: each };
  });

  template.imagesId.set(answer);
}