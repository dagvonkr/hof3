let tpl = Template.postEditor;

function resetInputsOn (template) {
  $(template.find('[name="title"]')).val('');
  $(template.find('[name="subtitle"]')).val('');
  $(template.find('[name="content"]')).val('');
}

tpl.events({
  'click .saveNewPost': function (event, template) {
    const newPost = {
      createdOn: new Date,
      title: $(template.find('[name="title"]')).val(),
      subtitle: $(template.find('[name="subtitle"]')).val(),
      content: $(template.find('[name="content"]')).val()
    }
    Meteor.call('saveNewPost',newPost, function (error, result) {
      if(error) {
        console.error('report issue and negative feedback');
      } else {
        resetInputsOn(template);
        console.info('reset inputs and positive feedback');
      }
    });
  }
});