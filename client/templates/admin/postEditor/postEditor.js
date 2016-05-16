import subs from '../../../modules/subscriptionsManager';

let tpl = Template.postEditor;

tpl.onCreated(function () {
  initializeOn(this);
});

tpl.onDestroyed(function () {
  tinymce.remove();
});

tpl.onRendered(function () {
  let self = this;

  if(hasContentEditor()) {
    Meteor.setTimeout(function () {
      initializeTinymce();
    }, Meteor.settings.public.editorInitializeDelay);
  }

});

tpl.helpers({
  hasContentEditor() {
    return hasContentEditor();
  },
  youtubeLinkValue() {
    return Template.instance().model.youtubeLink || Template.instance().enteredYoutubeLink.get();
  },
  hasVideo() {
    return Template.instance().enteredYoutubeLink.get();
  },
  isEditing() {
    return !isNew(Template.instance().model);
  },
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
  'click #removeYoutubeLink': function (event, template) {
    template.model.youtubeLink = '';
    template.enteredYoutubeLink.set('');
    $(template.find('#youtube-link')).val('');
    const isSaveFromUser = false;
    basicSaveModelOn(template, isSaveFromUser);
  },
  'change #youtube-link': function (event, template) {
    // Saves the proper youtube link for an embed assuming it comes from a raw copy paste from the browser's URL.
    const youtubeLinkValue = $(template.find('#youtube-link')).val();
    template.enteredYoutubeLink.set(youtubeLinkValue);
    if(template.enteredYoutubeLink.get().match('/embed/')) {
      const isSaveFromUser = false;
      return basicSaveModelOn(template, isSaveFromUser);
    }

    if(_(template.enteredYoutubeLink.get()).isEmpty()) {
      return
    }

    if(template.enteredYoutubeLink.get().match('/watch')) {
      try {
        var parts = template.enteredYoutubeLink.get().split('/');
        var watchPart = _(parts).find( function (each) {
          return each.match('watch');
        });
        var videoId = _(watchPart.split('v=')).last();
        template.model.youtubeLink = 'https://www.youtube.com/embed/'+videoId;
        const isSaveFromUser = false;
        return basicSaveModelOn(template, isSaveFromUser);
      } catch (e) {
        return;
      }
    }

  },
  'click .savePost': function (event, template) {
    event.preventDefault();
    saveModelOn(template);
  },
  'imageUploaded #imagesUploader': function (event, template, data) {
    onImageAdded(template,data);
  }
});

function initializeOn (template) {
  template.ready = new ReactiveVar;
  template.enteredYoutubeLink = new ReactiveVar;
  template.data.postId = new ReactiveVar(FlowRouter.current().params.postId);
  template.autorun(function () {
    var handle = subs.subscribe('post',template.data.postId.get());
    template.ready.set(handle.ready());
    if(handle.ready()) {
      let found = Posts.findOne(template.data.postId.get());
      if(found){
        template.model = found;
        template.enteredYoutubeLink.set(template.model.youtubeLink);
      } else {
        setNewModelOn(template);
      }
    }
  });
}

function hasContentEditor () {
  // Answers true if this post editor should show the content rich editor (and subtitle and youtube).
  return FlowRouter.current().route.name == 'postEditor';
}

function initializeTinymce () {
  tinymce.init({
    selector: 'textarea',
    content_css: 'https://dl.dropboxusercontent.com/s/f46ixwp67t45vju/teststyle.css',
    skin_url: '/packages/teamon_tinymce/skins/lightgray',
    menu: {},
    plugins: "link",
    toolbar: "bold italic | link",
    height: 500,
    statusbar: false
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
  if(tinyMCE.activeEditor) {
    model.content = tinyMCE.activeEditor.getContent({ format: 'raw' });
  }
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

