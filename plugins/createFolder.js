const { checkAndCreateFolder } = require("../utilities/universal");
const config = require("../config/appConfig");

module.exports = {
  name: 'createFolder',
  version: '1.0.0',
  register: async (server, options) => {
    checkAndCreateFolder(config.commonConfig.uploads.dir);
  }
}