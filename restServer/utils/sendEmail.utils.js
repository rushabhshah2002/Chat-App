const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  ""
);
const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: "chat_app@onemessage.org",
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
module.exports = sendEmail;
