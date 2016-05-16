let adminRoutes = FlowRouter.group({
  prefix: '/admin'
  , name: 'admin'
  , triggersEnter: [ (context, redirect) => {
      // if(Meteor.isClient && (!Meteor.loggingIn() || !Meteor.userId())) {
      if(!Meteor.userId()) {
        const route = FlowRouter.current();
        if(!(route.route.name === 'login')) {
          Session.set('redirectAfterLogin', route.path);
        }

        FlowRouter.go('signIn');
      }
  }]
});

Accounts.onLogin(function () {
  if (Meteor.isClient && Session.get('redirectAfterLogin')) {
    FlowRouter.go(Session.get('redirectAfterLogin'));
  }
});

adminRoutes.route('/', {
  name: 'adminHome'
  , action: () => {
    FlowRouter.go(FlowRouter.path('adminPosts'));
  }
});

adminRoutes.route('/sign-in', {
  name: 'signIn'
  , action: () => {
    BlazeLayout.render('adminLayout', {content: 'signIn'});
  }
});

adminRoutes.route('/posts', {
  name: 'adminPosts'
  , action: () => {
    BlazeLayout.render('adminLayout', {content: 'adminPosts'});
  }
});

adminRoutes.route('/posts/edit/:postId', {
  name: 'postEditor'
  , action: (params, queryParams) => {
    BlazeLayout.render('adminLayout', {content: 'postEditor'});
  }
});

adminRoutes.route('/posts/:postId', {
  name: 'post'
  , action: (params, queryParams) => {
    BlazeLayout.render('adminLayout', {content: 'post'});
  }
});

FlowRouter.notFound = {
 action: () => {
   BlazeLayout.render('notFound');
 }
};

let publicRoutes = FlowRouter.group({
  name: 'public'
  , triggersEnter: [ (context, redirect) => {
    // console.log('public triggersEnter', this, context, redirect);
  }]
});

publicRoutes.route('/sign-up', {
  name: 'signUp'
  , action: () => {
    BlazeLayout.render('adminLayout', {content: 'signUp'});
  }
});

publicRoutes.route('/register', {
  name: 'register'
  , action: () => {
    FlowRouter.go('signUp');
  }
});

publicRoutes.route('/', {
  name: 'home'
  , action: () => {
    FlowRouter.go(FlowRouter.path('posts'));
  }
});

publicRoutes.route('/posts', {
  name: 'posts'
  , action: (params, queryParams) => {
    BlazeLayout.render('blogLayout', {content: 'posts'});
  }
});

publicRoutes.route('/posts/:postId', {
  action: (params, queryParams) => {
  BlazeLayout.render('blogLayout', {
    content: 'postView'
  });
    // const post = Posts.findOne(params.postId);
    // if(post) {
    //   BlazeLayout.render('blogLayout', {
    //     content: 'postView',
    //     data: post
    //   });
    // } else {
    //   FlowRouter.go('notFound');
    // }
  }
});

publicRoutes.route('/kontakt', {
 action: () => {
   BlazeLayout.render('kontakt');
 }
});

publicRoutes.route('/register', {
  name: 'register'
  , action: () => {
    FlowRouter.go('signUp');
  }
});

publicRoutes.route('/login', {
  action: () => {
    FlowRouter.go('signIn');
  }
});

publicRoutes.route('/sign-in', {
  action: () => {
    FlowRouter.go('signIn');
  }
});
