// has errors

const leaveGroup = async ({ data, db, db1,io }) => {
  const { user, groupid } = data;
   console.log(data)
  // let [userInfo,field24] = await db1.query(`select * from group_info where groupid='${groupid}' and member ='${user}'`)
  let [groupInfo,field] = await db1.query(`select * from all_groups where groupid='${groupid}'`)
  const userInfo = await db("group_info").where({ groupid, member: user });
  // const groupInfo = await db("all_groups").where({ groupid });
  console.log(userInfo)
  let members = groupInfo[0].member.split(",");
  const admins = groupInfo[0].admins.split(",");
  console.log(userInfo);
  if (!userInfo[0].left_date) {
    if (members.indexOf(user) !== -1) {
      members.splice(members.indexOf(user), 1);
    } else if (admins.length > 1) {
      admins.splice(admins.indexOf(user), 1);
    }
    await db1.query(`update all_groups set member = '${members.join()}' , admins ='${admins.join()}' where groupid = '${groupid}';`)
    
    // await db("all_groups")
    //   .where({ groupid })
    //   .update({ member: members.join(), admins: admins.join() });
    members.push(user);
  }
  await db1.query(`update group_info set left_date=current_timestamp where groupid='${groupid}' and member='${user}'`)
  await db1.query(`delete from user_chat where groupid='${groupid}' and  username='${user}' `)
  // await db("group_info").where({ groupid, member: user }).del();

  // await db1.query(`delete from user_chat where groupid ='${groupid}' and username = '${user}';`)
  // await db("user_chat").where({ groupid, username: user }).del();
  // const socketids = await db("socketids").whereIn("name", [
  //   ...members,
  //   ...admins,
  // ]);
  const [socketids,field1] =await db1.query(`select * from socketids where name in (?)`,[[
    ...members,
    ...admins,
  ]]);
  console.log(socketids);
  for (let socketid of socketids) {
    console.log(socketid.id);
    io.to(socketid.id).emit("group-noti", {
      type: "left_group",
      content: {
        member_left: "hskjaw",
      },
    });
  }
};
module.exports = leaveGroup;
