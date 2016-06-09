Meteor.startup(function () {
  // Guarantees state consistency on all Posts.
  const queryOfInconsistence = {
    $and: [
      { isPublished: true },
      { notAdded: true }
    ]
  };

  const inconsistentPosts = Posts.find(queryOfInconsistence).fetch();
  console.log(`Forcing notAdded consistency on ${inconsistentPosts.length} posts`);
  forceNotAddedStateConsistencyFor(inconsistentPosts);

});

function forceNotAddedStateConsistencyFor (somePosts) {
  somePosts.forEach(function (aPost) {
    Posts.update({ _id: aPost._id }, { $unset: { notAdded: '' } });
  });
}