const express = require("express");
const { uid } = require("uid/secure");

const wrapper = (db) => {
  const router = express.Router();

  class LoginSignUp {
    async logIn(req, res) {
      // getting username and password from body
      const { username, password, location } = req.body;
      console.log(req.body);
      // Fetching a user whoes username and password matches given username and password
      try{
        let [user, field] = await db.query(
          `call Login('${username}','${password}','${location.lat}','${location.long}')`
        );
        console.log(user,123)
        res.status(200).json({ user: user[0] });
  
      }catch(err){
        console.log(err)
        res.status(200).json({ err: err.sqlMessage });
      }
      
    }
    async signUp(req, res) {
      // getting username,password, email from body
      const { username, password, email, location } = req.body;
      console.log(req.body);
      try {
        // Creating New User
        let a = uid();
        console.log("132");
        console.log(a,username,password,email,"wegwrtenqw")
      
        try {
          let [a1, field1] = await db.query(
            `call SignUP('${a}','${username}','${email}','${password}','${location.lat}','${location.long}')`
          );
          console.log(a1)
        } catch (err) {
          res.status(400).json({err:err.sqlMessage})
        }

        
        
        let [user, field] = await db.query(
          `select * from all_users where username='${username}' and password ='${password}' and email='${email}' `
        );

        // const user = await db("all_users").where({ username, password, email });
        res.json({ user: user[0] }).status(200);
      } catch (error) {
        console.log(error);
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
