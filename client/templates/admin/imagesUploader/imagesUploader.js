import 'cropperjs/dist/cropper.min.css';
import Cropper from 'cropperjs';

let tpl = Template.imagesUploader;

tpl.onCreated(function () {
  window.o=this;
  this.aspectRatio = new ReactiveVar;
  this.shape = new ReactiveVar;
});

tpl.onRendered(function () {
  let self = this;
  $('.uploadPanel input').on('change', function (event) {
    resetOn(self);
    startCropOn(event.originalEvent.target.files[0], self);
  });
});

tpl.helpers({
  isCropping() {
    return !!Template.instance().aspectRatio.get();
  }
});

tpl.events({
  'click #discardImage': function (event, template) {
    event.preventDefault();
    resetInputsOn(template);
  },
  'click #addImage': function (event, template) {
    resetInputsOn(template);
  },
  'click #portrait': function (event, template) {
    template.shape.set('portrait');
    template.aspectRatio.set(1.75);
    $('.uploadPanel input').click();
  },
  'click #landscape': function (event, template) {
    template.shape.set('landscape');
    template.aspectRatio.set(0.85);
    $('.uploadPanel input').click();
  },
  'click #square': function (event, template) {
    template.shape.set('square');
    template.aspectRatio.set(1);
    $('.uploadPanel input').click();
  }
});

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
  template.shape.set(null);
}

function newCropOn (image, template, aspectRatio) {
  let answer = new Cropper(image, {
    modal: true,
    guides: true,
    dragCrop: true,
    zoomable: false,
    mouseWheelZoom: false,
    aspectRatio: template.aspectRatio.get() || 16/9,
    preview: '.preview',
    crop: function (data) {
      console.log('cropping', data);
    }
  });

  $('.preview').addClass(`${template.shape.get()}Preview`);
  return answer;
}

function startCropOn (file, template) {
  let reader = new FileReader();

  reader.onload = function (e) {
    $('#imageToCrop').attr('src', e.target.result);
    template.cropper = newCropOn($('#imageToCrop')[0], template);
  };
  reader.readAsDataURL(file);
}
