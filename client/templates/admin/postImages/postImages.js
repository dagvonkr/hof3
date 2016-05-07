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
    if(!Template.instance().model) {
      return [];
    }

    const answer = _(Template.instance().model.images).map(function (each) {
      return { imageId: each };
    });

    return answer;
  }
});

function initializeOn (template) {
  template.ready = new ReactiveVar();

  template.autorun(function () {
    var handle = subs.subscribe('post', template.data.postId.get());
    template.ready.set(handle.ready());
    if(handle.ready()) {
      let found = Posts.findOne(template.data.postId.get());

      if(found){
        template.model = found;
      }
    }
  });
}