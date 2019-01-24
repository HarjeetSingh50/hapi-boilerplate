const config = require("../config/appConfig");
const env = require("../env");
const sendMail = require("./sendgrid");
const { sendPush } = require("./fcm");
const User = require("../models/User");
const Notification = require("../models/Notification");

const verifyEmail = async (payload, req) => {
  let receiverUser = payload.receiverUser;
  /*--------------
  Sending Email Notification
  ---------------- */
  let emailPayload = {
    to: receiverUser.email,
    templateId: config.commonConfig.emails.templates.verifyEmail,
    dynamic_template_data: {
      first_name: receiverUser.first_name,
      last_name: receiverUser.last_name,
      verify_link: `${config[env.instance].siteUrl}/email-verification/${receiverUser.verify_tokens.email}`
    }
  };
  sendMail(emailPayload);
}

const resetPassword = async (payload, req) => {
  let receiverUser = payload.receiverUser;
  /*--------------
  Sending Email Notification
  ---------------- */
  let emailPayload = {
    to: receiverUser.email,
    templateId: config.commonConfig.emails.templates.resetPassword,
    dynamic_template_data: {
      first_name: receiverUser.first_name,
      last_name: receiverUser.last_name,
      reset_pass_link: `${config[env.instance].siteUrl}/reset-password/${receiverUser.verify_tokens.reset_pass}`
    }
  };
  sendMail(emailPayload);
}

// const amountTransferredToSP = async (payload, server) => {
//   let receiverUser = await User.findById(payload.receiver_user_id),
//     notiContent = `We have transferred £${payload.amount} to your bank, for the services of last month that were used successfully by the users`,
//     notiTitle = "Amount transferred";

//   /*--------------
//   Saving Notification to DB
//   ---------------- */
//   await Notification.create({
//     receiver_user_id: receiverUser._id,
//     message: notiContent,
//     title: notiTitle,
//     action: 7,
//     meta_data: {
//       payment_id: payload.payment_id
//     }
//   });

//   /*--------------
//   Sending Web Notification
//   ---------------- */
//   if (receiverUser.tokens.socket_id) {
//     server.plugins.Socket.ioHandler.sendNotfication({
//       method: 'amountTransferredToSP',
//       to: receiverUser.tokens.socket_id,
//       title: notiTitle,
//       content: notiContent,
//       receiverUser
//     });
//   }

//   /*--------------
//   Sending Email Notification
//   ---------------- */
//   let emailPayload = {
//     to: receiverUser.email,
//     templateId: config.commonConfig.emails.templates.amountTransferredToSP,
//     dynamic_template_data: {
//       receiverUser,
//       amount: payload.amount
//     }
//   };
//   sendMail(emailPayload);

//   /*--------------
//   Push Notification to User 
//   ---------------- */
//   if (receiverUser.device_info.token) {
//     var notiPayload = {
//       to: receiverUser.device_info.token,
//       title: notiTitle,
//       message: notiContent,
//       action: 'booked' == payload.method ? 9 : 10 /** See Notification Schema for other Options of action  **/
//     };
//     sendPush(notiPayload);
//   }
// }

module.exports = {
  verifyEmail,
  resetPassword
};


