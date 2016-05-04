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
  if (Meteor.isClient && Session.set('redirectAfterLogin')) {
    FlowRouter.go(Session.set('redirectAfterLogin'));
  }
});

adminRoutes.route('/register', {
  name: 'register'
  , action: () => {
    BlazeLayout.render('blogLayout', {content: 'register'});
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
    BlazeLayout.render('blogLayout', {content: 'adminPosts'});
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
    BlazeLayout.render('blogLayout', {content: 'post'});
  }
});