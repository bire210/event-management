
const { eventResolver } = require("./event");
const { bookingResolver } = require("./booking");
const { authResolver } = require("./auth");

const rootValue = {
  ...eventResolver,
  ...bookingResolver,
  ...authResolver,
};

module.exports = { rootValue };
