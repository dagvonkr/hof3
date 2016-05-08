import 'cropperjs/dist/cropper.min.css';
import Cropper from 'cropperjs';

let tpl = Template.imagesUploader;

tpl.onCreated(function () {
  this.aspectRatio = new ReactiveVar;
  this.metaData = new ReactiveVar;
  this.shape = new ReactiveVar;
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
    addImageFrom(template);
    resetOn(template);
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

function uploadCroppedImageFor (imageDoc, template, onUploaded) {
  // Uploads the cropped image.

  template.cropper.getCroppedCanvas().toBlob(function (blob) {
    let uploader = $('input[type=file].jqUploadclass');
    const onDone = function (e, answer) {
      onUploaded.call(this, answer);
      uploader.unbind('fileuploaddone', onDone);
    };

    uploader.bind('fileuploaddone', onDone);

    uploader.fileupload({formData: imageDoc});
    uploader.fileupload('send', {files: [blob]});
  });
};

function getBinaryBlobFromBase64 (base64String) {
  // Answers a new block fibinary data corresponding to based64String

  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (base64String.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64String.split(',')[1]);
  else
    byteString = unescape(base64String.split(',')[1]);

  // separate out the mime component
  var mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

function addImageFrom (template) {
  // Uploads and adds the cropped image to the model.
  const onUploaded = function (data) {
    let event = jQuery.Event( 'imageUploaded' );
    $('#imagesUploader').trigger(event, {imageId: imageDoc._id});
  };
  const imageDoc = template.metaData.get();
  Images.insert(imageDoc);
  uploadCroppedImageFor(imageDoc, template, onUploaded);
}

function resetOn (template) {
  // Resets the inputs and other controller's state
  resetInputsOn(template);
  try {
    template.cropper.destroy();
    $(template.find('#imageToCrop')).attr('src', null);
  } catch (e) {
    // console.warn('No cropper to destroy', e);
  };
}

function resetInputsOn (template) {
  // Resets all the inputs.
  $(template.find('uploadPanel input')).val(null);
  template.aspectRatio.set(null);
  template.metaData.set(null);
  template.shape.set(null);
}

function newCropOn (image, aspectRatio, template) {
  // Answers a new instance of the cropper widget.
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
  // Answers the file's metadata.
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
  // Starts a crop process on (the selected) file.
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
