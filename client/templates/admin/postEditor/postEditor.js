import subs from '../../../modules/subscriptionsManager';

let tpl = Template.postEditor;

tpl.onCreated(function () {
  initializeOn(this);
});

tpl.onRendered(function () {
  let self = this;
  Meteor.setTimeout(function () {
    $('#imagesUploader').on('imageUploaded', function (event, data) {
    onImageAdded(self,data);
  });}, 500);
});

tpl.helpers({
  isReady() {
    return Template.instance().ready.get();
  },
  isNew() {
    return isNew(Template.instance().model);
  },
  model() {
    return Template.instance().model;
  }
});

tpl.events({
  'click .savePost': function (event, template) {
    saveModelOn(template);
  },
});

function initializeOn (template) {
  template.ready = new ReactiveVar();
  const postId = FlowRouter.current().params.postId;

  template.autorun(function () {
    var handle = subs.subscribe('post',postId);
    template.ready.set(handle.ready());
    if(handle.ready()) {
      let found = Posts.findOne(FlowRouter.current().params.postId);
      if(found){
        template.model = found;
      } else {
        setNewModelOn(template);
      }
    }
  });
}

function saveModelOn (template) {
  let selector;
  if(isNew(template.model)) {
      selector = 'saveNewPost';
    } else {
      selector = 'savePost';
    }

  updateModelOn(template);

  Meteor.call(selector,template.model, function (error, result) {
    if(error) {
      console.error('report issue and negative feedback');
    } else {
      if(selector === 'saveNewPost') {
        // reset and prepare itself with a new model only if we just saved a new post
        resetOn(template);
        setNewModelOn(template);
      }
      // console.info('reset inputs and positive feedback');
    }
  });
}

function onImageAdded (template, data) {
  // Adds the added image to the post.
  // Saves it to be sure it stay.
  saveModelOn(template);

  if(!!data && data.imageId) {
    if(!template.model.images) {
      template.model.images = [];
    }
    template.model.images.push(data.imageId);
    saveModelOn(template);
  }
}

function setNewModelOn (template) {
  template.model = newPost();
}

function updateModelOn (template) {
  let model = template.model;
  model.title = $(template.find('input[name="title"]')).val();
  model.subtitle = $(template.find('input[name="subtitle"]')).val();
  model.content = $(template.find('textarea[name="content"]')).val();
}

function isNew (aModel) {
    // Answers true if the model is new or false if editing a preexisting one
    // Note: we use createdBy because the author is set on the server side at insert time.
    return !aModel.createdBy;
}

function newPost () {
  // Answer a new model for a post.
  let newPost = {
    createdOn: new Date,
    title: '',
    subtitle: '',
    content: '',
    images: []
  };
  return newPost;
}

function resetOn (template) {
  resetInputsOn(template);
}

function resetInputsOn (template) {
  $(template.find('[name="title"]')).val('');
  $(template.find('[name="subtitle"]')).val('');
  $(template.find('[name="content"]')).val('');
}

