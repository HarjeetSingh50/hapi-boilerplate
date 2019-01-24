const { User } = require("../../models/User");
const Notification = require("../../models/Notification");

module.exports = class Handler {
  constructor(io) {
    this.io = io;

    this.io.on('connection', socket => {
      try {
        console.log(`SocketID: ${socket.id} Connection request received ------------->.`);
        let socketId = socket.id;

        socket.on('authenticate', async (query, callback) => {
          console.log('Authenticating Socket User --------------------------->', query);
          let updatedUser = await User.findOneAndUpdate(
            {
              "sessions.login_token": query.token
            }, {
              "sessions.$.socket_id": socketId,
              updated_at: Date.now()
            }, {
              new: true
            });
          if (updatedUser) {
            callback(null, 'User connected successfully.');
            console.log('User Authentication: Success --->', updatedUser);
          } else {
            console.log('User Authentication: User not found --->');
            callback('Error while connecting user.', null);
          }
        });

        socket.on('disconnect', async (callback) => {
          let updatedUser = await User.findOneAndUpdate(
            {
              "tokens.socket_id": socketId
            }, {
              "tokens.socket_id": "",
              updated_at: Date.now()
            }, {
              new: true
            });
          console.log('User disconnected ----------------------->', updatedUser);
        });
      }
      catch (e) {
        console.log('Error in io.on: connection');
      }
    });
  }

  async sendNotfication(payload) {
    try {

      /** Send Main Notification */
      console.log(`Sending ${payload.method} Notification to ${payload.to} --------------->`);

      /** Get Unread Notifications Count */
      let findQ = { seen: false };
      payload.is_receiver_admin
        ? findQ.is_receiver_admin = true
        : findQ.receiver_user_id = payload.receiverUser._id;
      let notiCount = await Notification.count(findQ);
      let notiPayload = { title: payload.title, content: payload.content, notiCount };
      console.log(`Notification Payload is: --------------->`, notiPayload);
      this.io.to(payload.to).emit(payload.method, notiPayload);
    } catch (e) {
      console.log(`Error while Sending ${payload.method} Notification to ${payload.to}. Error message is: ${e.message}`);
    }
  }
};
