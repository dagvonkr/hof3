Meteor.publish('post', function (postId) {
  // Publishes only the party corresponding to partyId if any. Null otherwise.
  return Posts.find({_id: partyId});
});

Meteor.publish('allPosts', function (options, aSearchString) {
  // Publishes all the posts.
  var searchString = aSearchString || '';
  const query = { owner: this.userId };
  return Posts.find({ owner: this.userId }, {sort: { createdAt: -1 }});
});

Meteor.publish('posts', function (options, aSearchString) {
  // Publishes only the posts that are set as public and uses the sent options or searchString if any.
  var searchString = aSearchString || '';
  const someOptions = options || { sort: {createdAt: -1}};
  const query = {
    $or: [
      { public: true }
      , { $and: [
          { name: {
                  $regex: /.*${searchString || ''}.*/
                  , $options: 'i'
                } }
        , { public: true }
      ] }
    ]
  };

  // Counts.publish(this, 'numberOfParties', Posts.find(query), {
  //   noReady: true
  // });

  // console.log('About to publish parties with query:', query, options);

  const posts = Posts.find(query, someOptions);
  return posts;
});
