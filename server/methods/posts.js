Meteor.methods({
  savePost: function (doc) {
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
      images: doc.images
    }

    return Posts.update({_id: doc._id },{ $set:toSave });
  },
  saveNewPost: function (doc) {
    // Make sure the user is logged in before inserting
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(doc, Object);

    const newPost = {
      createdOn: doc.createdOn,
      createdBy: this.userId,
      title: doc.title,
      subtitle: doc.subtitle,
      images: doc.images
    }

    return Posts.insert(newPost);
  }
})