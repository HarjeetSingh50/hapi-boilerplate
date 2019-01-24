const config = require("../config/appConfig");
const FCM = require('fcm-node');
const serverKey = config.commonConfig.notifications.fcmServerKey; //put your server key here
const fcm = new FCM(serverKey);

const sendPush = payload => {
  return new Promise((resolve, reject) => {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: payload.to,
      notification: {
        title: payload.title,
        body: payload.message
      },
      data: {
        action: payload.action
      }
    };
    console.log("Going to send push Notification, message is: --------------------->", message);
    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Error while sending push Notification.", err, typeof err);
        reject(new Error(err));
      } else {
        console.log("Notification sent successfully. ");
        resolve(response);
      }
    });
  })
};

/****** Test Notification */
// let payload = {
//   to: 'eMOqR37WRWI:APA91bHpWyD3PUh68Vy-1c29BhulxS64GTho5rooLP21wX1naUafK0tM8QUfQAqQgVpmhckwHTyoV8J9YTm2NLCvfm6Bwl-NyMyqDVfAdyP4w_8a2ifQ36LBrRWeaylsRrFMAApXJawG',
//   title: 'Some title',
//   message: 'Some message'
// }
// sendPush(payload);
/****** Test Notification */

module.exports = {
  sendPush
};

