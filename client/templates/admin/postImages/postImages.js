import subs from '../../../modules/subscriptionsManager';

let tpl = Template.postImages;

tpl.onCreated(function () {
  let self = this;
  initializeOn(self);
});

tpl.helpers({
  getUrlFor (anId) {
    if(!anId) {
      return null;
    } else {
      // return Meteor.absoluteUrl()+'images/'+anId+'.'+Meteor.settings.public.imageFormat;
      return '/images/'+anId+'.'+Meteor.settings.public.imageFormat;
    }
  },
  postImages() {
    return Images.find();
  }
});

function initializeOn (template) {
  template.ready = new ReactiveVar(false);

  template.autorun(function () {
    // console.log('postImages autorun');
    let postHandle = subs.subscribe('postImages', template.data.postId.get());
    template.ready.set(postHandle.ready());
    if(postHandle.ready()) {
      template.ready.set(true);
    }
  });
}