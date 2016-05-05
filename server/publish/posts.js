Meteor.publish('post', function (postId) {
  // Publishes only the party corresponding to partyId if any. Null otherwise.
  return Posts.find({_id: postId});
});

Meteor.publish('allPosts', function (options, aSearchString) {
  // Publishes all the posts.
  var searchString = aSearchString || '';
  const query = { owner: this.userId };
  return Posts.find({ owner: this.userId }, {sort: { createdAt: -1 }});
});

Meteor.publish('AllPostsInfinite', function (limit, query) {
  console.log('limit JSON.stringify(query)', limit, JSON.stringify(query));
  // Don't use the query object directly in your cursor for security!
  var selector = {};
  check(limit, Number);
  check(query.name, String);
  // Assign safe values to a new object after they have been validated
  selector.name = query.name;

  return Posts.find(selector, {
    limit: limit,
    // Using sort here is necessary to continue to use the Oplog Observe Driver!
    // https://github.com/meteor/meteor/wiki/Oplog-Observe-Driver
    sort: {
      createdOn: 1
    }
  });
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
