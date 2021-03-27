const onPrivateChat = async ({ data, io, db ,db1}) => {
  const { user, friend } = data;
  console.log("daas");
  let [allChat,field] = await db1.query(`select * from private_messages where sender ='${friend}' and receiver ='${user}'`)
  // const allChat = await db("private_messages").where({
  //   sender: friend,
  //   receiver: user,
  // });
  for (chat of allChat) {
    const seen_by = chat.seen_by.split(",");
    if (seen_by.indexOf(user) === -1) seen_by.push(user);
    
    await db1.query(`update private_messages set seen_by='${seen_by.join()}' where chatid='${chat.chatid}'`)

    // await db("private_messages")
    //   .where({ chatid: chat.chatid })
    //   .update({ seen_by: seen_by.join() });
  }
};
module.exports = onPrivateChat;
