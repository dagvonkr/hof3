import 'cropperjs/dist/cropper.min.css';
import Cropper from 'cropperjs';

let tpl = Template.imagesUploader;

tpl.onCreated(function () {
  window.o=this;
  this.aspectRatio = new ReactiveVar;
  this.shape = new ReactiveVar;
  this.metaData = new ReactiveVar;
});

tpl.onRendered(function () {
  let self = this;
  function onDropzoneOrUploadClicked (event) {
    startCropOn(event.originalEvent.target.files[0], self);
  }

  $('.uploadPanel input').on('change', onDropzoneOrUploadClicked);
});

tpl.helpers({
  isCropping() {
    return !!Template.instance().aspectRatio.get();
  }
});

tpl.events({
  'click #discardImage': function (event, template) {
    event.preventDefault();
    resetOn(template);
  },
  'click #addImage': function (event, template) {
    event.preventDefault();
    resetOn(template);
    addImageFrom(template);
  },
  'click #portrait': function (event, template) {
    resetOn(template);
    template.shape.set('portrait');
    template.aspectRatio.set(1.75);
    $('.uploadPanel input').click();
  },
  'click #landscape': function (event, template) {
    resetOn(template);
    template.shape.set('landscape');
    template.aspectRatio.set(0.85);
    $('.uploadPanel input').click();
  },
  'click #square': function (event, template) {
    resetOn(template);
    template.shape.set('square');
    template.aspectRatio.set(1);
    $('.uploadPanel input').click();
  }
});

function addImageFrom (template) {
  const imageData = $('#imageToCrop').attr('src');

}

function resetOn (template) {
  resetInputsOn(template);
  try {
    template.cropper.destroy();
    $(template.find('#imageToCrop')).attr('src', null);
  } catch (e) {
    // console.warn('No cropper to destroy', e);
  };
}

function resetInputsOn (template) {
  $(template.find('uploadPanel input')).val(null);
  template.aspectRatio.set(null);
  template.metaData.set(null);
  template.shape.set(null);
}

function newCropOn (image, aspectRatio, template) {
  let answer = new Cropper(image, {
    modal: true,
    guides: true,
    dragCrop: true,
    zoomable: false,
    mouseWheelZoom: false,
    aspectRatio: aspectRatio,
    preview: '.preview',
    crop: function (event) {
      const metaData = template.metaData.get();
      metaData.cropDetails = event.detail;
      template.metaData.set(metaData);
    }
  });

  $('.preview').addClass(`${template.shape.get()}Preview`);
  return answer;
}

function getMetadataOn (file) {
  return {
    _id: Random.id()
    , filename: file.name
    , originalSize: file.size
    , mimeType: file.type
    , uploadedAt: new Date
    , uploadedBy: Meteor.userId()
  };
};

function startCropOn (file, template) {
  let reader = new FileReader();
  let metaData = getMetadataOn(file);
  metaData.aspectRatio = template.aspectRatio.get();
  template.metaData.set(metaData);
  reader.onload = function (e) {
    $('#imageToCrop').attr('src', e.target.result);
    template.cropper = newCropOn($('#imageToCrop')[0], metaData.aspectRatio, template);
  };
  reader.readAsDataURL(file);
}
