const express = require("express");
const { uid } = require("uid/secure");

const wrapper = (db) => {
  const router = express.Router();

  class LoginSignUp {
    async logIn(req, res) {
      // getting username and password from body
      const { username, password,location } = req.body;
      console.log(req.body)
      // Fetching a user whoes username and password matches given username and password
      let [user,field] = await db.query(`Select username,email,joined_on from  all_users where username='${username}' and password ='${password}'`)
      let [user1,field123] = await db.query(`update user_location set longitude='${location.long}',latitude='${location.lat}' , cur_time=current_timestamp where username='${username}';`)
      // const user = await db("all_users")
      //   .where({
      //     username: username,
      //     password: password,
      //   })
      //   .select("username", "email", "joined_on");
      // checking if is no user of that credentials else returnig user
      if (user.length === 0) {
        res.status(401).json({ error: "Wrong credentials" });
      } else {
        res.status(200).json({ user: user[0] });
      }
    }
    async signUp(req, res) {
      // getting username,password, email from body
      const { username, password, email,location } = req.body;
       console.log(req.body)
      try {
        // Creating New User
        let a=uid()
        let [a1,field1] = await db.query(`INSERT INTO all_users VALUES('${a}','${username}','${email}','${password}',CURRENT_TIMESTAMP)`)
        let [b,field234]= await db.query(`insert into user_location(username,userid,latitude,longitude,cur_time) values('${username}','${a}','${location.lat}','${location.long}',current_timestamp) `)
        console.log(b)
        // console.log(a,123)
        // await db("all_users").insert({
        //   userid: uid(),
        //   username: username,
        //   password: password,
        //   email: email,
        // });
        // Fetching that user and returnig it
        let [user , field] = await db.query(`select * from all_users where username='${username}' and password ='${password}' and email='${email}' `)

        // const user = await db("all_users").where({ username, password, email });
        res.json({ user: user[0] }).status(200);
      } catch (error) {
        console.log(error)
        // If User Already Exists
        return res.status(400).json({ message: "Already added", error: error });
      }
    }
  }
  // Routes
  router.post("/login", new LoginSignUp().logIn);
  router.post("/signup", new LoginSignUp().signUp);
  return router;
};

module.exports = wrapper;
