const sMail = require("@sendgrid/mail");
const config = require("../config/appConfig");

sMail.setApiKey(config.commonConfig.emails.sendgridApiKey);

module.exports = async payload => {
  const msg = {
    from: config.commonConfig.emails.mailFrom,
    ...payload
  };
  console.log('Sending email to: ', payload);
  sMail
    .send(msg)
    .then(res => {
      console.log(`Mail Sent Success. Mail Status is: ${res[0].statusCode}`);
    })
    .catch(err => {
      console.log(`Mail Sent Error. Error Message is: ${err.message}`);
    });
};  