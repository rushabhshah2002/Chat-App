const { uid } = require("uid");
const sendEmail = require("../utils/sendEmail.utils");
const wrapper = (db1) => {
  class forgetPassword {
    async send(req, res) {
      // Getting Username
      const { username } = req.query;
      //   Getting user email address
      const userInfo = await db1("all_users").where({
        username: username,
      });
      // Generating OTP
      const otp = uid(5);
      //   Sending Email to the user with generated OTP
      const msg = {
        to: userInfo[0].email,
        subject: "OTP Verification | One Message",
        html: `<h1>One Message</h1>
    <p>Your Otp is ${otp}</p>`,
      };
      sendEmail(msg);
      //   Sending OTP as response to frontend
      return res.json({ otp });
    }
  }
  const router = express.Router();
  router.get("/", async (req, res) => new forgetPassword().send);
  return router;
};
module.exports = wrapper;
