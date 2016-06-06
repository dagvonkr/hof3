// ----------------------------------------------------------------------------
// picker definition. Use this to figure out if a crawler is hitting you
// ----------------------------------------------------------------------------
var seoPicker = Picker.filter(function (req, res) {
  var isCrawler = [];
  var string = req.headers['user-agent'];
  isCrawler.push(/_escaped_fragment_/.test(req.url));
  if(string){
      isCrawler.push(string.indexOf('facebookexternalhit') >= 0);
      isCrawler.push(string.indexOf('Slack') >= 0);
      isCrawler.push(string.indexOf('Twitterbot') >= 0);
  }
  return isCrawler.indexOf(true) >= 0;
});

// Indexing user pages
seoPicker.route('/posts/:postId', function(params, req, res){
    var post = Posts.findOne({ _id: params.postId });
    var html = SSR.render('seoLayout',{
        template:'seoPostView',
        data: { post: post }
    });
    res.end(html);
});