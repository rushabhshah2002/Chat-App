const express = require("express");
const imageDataUri = require("image-data-uri");
const wrapper = (db) => {
  const router = express.Router();
  router.get("/users", async (req, res) => {
    let [users, field12345] = await db.query(`select username from all_users`);
    let users_final = [];
    console.log(users);
    for (let user of users) {
      let [userLocImg, filed] = await db.query(
        `select user_info.image_url,user_info.description,user_info.username,user_info.dob,user_location.username,user_location.latitude,user_location.longitude from user_info,user_location where user_info.username='${user.username}' and user_location.username='${user.username}'`
      );
      console.log(
        `select user_info.image_url,user_info.description,user_info.username,user_info.dob,user_location.username,user_location.latitude,user_location.longitude from user_info,user_location where user_info.username='${user.username}' and user_location.username='${user.username}'`,
        "aewr"
      );
      const datauri = await imageDataUri.encodeFromFile(
        `../socketServer${userLocImg[0].image_url}`
      );

      users_final.push({
        ...userLocImg[0],
        image_url: datauri,
      });
    }
    res.json(users_final).status(200);
  });
  return router;
};
module.exports = wrapper;
