Meteor.startup(function () {

  // ----------------------------------------------------------------------------
  // picker definition. Use this to figure out if a crawler is hitting you
  // ----------------------------------------------------------------------------
  var seoPicker = Picker.filter(function (req, res) {
    // var isCrawler = [];
    // var string = req.headers['user-agent'];
    // isCrawler.push(/_escaped_fragment_/.test(req.url));
    // if(string){
    //     isCrawler.push(string.indexOf('facebookexternalhit') >= 0);
    //     isCrawler.push(string.indexOf('Slack') >= 0);
    //     isCrawler.push(string.indexOf('Twitterbot') >= 0);
    // }
    // return isCrawler.indexOf(true) >= 0;
    return true;
  });

  // Indexing user pages
  seoPicker.route('/posts/:postId', function (params, req, res) {
    console.log('seoPicker /posts/:postId', params);
    var post = Posts.findOne({ _id: params.postId });
    console.log('seoPicker post', post);
    if(post) {
      var html = SSR.render('seoLayout', {
          template:'seoPostView',
          data: { post: post }
      });
    } else {
      var html = SSR.render('seoLayout', {
          template:'not found',
          data: null
      });
    }
    res.end(html);
  });

});
