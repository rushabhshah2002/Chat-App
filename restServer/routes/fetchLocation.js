const express = require("express");
const imageDataUri = require("image-data-uri");
const wrapper = (db) => {
  const router = express.Router();
  router.get("/users", async (req, res) => {
    // let [users, field12345] = await db.query(`select username from all_users`);
    let [[users]] = await db.query(`call Fetch_Location()`);
  
    let users_final = [];
    // console.log(users1[0].image_url,981);
    for (let user of users) {
     
      const datauri = await imageDataUri.encodeFromFile(
        `../socketServer${user.image_url}`
      );

      users_final.push({
      ...user,
        image_url: datauri,
      });
    }
    res.json(users_final).status(200);
  });
  return router;
};
module.exports = wrapper;
