Meteor.publish('images', function (postId) {
  if (!postId) {
    return Images.find({});
  } else {
    const post = Posts.findOne(postId);
    if (!post) {
      return [];
    } else {
      return Images.find({
        _id: {
          $in: _(post.images).map(function (each) { return each._id })
        }}
        , { sort: { uploadedAt: -1 } });
      }
    }
});


Meteor.publish('mainImages', function () {
  var mainImagesIds = _(Posts.find().fetch()).map(function (each) {
    if(!_(each.images).isEmpty()) {
      return each.images[0]._id
    } else {
      return null
    }
  });

  mainImagesIds = _(mainImagesIds).without(null);

  const answer = Images.find({
    _id: { $in: mainImagesIds }
  });

  return answer;
});