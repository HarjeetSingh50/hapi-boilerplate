/* -----------------------------------------------------------------------
   * @ description : This file defines socket handlers.
----------------------------------------------------------------------- */

const SocketIO = require('socket.io');

module.exports = {
  name: 'Socket',
  version: '1.0.0',
  register: (server, options) => {

    let io = SocketIO.listen(server.listener);

    const handler = require('./handler');
    let ioHandler = new handler(io);

    server.expose('ioHandler', ioHandler);
  }
};
