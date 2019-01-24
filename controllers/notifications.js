const { listS } = require("../services/notifications");


module.exports = {

  list: async (req, h) => {
    try {
      const notifications = await listS(req);
      return req.server.methods.successAction(h, notifications);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  }
};