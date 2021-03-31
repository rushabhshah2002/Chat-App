const express = require("express");
const cors = require("cors");
const knex = require("knex");
const mysql = require("mysql2");
const app = express();

const groupRoute = require("./routes/group.routes");
const DeleteRoute = require("./routes/deleteChat.routes");
const LoginSignUp = require("./routes/LoginSignUp.routes");
const fetchLocation = require("./routes/fetchLocation");
const getPhoto = require("./routes/getPhoto.route");
const imageDataUri = require("image-data-uri");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "chat_app",
  password: "1234567890",
});

const db = pool.promise();

const db1 = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "chat_app",
    port: 3306,
  },
});

app.use(cors());
app.use(express.json());
// Create a all_users if not already exists
// db.schema.hasTable("all_users").then(function (exists) {
//   if (!exists) {
//     return db.schema.createTable("all_users", function (t) {
//       t.string("userid").unique().notNullable();
//       t.string("username").unique().notNullable();
//       t.string("email").unique().notNullable();
//       t.string("password").notNullable();
//       t.timestamp("joined_on").defaultTo(db.fn.now());
//     });
//   }
// });
// db1.schema.hasTable("user_location").then(function (exists) {
//   if (!exists){
//     return db1.schema.createTable("user_location",(t) => {
//       t.string("username");
//       t.string("userid");
//       t.string("latitude");
//       t.string("longitude");
//     })
//   }
// })
// all group routes
app.use("/group", groupRoute(db));
// all delete routes
app.use("/delete", DeleteRoute(db));
// Login Signup
app.use("/", LoginSignUp(db));
app.use("/map", fetchLocation(db));
// fetch all private messages
app.get("/allPrivateMessages", async (req, res) => {
  //getting user and friend from query
  const { user, friend } = req.query;

  // getting all chat messages done between user and friend
  let [chats, field] = await db.query(
    `Select * from private_messages where (sender = '${user}' and receiver = '${friend}') or (receiver = '${user}' and  sender = '${friend}');`
  );
  //
  // const chats = await db("private_messages")
  //   .where({ sender: user, receiver: friend })
  //   .orWhere({ sender: friend, receiver: user });
  let allMessages = [];
  // filtering messages which r not deleted by either one of them or both
  for (let chat of chats) {
    const accepted_by = chat.accepted_by.split(",");
    if (accepted_by.indexOf(user) !== -1) {
      allMessages.push(chat);
    }
  }

  res.json(allMessages).status(200);
});
// Fetching chatlist of user
app.get("/chatList", async (req, res) => {
  const { username } = req.query;
  // console.log(username);
  let [chats, field] = await db.query(
    `select * from user_chat where username = '${username}' order by last_updated ;`
  );

  console.log(chats, "123453456");

  // console.log(userInfo);
  // const chats = await db("user_chat")
  //   .where({ username })
  //   .orderBy("last_updated");
  // console.log(chats);
  res.json(chats);
});

app.get("/get/photo", (req, res) => getPhoto({ db1, req, res }));
// Fetching all users
app.get("/allUsers", async (req, res) => {
  let [users, field] = await db.query(
    `select username,joined_on from all_users order by joined_on ;`
  );
  const friends = [];
  const usernames = users.map((user) => user.username);
  const usersInfo = await db1("user_info").whereIn("username", usernames);
  for (let userInfo of usersInfo) {
    let datauri;
    try {
      datauri = await imageDataUri.encodeFromFile(
        `../socketServer${userInfo.image_url}`
      );
    } catch (err) {
      console.log(err);
    }
    friends.push({
      ...userInfo,
      image_url: datauri,
    });
  }
  // const users = await db("all_users")
  //   .select("username", "joined_on")
  //   .orderBy("joined_on");
  res.json({ users: friends });
});

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
