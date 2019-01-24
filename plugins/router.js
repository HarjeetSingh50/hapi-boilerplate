const routes = require("../api/v1");

module.exports = {
  name: 'router',
  version: '1.0.0',
  register: async (server, options) => {
    server.route(routes);
  }
}