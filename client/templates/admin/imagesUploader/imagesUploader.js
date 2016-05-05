let tpl = Template.imagesUploader;

tpl.onRendered(function () {
  let self = this;
  // self.find('.uploaded-image-wrapper > img').cropper();
  $('.uploadPanel input').on('change', function (event) {
    console.log(`file selected! ${event.originalEvent.target.files}`);
  });
});


tpl.helpers({
  imageUrl() {
    return null;
  },
  portraitCallbacks() {
    return {
      formData() {
        return {
          boo: 'lol',
          aah: 123
        };
      },
      finished(index, fileInfo, context) {
        console.log(`index, fileInfo, context ${index}, ${fileInfo}, ${context}`);
      }
    }
  },
  specificFormData() {
    return {
      id: 'this._id',
      other: 'this.other',
      hard: 'Lolcats'
    }
  }
});

tpl.events({
  'dropped #portrait': function(e, t) {
    e.preventDefault();
    console.log('portrait', e.originalEvent.dataTransfer.files[0]);
  },
  'dropped #landscape': function(e, t) {
    e.preventDefault();
    console.log('landscape', e.originalEvent.dataTransfer.files[0]);
  },
  // 'dropped #square': function(e, t) {
  //   e.preventDefault();
  //   console.log('square', e.originalEvent.dataTransfer.files[0]);
  // }
});