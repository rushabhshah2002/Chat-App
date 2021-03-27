const { uid } = require("uid");
const removeMember = async ({ data, io, db,db1 }) => {
  const { memberName, position, username, groupid } = data;
  console.log(data, "hello");
  let [userinfo,field] = await db1.query(`select * from group_info where groupid='${groupid}' and member='${username}';`)
  // const userinfo = await db("group_info").where({ groupid, member: username });
  if (userinfo[0].is_admin) {
    await db1.query(`update group_info set left_date=current_timestamp where groupid='${groupid}' and member ='${memberName}'`)
    
    
    // await db("group_info")
    //   .where({ groupid, member: memberName })
    //   .update({ left_date: db.fn.now() });

    let [groupInfo,field] = await db1.query(`select * from all_groups where groupid ='${groupid}'`)
    // const groupInfo = await db("all_groups").where({ groupid });

    const arr = groupInfo[0][position].split(",");
    console.log(groupInfo);
    arr.splice(arr.indexOf(memberName), 1);
    // db("group_info").where({groupid}).update({[position]:arr.join()});
    const members = groupInfo[0].member.split(",");
    members.push(...groupInfo[0].admins.split(","));
   //kandarp
    // await db1.query(`update all_groups `)
    await db("all_groups")
      .where({ groupid })
      .update({ [position]: arr.join() });
    const memberSocketIds = await db("socketids").whereIn("name", members);
    const newGroupInfo = await db("all_groups").where({ groupid });
    await db("group_chat").insert({
      type: "announcement",
      sender: null,
      groupid,
      chatid: uid(),
      accepted_by: members.join(),
      seen_by: username,
      text: `${username} kicked ${memberName}`,
    });
    for (memberSocketId of memberSocketIds) {
      io.to(memberSocketId.id).emit("group-noti", {
        type: "deleted member",
        content: {
          deletedMember: memberName,
          newGroupInfo: {
            members: newGroupInfo[0].member.split(","),
            admins: newGroupInfo[0].admins.split(","),
            group_name: newGroupInfo[0].group_name,
            groupid,
          },
          done_by: username,
        },
      });
    }
  } else {
    io.to(socket.id).emit("group-noti", {
      type: "delete member",
      content: {
        err: "Not Authorized",
      },
    });
  }
};

module.exports = removeMember;
