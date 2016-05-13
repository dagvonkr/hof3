let tpl = Template.signIn;

tpl.onCreated( function () {
  let self = this;
  self.signInFeedback = new ReactiveVar(null);
});

function isValid (template) {
  return !_($(template.find('[name="email"]')).val()).isEmpty() && !_($(template.find('[name="password"]')).val()).isEmpty();
}

function updateFeedback (template) {
  if (isValid(template)) {
    template.signInFeedback.set(null);
  } else {
    template.signInFeedback.set('Sorry, we need you for fill your email and password in order to try to sign in your user.');
  }
}

tpl.helpers({
});

tpl.events({
  'click .signInButton': function (event, template) {
    event.preventDefault();
    updateFeedback(template);
    const credentials = {
        email: $(template.find('[name="email"]')).val()
        , password: $(template.find('[name="password"]')).val()
      };

    Meteor.loginWithPassword(credentials.email, credentials.password, function (error) {
      if(error) {
        return template.signInFeedback.set('Sorry, we cannot validate those credentials');
      }

      const desiredDestination = Session.get('redirectAfterLogin');

      if(!desiredDestination || desiredDestination == '/admin/sign-in') {
        FlowRouter.go('adminPosts');
      }
    });
  }
});
