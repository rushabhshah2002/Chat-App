const addMember = async ({ data, db,db1, io }) => {
  const { groupid, username, newMembers, group_name } = data;
  console.log(3456)
  for (let member of newMembers) {
    await db1.query(`insert into group_info(groupid,group_name,member,is_admin,in_date,left_date) values('${groupid}','${group_name}','${member}',0,current_timestamp,null)`)
    console.log(64)
    console.log(`insert into group_info(groupid,group_name,member,is_admin,in_date,left_date) values('${groupid}','${group_name}','${member}',0,current_timestamp,null)`)
    // await db("group_info").insert({
    //   groupid,
    //   member,
    //   group_name,
    //   is_admin: false,
    // });
  }
  let [groupInfo,field] = await db1.query(`select * from all_groups where groupid='${groupid}'`)
  // const groupInfo = await db("all_groups").where({ groupid });
  const members = groupInfo[0].member.split(",");
//kandarp
  // await db1.query(`update all_groups set member = '${[...members, ...newMembers].join()}' where groupid = '${groupid}' `)
  await db("all_groups")
    .where({ groupid })
    .update({ member: [...members, ...newMembers].join() });
  members.push(...groupInfo[0].admins.split(","));
  let [newGroupInfo,field1] = await db1.query(`select * from all_groups where groupid='${groupid}'`)
  // const newGroupInfo = await db("all_groups").where({ groupid });
  //kandarp
  const memberSocketIds = await db("socketids").whereIn("name", [
    ...members,
    ...newMembers,
  ]);
  
  for (memberSocketId of memberSocketIds) {
    io.to(memberSocketId.id).emit("group-noti", {
      type: "new member",
      content: {
        group: {
          members: newGroupInfo[0].member.split(","),
          admins: newGroupInfo[0].admins.split(","),
          groupid,
        },
        added_by: username,
        on: Date(),
      },
    });
  }
};
module.exports = addMember;
