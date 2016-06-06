SSR.compileTemplate('seoPostView', Assets.getText('postView.html'));
Template.seoPostView.helpers({
    userDescription: function (description) {
        if(description) {
            return description;
        } else {
            return 'default description';
        }
    },
    userTwitter: function (handle) {
        if(handle) {
            return handle;
        } else {
            return 'default handle';
        }
    }
})