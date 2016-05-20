Meteor.publish('someImages', function (someIds) {
  if (!someIds || _(someIds).isEmpty()) {
    return [];
  } else {
    const answer = Images.find({
      _id: {
        $in: someIds
      }});
    // console.log(`someImages is publishing ${answer.count()} images `);
    return answer;
  }
});

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
          $in: post.images
        }}
        , { sort: { uploadedAt: -1 } });
      }
    }
});


Meteor.publish('mainImages', function () {
  var mainImagesIds = _(Posts.find().fetch()).map(function (each) {
    if(!_(each.images).isEmpty()) {
      return each.images[0]._id;
    } else {
      return null;
    }
  });

  mainImagesIds = _(mainImagesIds).without(null);

  const answer = Images.find({
    _id: { $in: mainImagesIds }
  });

  return answer;
});