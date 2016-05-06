import 'cropperjs/dist/cropper.min.css';
import Cropper from 'cropperjs';

let tpl = Template.imagesUploader;

tpl.onCreated(function () {
  // this.imageToCrop = new ReactiveVar;
});

tpl.onRendered(function () {
  let self = this;
  $('.uploadPanel input').on('change', function (event) {
    startCropOn(event.originalEvent.target.files[0], self);
  });
});

tpl.helpers({
});

tpl.events({

});

function newCropOn (image, template, aspectRatio) {
  let answer = new Cropper(image, {
    aspectRatio: aspectRatio || 16/9,
    crop: function (e) {
      console.log('cropping',e);
    }
  });
  return answer;
}

function startCropOn (file, template) {
  let reader = new FileReader();

  reader.onload = function (e) {
    $('#imageToCrop').attr('src', e.target.result);
    let cropper = newCropOn($('#imageToCrop')[0], template);
  };
  reader.readAsDataURL(file);
}