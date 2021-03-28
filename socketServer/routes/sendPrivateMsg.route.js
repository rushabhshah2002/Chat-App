const { uid } = require("uid/secure");

const sendPrivateMsg = async ({ data, db1,db, io, socket, users }) => {
  const { sender, receiver, text } = data;
  // console.log("eijsijae");
  // console.log(data, "jsafasjfdo");
  // const receiverData = await db("socketids").where({ name: receiver });
  let [receiverData,field] = await db1.query(`select *  from socketids where name = '${receiver}';`)
  console.log(receiverData,"123453456")
  const seen_by = [sender];
  if (users[receiverData[0].id]) {
    //console.log(users[receiverData[0].id], receiver, "jawojois");
    if (
      users[receiverData[0].id].currentPosition === "private" &&
      users[receiverData[0].id].locationid === sender
    ) {
      seen_by.push(users[receiverData[0].id].username);
    }
  }
  if (!sender || !receiver || !text) {
    throw error("Invalid details");
  }
  // console.log(seen_by);
  // await db1.query(``)
 await db("private_messages").insert({
    ...data,
    chatid: uid(),
    type:'private',
    created: db.fn.now(), 
    seen_by: seen_by.join(),
    accepted_by: [sender, receiver].join(),
  });


  let [arr,field1] = await db1.query(`select * from user_chat where (receiverName = '${receiver}' and username  ='${sender}' and type = 'private');`)

  // const arr = await db("user_chat").where({
  //   receiverName: receiver,
  //   username: sender,
  //   type: "private",
  // });
  let [arr1,field2] = await db1.query( `select * from user_chat where (receiverName = '${sender}' and username  ='${receiver}' and type = 'private');`)
  // const arr1 = await db("user_chat").where({
  //   receiverName: sender,
  //   username: receiver,
  //   type: "private",
  // });
  console.log(arr);
  if (arr.length === 0 && arr1.length === 0) {
    await db1.query(  `insert into user_chat(username,receiverName,last_updated,type,groupid) values ('${sender}','${receiver}',current_timestamp,'private','${null}');`)
    // await db("user_chat").insert({
    //   username: sender,
    //   receiverName: receiver,
    //   last_updated: db.fn.now(),
    //   type: "private",
    //   groupid: null,
    // });


    await db1.query(`insert into user_chat(username,receiverName,last_updated,type,groupid) values ('${receiver}','${sender}',current_timestamp,'private',null);`)
    // await db("user_chat").insert({
    //   username: receiver,
    //   receiverName: sender,
    //   last_updated: db.fn.now(),
    //   type: "private",
    //   groupid: null,
    // });
  }
  if (arr.length === 0 || arr1.length === 0) {
    await db1.query( `insert into user_chat(username,receiverName,last_updated,type,groupid) values ('${arr.length===0 ? sender:receiver}','${arr.length === 0 ? receiver : sender}',current_timestamp,'private',null);`)
    // await db("user_chat").insert({
    //   username: arr.length === 0 ? sender : receiver,
    //   receiverName: arr.length === 0 ? receiver : sender,
    //   last_updated: db.fn.now(),
    //   type: "private",
    //   groupid: null,
    // });
  } else {
    await db1.query( `update user_chat set last_updated = current_timestamp where (receiverName = '${receiver}' and type ='private');`)
    // await db("user_chat")
    //   .where({ receiverName: receiver, type: "private" })
    //   .update({ last_updated: db.fn.now() });
  }

  io.to(receiverData[0].id).emit("new-message", {
    ...data,
    type: "private",
  });
};
module.exports = sendPrivateMsg;
