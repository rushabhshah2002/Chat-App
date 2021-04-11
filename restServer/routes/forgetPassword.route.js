const { uid } = require("uid");
const sendEmail = require("../utils/sendEmail.utils");
const express = require("express");
const wrapper = (db1, db) => {
  class forgetPassword {
    async send(req, res) {
      console.log(req.query);
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
      // console.log(msg);
      sendEmail(msg);
      //   Sending OTP as response to frontend
      return res.json({ otp });
    }

    async updatePassword(req, res) {
      const { username, password } = req.body;
      console.log(username);

      try {
        await db.query(
          `update all_users set password ='${password}' where username='${username}'`
        );
      } catch (e) {
        // res.status(400).json(e.sqlMessage)
      }
      let [user, field] = await db.query(
        `Select username,email,joined_on from  all_users where username='${username}' and password ='${password}'`
      );

      res.status(200).json({ user: user[0] });
    }
  }
  const router = express.Router();
  router.get("/", new forgetPassword().send);
  router.post("/", new forgetPassword().updatePassword);
  return router;
};
module.exports = wrapper;
