const express = require("express")
const wrapper = (db) => {
    const router = express.Router()
    router.get("/users",async(req, res) => {
      let [userloc,field123] = await db.query(`select * from user_location`)
      res.json(userloc).status(200)
    })
    return router;
}
module.exports = wrapper;