let tpl = Template.signIn;

tpl.onCreated( function () {
  let self = this;
  // self.buttonDisableClass = new ReactiveVar('disabled');
});

tpl.helpers({
});

tpl.events({
  'click .signUpButton': function (e, t) {
    e.preventDefault();
    // t.buttonDisableClass.set('');
  }
});