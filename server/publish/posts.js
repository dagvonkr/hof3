Meteor.publish('post', function (postId) {
  // Publishes only the party corresponding to partyId if any. Null otherwise.
  const answer = Posts.find({_id: postId, isPublished: true});
  console.log(`post publishing ${answer.count()} post for postId ${postId}`);
  return answer;
});

Meteor.publish('allPosts', function (options, aSearchString) {
  // Publishes all the posts.
  var searchString = aSearchString || '';
  const query = { createdBy: this.userId };
  const answer = Posts.find(query, {sort: { createdOn: -1 }});
  console.log(`allPosts publishing ${answer.count()} posts for owner ${this.userId}`);
  return answer;
});

Meteor.publish('allPostsInfinite', function (limit, query) {
  console.log('limit JSON.stringify(query)', limit, JSON.stringify(query));
  // Don't use the query object directly in your cursor for security!
  var selector = {};
  check(limit, Number);
  check(query.name, String);
  // Assign safe values to a new object after they have been validated
  selector.name = query.name;

  const answer = Posts.find(selector, {
    limit: limit,
    // Using sort here is necessary to continue to use the Oplog Observe Driver!
    // https://github.com/meteor/meteor/wiki/Oplog-Observe-Driver
    sort: {
      createdOn: 1
    }
  });

  console.log(`allPostsInfinite publishing ${answer.count()} posts for owner ${this.userId}`);
  return answer;
});

Meteor.publish('publishedPosts', function (options, aSearchString) {
  // Publishes only the posts that are set as public and uses the sent options or searchString if any.
  var searchString = aSearchString || '';
  const someOptions = options || { sort: {createdOn: -1}};
  const query = {
    $or: [
      { isPublished: true }
      , { $and: [
          { name: {
                  $regex: /.*${searchString || ''}.*/
                  , $options: 'i'
                } }
        , { isPublished: true }
      ] }
    ]
  };

  // Counts.publish(this, 'numberOfParties', Posts.find(query), {
  //   noReady: true
  // });

  // console.log('About to publish parties with query:', query, options);

  const answer = Posts.find(query, someOptions);
  console.log(`publishedPosts publishing ${answer.count()} posts using query ${JSON.stringify(query)}`);
  return answer;
});
