// # /* On created */

// # Template.matterDiscussion.onCreated(function() {
// #   // 1. Initialization

// #   var instance = this;

// #   // initialize the reactive variables
// #   instance.loaded = new ReactiveVar(0);
// #   instance.limit = new ReactiveVar(5);
// #   instance.id = new ReactiveVar(FlowRouter.getParam('id'));

// #   var count;
// #   // 2. Autorun

// #   // will re-run when the "limit" reactive variables changes
// #   instance.autorun(function() {

// #     if (!count) {
// #       count = 5;
// #     }
// #     // get the limit
// #     var limit = instance.limit.get();
// #     var matter = instance.id.get();

// #     // console.log("Asking for "+limit+" discussion...")

// #     // subscribe to the discussion publication
// #     var subscription = instance.subscribe('discussion', limit, matter);

// #     // if subscription is ready, set limit to newLimit
// #     if (subscription.ready()) {

// #       $('#discussion-box').slimScroll({
// #         height: '250px',
// #         start: 'bottom'
// #       });
// #       // console.log("> Received "+limit+" discussion. \n\n")
// #       // get current value for limit, i.e. how many posts are currently displayed
// #       var limit = instance.limit.get();

// #       console.log('count = ' + count);
// #       console.log('limit = ' + limit);

// #       $('#discussion-box').slimScroll().bind('slimscroll', function(e, pos){
// #         if (pos == 'top') {
// #           if (limit <= count) {
// #             limit += 5;
// #             instance.limit.set(limit);
// #           }
// #         }
// #       });

// #       instance.loaded.set(limit);
// #       count = instance.discussion().count();

// #       var fiveHeight = 0;

// #       $('#discussion-box .item:lt(5)').each(function() {
// #         fiveHeight += $(this).height();
// #       });

// #       $('#discussion-box').slimScroll({
// #         scrollTo: fiveHeight + 'px'
// #       });
// #     } else {
// #       // console.log("> Subscription is not ready yet. \n\n");
// #     }
// #   });


// #   // 3. Cursor

// #   instance.discussion = function() {
// #     return Discussion.find({matter: instance.id.get()}, {limit: instance.loaded.get(), sort: {createdAt: 1}});
// #   }

// # });

// # /* Helpers */

// # Template.matterDiscussion.helpers({
// #   discussion: function() {
// #     return Template.instance().discussion();
// #   },
// #   hasNoMoreDiscussion: function() {
// #     return Template.instance().limit.get() > Template.instance().discussion().count();
// #   }
// # });