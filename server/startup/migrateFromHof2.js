Meteor.startup(function () {
  // Migrates (if necessary) the collections from the hof2 database collections to the hof3 ones.

  migrateParties();
  migrateImages();

});

function migrateParties () {
  let parties = new Mongo.Collection('parties');
  console.log(`This is the parties .find().count() ${JSON.stringify(parties.find().count())}`);

  if(parties.find().count() === 0) return;

  parties.find().fetch().forEach( function (party) {
    const imageIds = _(party.images).map( function (e) { return e._id});
    let importedPost = {
      _id: party._id,
      createdOn: party.createdAt,
      createdBy: party.owner,
      title: party.name,
      subtitle: party.description,
      youtubeLink: party.youtubeLink,
      content: party.editorcontent,
      isPublished: party.public,
      style: party.style,
      migratedOn: new Date,
      images: imageIds
    };

    const exists = Posts.findOne(importedPost._id);
    if(!exists) {
      console.log(`inserting Post ${importedPost._id}`);
      Posts.insert(importedPost);
    }

    parties.remove(importedPost._id);
  });

  // parties.drop();
}

function migrateImages () {
  let images = new Mongo.Collection('images');
  console.log(`This is the images .find().count() ${JSON.stringify(images.find().count())}`);

  if(images.find().count() === 0) return;

  images.find().fetch().forEach( function (image) {

    let importedImage = {
      _id: image._id,
      migratedOn: new Date,
      filename: image.filename,
      uploadedAt: image.uploadedAt,
      mimeType: image.mimeType,
      uploadedBy: image.uploadedBy,
      size: image.size
    };

    const exists = Images.findOne(importedImage._id);
    if(!exists) {
      console.log(`inserting Image ${importedImage._id}`);
      Images.insert(importedImage);
    }

    images.remove(importedImage._id);
  });

  // images.drop();
}