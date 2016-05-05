// This is the global subscription manager that will cache data between template subscriptions during a session.
let subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
  });

export default subs;
