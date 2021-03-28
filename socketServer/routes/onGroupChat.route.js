const onGroupChat = async ({ db, io,db1, data }) => {
  const { groupid, username } = data;
  let [allchats,field1234] = await db1.query(`select * from group_chat where groupid='${groupid}'`)
  // const allChats = await db("group_chat").where({ groupid });
  for (let chat of allchats) {
    const seen_by = chat.seen_by.split(",");
    if (seen_by.indexOf(username) === -1) seen_by.push(username);
    await db1.query(`update group_chat set seen_by='${seen_by.join()}' where  groupid ='${chat.chatid}'`)
    // await db("group_chat")
    //   .where({ groupid, chatid: chat.chatid })
    //   .update({ seen_by: seen_by.join() });
    //- jaskjal
  }
};
module.exports = onGroupChat;
