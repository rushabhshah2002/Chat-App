const changeGroupName = async ({data,io,db,db1,socket}) => {
    const {groupid,group_name ,username} = data;
    console.log(data)
    console.log(socket.id,"kdsjal")

    try {
        await db1.query(`call Change_group_name('${username}','${groupid}','${group_name}')`)
      }
catch(e){
    console.log(e)
    io.to(socket.id).emit("group-noti",{
        type:"error",
        content:{
            message:e.sqlMessage
        }
    })
}
    
    
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