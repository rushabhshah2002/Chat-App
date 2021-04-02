const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
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
