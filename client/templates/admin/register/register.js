let tpl = Template.register;

function createUser (template, onError) {
  const credentials = {
      email: $(template.find('[name="email"]')).val()
      , password: $(template.find('[name="password"]')).val()
    };
  Accounts.createUser(credentials, onError);
}

function isValid (template) {
  return !_($(template.find('[name="email"]')).val()).isEmpty() && !_($(template.find('[name="password"]')).val()).isEmpty();
}

function updateFeedback (template) {
  if (isValid(template)) {
    template.signUpFeedback.set(null);
  } else {
    template.signUpFeedback.set('Sorry, we need you for fill your email and password in order to create a user');
  }
}

tpl.onCreated( function () {
  let self = this;
  self.signUpFeedback = new ReactiveVar(null);
});

tpl.onRendered( function () {
});

tpl.helpers({
  signUpFeedback: function () {
    return Template.instance().signUpFeedback.get();
  }
});

tpl.events({
  'click .signUpButton': function (event, template) {
    event.preventDefault();
    updateFeedback(template);
    if (isValid(template)) {
      createUser(template, function (error) {
        template.signUpFeedback.set('Sorry, there was a problem creating the user, please contact your system administrator.');
      });
      FlowRouter.go('admin');
    }
  }
});