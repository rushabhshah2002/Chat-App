const http = require("http").createServer();
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "chatt_app2",
  password: "1234567",
});
const db1 = pool.promise();

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "1234567",
    database: "chatt_app2",
    port: 3306,
  },
});
//*
//* Routes
//*

//!Private Chat
const sendPrivateMsg = require("./routes/sendPrivateMsg.route");
const onPrivateChat = require("./routes/onPrivateChat.route");
// !Group Chat
const createGroup = require("./routes/createGroup.route");
const addMember = require("./routes/addMember.route");
const changePosition = require("./routes/changePosition.route");
const changeGroupName = require("./routes/changeGroupName.route");
const removeMember = require("./routes/removeMember.route");
const sendGroupMsg = require("./routes/sendGroupMsg.route");
const leaveGroup = require("./routes/leaveGroup.route");
const onGroupChat = require("./routes/onGroupChat.route");
const userInfo = require("./routes/userInfo");

// db.schema.hasTable("user_info").then(function (exists) {
//   if (!exists) {
//     return db.schema
//     .createTable("user_info", function (t) {
//       t.string("dob");
//       t.string("image_url");
//       t.string("description");
//       t.string("username");
//       t.timestamp("last_updated").defaultTo(db.fn.now());
//     })
//   }
// });

const io = require("socket.io")(http, {
  reconnect: true,
});
var client;
const users = {};
const group = {};

io.on("connection", (socket) => {
  console.log("hello");
  socket.on("user_connected", async (data) => {
    const { username, currentPosition, id } = data;
    client = data.username;
    console.log(data,"kjdksjalkjsl");

    users[socket.id] = {
      id: socket.id,
      username,
      currentPosition,
      locationid: id,
    };
    let [userInfo, field] = await db1.query(
      `select * from socketids where name='${username}'`
    );
    console.log(socket.id)
    // await db1.query(
    //   `insert into end_time(username,start_time) values('${username}',current_timestamp)`
    // );rname);
    // const userInfo = await db("socketids").where("name", use
    if (userInfo.length === 0) {
      await db1.query(
        `insert into socketids values('${username}','${socket.id}');`
      );
      await db1.query(
        `update end_time set start_time=current_timestamp where username='${username}'`
      );

      // await db("socketids").insert([{ name: username, id: socket.id }]);
    } else {
      await db1.query(
        `update socketids set id = '${socket.id}' where name = '${username}'`
      );
      await db1.query(
        `update end_time set start_time=current_timestamp where username='${username}'`
      );
      // await db("socketids").where({ name: username }).update("id", socket.id);
    }
  });
  // socket.on("private_chat",(data) => privateChat(data,db,io))
  socket.on("send-private", (data) =>
    sendPrivateMsg({ data, db1, db, io, socket, users })
  );
  socket.on("create-group", (data) =>
    createGroup({ data, db, db1, io, socket })
  );
  socket.on("change-groupname", (data) =>
    changeGroupName({ data, db1, db, io ,socket})
  );
  socket.on("remove-member", (data) =>
    removeMember({ data, db, db1, io, socket })
  );
  socket.on("add-member", (data) => addMember({ data, db, db1, io }));
  socket.on("send-group", (data) => sendGroupMsg({ data, db, db1, io, users }));
  socket.on("leave-group", (data) => leaveGroup({ data, io, db, db1 }));
  socket.on("change-position", (data) => changePosition({ data, db, db1, io }));
  socket.on("on-privatechat", (data) => onPrivateChat({ db, io, db1, data }));
  socket.on("on-groupchat", (data) => onGroupChat({ db, io, db1, data }));
  socket.on("user-info", (data) => userInfo({ db, io, db1, data }));
  socket.on("log-out", async (data) => {
    console.log("sjasjdlj ")
    console.log(users,socket.id)
    console.log(client,123)
    await db1.query(
      `update end_time set end_time=current_timestamp where username='${client}'`
    );
    if (users[socket.id]) {
      console.log(`${users[socket.id].username} disconnected`);
      
      await db1.query(
        `update end_time set end_time=current_timestamp where username='${users[socket.id].username}'`
      );
      delete users[socket.id];
    }
    console.log(users[socket.id]);
    
    // remove saved socket from users object
    
    // await db1.query(
    //   `delete from end_time where username ='${users[socket.id].username}'`
    // );
  
  })
  //socket.on("create-group",new Gr(db,io).create)
  socket.on("disconnect", async function () {
    // await db1.query(
    //   `update end_time set end_time =current_timestamp  where username ='${
    //     users[socket.id].username
    //   }'`
    // );
    console.log(client,123)
    console.log(users,socket.id)
    if (users[socket.id]) {
      console.log(`${users[socket.id].username} disconnected`);
      
      await db1.query(
        `update end_time set end_time=current_timestamp where username='${users[socket.id].username}'`
      );
      delete users[socket.id];
    }
    console.log(users[socket.id]);
    
    // remove saved socket from users object
    
    // await db1.query(
    //   `delete from end_time where username ='${users[socket.id].username}'`
    // );
  });
});

const port = process.env.PORT || 3003;

http.listen(port, () => console.log(`Server running on port ${port} ????`));
