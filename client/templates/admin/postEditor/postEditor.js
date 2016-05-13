import subs from '../../../modules/subscriptionsManager';

let tpl = Template.postEditor;

tpl.onCreated(function () {
  initializeOn(this);
});

tpl.onRendered(function () {
  let self = this;
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
    event.preventDefault();
    saveModelOn(template);
  },
  'imageUploaded #imagesUploader': function (event, template, data) {
    onImageAdded(template,data);
  }
});

function initializeOn (template) {
  template.ready = new ReactiveVar();
  template.data.postId = new ReactiveVar(FlowRouter.current().params.postId);

  template.autorun(function () {
    var handle = subs.subscribe('post',template.data.postId.get());
    template.ready.set(handle.ready());
    if(handle.ready()) {
      let found = Posts.findOne(template.data.postId.get());
      if(found){
        template.model = found;
      } else {
        setNewModelOn(template);
      }
    }
  });
}

function refreshModelOn (template) {
  let found = Posts.findOne(template.data.postId.get());
  if(found){
    template.model = found;
  }
}

function basicSaveModelOn (template, isSaveFromUser) {
  let selector;
  if(isNew(template.model)) {
      selector = 'saveNewPost';
    } else {
      selector = 'savePost';
    }

  updateModelOn(template);

  Meteor.call(selector, template.model, function (error, result) {
    if(error) {
      console.error('report issue and negative feedback');
    } else {
      if(selector === 'saveNewPost') {
        template.data.postId.set(result);
      }

      if(isSaveFromUser && template.data.shouldRenewModelOnUserSave) {
        // reset and prepare itself with a new model only if we just saved a new post
        resetOn(template);
        setNewModelOn(template);
        template.data.postId.set(null);
      }

      refreshModelOn(template);

    }
  });
}

function saveModelOn (template) {
  const isSaveFromUser = true;
  basicSaveModelOn(template, isSaveFromUser);
}

function onImageAdded (template, data) {
  // Adds the added image to the post.
  // Saves it to be sure it stay.

  if(!!data && data.imageId) {
    if(!template.model.images) {
      template.model.images = [];
    }
    template.model.images.push(data.imageId);
  }

  const isSaveFromUser = false;
  basicSaveModelOn(template, isSaveFromUser);
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
  // reset uploader?
}

function resetInputsOn (template) {
  $(template.find('[name="title"]')).val('');
  $(template.find('[name="subtitle"]')).val('');
  $(template.find('[name="content"]')).val('');
}

