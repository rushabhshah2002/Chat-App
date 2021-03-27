const changeGroupName = async ({data,io,db,db1}) => {
    const {groupid,group_name ,username} = data;
    console.log(data)
    await db1.query(`update group_info set group_name='${group_name}' where groupid='${groupid}'`)
    await db1.query(`update all_groups set group_name='${group_name}' where groupid='${groupid}'`)
    await db1.query(`update user_chat set receiverName='${group_name}' where groupid='${groupid}'`)
    
    // await db("group_info").where({groupid}).update({group_name});
    // await db("all_groups").where({groupid}).update({group_name});
    
    let [groupInfo,field] = await db1.query(`select * from all_groups where groupid='${groupid}'`)
    // const groupInfo = await db("all_groups").where({groupid});
    console.log(groupInfo)
     const members = groupInfo[0].member.split(",");
    members.push(...groupInfo[0].admins.split(","));
    //kandarp
    // let [memberSocketIds,field] = await db1.query(``)
    const memberSocketIds = await db("socketids").whereIn("name",members) 
    for(memberSocketId of memberSocketIds){
        io.to(memberSocketId.id).emit("group-noti",{
            type:"name changed",
            content:{
                new_name:group_name,
                changed_by:username,
                on:Date()
            }
        })
    }
}
module.exports = changeGroupName