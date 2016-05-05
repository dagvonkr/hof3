Meteor.methods({
  saveNewPost: function (doc) {
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(doc, Object);

    const newPost = {
      createdOn: doc.createdOn,
      createdBy: this.userId,
      title: doc.title,
      subtitle: this.subtitle,
    }

    return Posts.insert(doc);
  }
})