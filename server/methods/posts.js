Meteor.methods({
  savePos (doc) {
    // Make sure the user is logged in before saving
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(doc, Object);
    check(doc._id, String);

    const toSave = {
      title: doc.title,
      subtitle: doc.subtitle,
      content: doc.content,
      youtubeLink: doc.youtubeLink,
      updatedOn: new Date,
      images: doc.images
    }
    // console.log(`toSave: ${JSON.stringify(toSave)}`);
    return Posts.update({_id: doc._id },{ $set: toSave });
  },
  saveNewPost (doc) {
    // Make sure the user is logged in before inserting
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(doc, Object);

    const newPost = {
      createdOn: new Date,
      createdBy: this.userId,
      title: doc.title,
      subtitle: doc.subtitle,
      youtubeLink: doc.youtubeLink,
      images: doc.images
    }
    // console.log(`newPost: ${JSON.stringify(newPost)}`);
    return Posts.insert(newPost);
  },
  updateHeaderColor (postId, color) {
    // Make sure the user is logged in before persisting
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(postId, String);
    check(color, String);

    const toSave = {
      'style.header.color': color
    }
    // console.log(`toSave: ${JSON.stringify(toSave)}`);
    return Posts.update({_id: postId },{ $set: toSave });
  }
})