Posts = new Mongo.Collection('Posts');

Posts.allow({
  insert: function (userId, doc) {
    return userId && doc.owner === userId;
  },
  update: function (userId, doc, fields, modifier) {
    return userId && doc.owner === userId;
  },
  remove: function (userId, doc) {
    return userId && doc.owner === userId;
  }
});

if(Meteor.isClient) { // client side common methods

  Posts.updatePostStyleOn = function (aTemplate) {
    // Updates the style of the post on aTemplate.
    let title = aTemplate.find('[name="title"]');
    const freshPost = Posts.findOne(aTemplate.data._id);
    const customStyle = getPostStyle(freshPost);
    $(title).css(customStyle);
  };

  function getPostStyle (aPost) {
    // Answers the custom style of this post.
    const customStyle = {
      top: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.top)?`${aPost.style.header.top}px`:'50px',
      left: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.left)?`${aPost.style.header.left}px`:'0px',
      width: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.width)?`${aPost.style.header.width}px`:'400px',
      'font-size': (!!aPost.style && !!aPost.style.header && !!aPost.style.header.fontSize)?`${aPost.style.header.fontSize}px`:'50px',
      color: (!!aPost.style && !!aPost.style.header && !!aPost.style.header.color)?aPost.style.header.color:'#2d2c2c',
      'text-shadow': (!!aPost.style && !!aPost.style.header && !!aPost.style.header.textShadow)?aPost.style.header.textShadow:'none',
      'text-align': (!!aPost.style && !!aPost.style.header && !!aPost.style.header.textAlign)?aPost.style.header.textAlign:'center'
    };
    return customStyle;
  };
}

export default Posts;