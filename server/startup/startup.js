Meteor.startup(function () {
  console.log(`hof3 backend startup at ${new Date}`);
  console.log(`MONGO_URL ${process.env.MONGO_URL}`);
  console.log(`BIND_IP ${process.env.BIND_IP}`);
  console.log(`ROOT_URL ${process.env.ROOT_URL}`);
  console.log(`PRODUCTION_URL ${process.env.PRODUCTION_URL}`);
});