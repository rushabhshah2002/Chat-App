const { uid } = require("uid");
const createGroup = async ({ db,db1, io, data, socket }) => {
  const { group_name, username, members } = data;
  console.log("create group", data);

  const groupinfo = [
    {
      group_name,
      is_admin: true,
      member: username,
      in_date : db.fn.now(),
      groupid: uid(),
    },
  ];
  await db1.query(`INSERT INTO user_chat(username,receiverName,last_updated,groupid,type) VALUES('${username}','${group_name}',current_timestamp,'${groupinfo[0].groupid}','group')`)
  // await db("user_chat").insert({
  //   username: username,
  //   receiverName: group_name,
  //   last_updated: db.fn.now(),
  //   groupid: groupinfo[0].groupid,
  //   type: "group",
  // });
  console.log(members);
  for (let member of members) {
    groupinfo.push({
      group_name,
      is_admin: false,
      member,
      in_date : db.fn.now(),
      groupid: groupinfo[0].groupid,
    });
    await db1.query(`insert into user_chat(username,receivername,last_updated,groupid,type) values('${member}','${group_name}',current_timestamp,'${groupinfo[0].groupid}','group')`)

    // await db("user_chat").insert({
    //   username: member,
    //   receiverName: group_name,
    //   last_updated: db.fn.now(),
    //   groupid: groupinfo[0].groupid,
    //   type: "group",
    // });
  }
  await db("group_info").insert(groupinfo);
  await db1.query(`insert into  all_groups(groupid,group_name,member,admins) values('${groupinfo[0].groupid}','${group_name}','${members.join()}','${username}');`)

  // await db("all_groups").insert({
  //   groupid: groupinfo[0].groupid,
  //   group_name,
  //   member: members.join(),
  //   admins: username,
  // });
  // await db1.query(`insert into group_info `)


  
  
  let [group,field] = await db1.query(`select * from all_groups where groupid='${groupinfo[0].groupid}';`)
  // const group = await db("all_groups").where({ groupid: groupinfo[0].groupid });
  // groupArr = {
  //     group_name,
  //     groupid:groupinfo[0].groupid,
  //     members:[],
  //     admins:[],
  //     created :
  // }
  console.log(group);
  // let [memberSocketIds,field] = await db1.query()
  const memberSocketIds = await db("socketids").whereIn("name", [
    ...members,
    username,
  ]);
 
  for (memberSocketId of memberSocketIds) {
    console.log(memberSocketId.id);
    io.to(memberSocketId.id).emit("group-noti", {
      type: "new group",
      content: {
        ...group[0],
        member: members,
        created_by: username,
      },
    });
  }
};
module.exports = createGroup;
