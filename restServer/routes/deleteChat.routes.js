const express = require("express");
const { uid } = require("uid/secure");
const wrapper = (db) => {
  const router = express.Router();

  class DeleteChat {
    async specific(req, res) {
      const { chatids, username, type } = req.body;
      // console.log(req.body);
      
     
  
        let [chats,field] =await db.query(`select * from ${type==='group'?'group_chat':'private_messages'} where chatid in (?)`,[chatids])
      
      
      // const chats = await db(
      //   type === "group" ? `group_chat` : "private_messages" 
      // ).whereIn("chatid", chatids);
      const newAccepted_By = [];
      // console.log(123)
      // console.log(chats);
      for (let chat of chats) {
        const accepted_by = chat.accepted_by.split(",");
        if (accepted_by.indexOf(username) !== -1) {
          accepted_by.splice(accepted_by.indexOf(username), 1);
        
          // console.log(chat.chatid,"1232")
          await db.query(`update ${type === "group" ? `group_chat` : `private_messages`} set accepted_by = '${accepted_by.join()}' where chatid = '${chat.chatid}';`)
          // await db(type === "group" ? `group_chat` : "private_messages")
          //   .where({ chatid: chat.chatid })
          //   .update({ accepted_by: accepted_by.join() });
        } else if (accepted_by.indexOf(username) === -1) {
          res.json({ err: "Already deleted" });
        }
        if (accepted_by.length === 0) {
         let [a,fields]= await db.query(`delete from  ${type === "group" ? `group_chat` : `private_messages`}  where chatid = '${chat.chatid}';`)
         console.log(a)
          // await db(type === "group" ? `group_chat` : "private_messages")
          //   .where({ chatid: chat.chatid })
          //   .del();
        }

        newAccepted_By.push(accepted_by);
      }

      res.json({ newAccepted_By, chats });
    }
    async deleteWhole(req, res) {
      const { chatrooms, username: user } = req.body;
      //console.log(chatrooms);
      const allMsgs = [];
      for (let chatroom of chatrooms) {
        const { groupid, type, friend } = chatroom;
        

        if (groupid !== null) {
          // Delete Group from Table: user_chat
          await db.query(`delete from user_chat  where (groupid = '${groupid}' and type = '${type}' and username = '${user}' );`)
          // await db("user_chat").where({ groupid, type, username: user }).del();
          // Getting All Messages sent in the Group
          
          let [allchats,field] = await db.query(`select * from group_chat where groupid ='${groupid}';`)
          // const allChats = await db("group_chat").where({ groupid });
          // Store Chat all removing user from accepted_by
          const updatedChat = [];
          // Loops in All Chats of a Specific Group
          for (let chat of allChats) {
            // Removing User from accepted_by Column and then saving to the Database
            const accepted_by = chat.accepted_by.split(",");
            if (accepted_by.indexOf(user) !== -1) {
              accepted_by.splice(accepted_by.indexOf(user), 1);
              chat.accepted_by = accepted_by.join();
              console.log(accepted_by);
              updatedChat.push(chat);
              await db.query(`update  group_chat set accepted_by = '${accepted_by.join()}' where(groupid = '${groupid}' and chatid ='${chat.chatid}');`)
              // await db("group_chat")
              //   .where({ groupid, chatid: chat.chatid })
              //   .update({ accepted_by: accepted_by.join() });
              if (accepted_by.length === 0) {
                await db.query(`delete from user_chat where (type = "private" and  username = '${user} and recieverName  = '${friend}');`)
                // await db("group_chat").where({ chatid: chat.chatid }).del();
              }
            }
          }
          console.log(updatedChat, chatroom);
        } else {
          // Delete Friend Chat from Table: user_chat
          console.log(friend, user);
          console.log("Hwjoij");
          await db.query(`delete from user_chat where (type = "private" and  username = '${user} and recieverName  = '${friend}');`)
          // await db("user_chat")
          //   .where({
          //     type: "private",
          //     username: user,
          //     receiverName: friend,
          //   })
          //   .del();
          // Getting All Messages sent between user and that user
          let [allChats,field] = await db.query(`select * from private_messages where (sender = '${user}' and reciever = '${friend}') or (sender = '${friend}' and reciever = '${user}');`)
          // const allChats = await db("private_messages")
          //   .where({ sender: user, receiver: friend })
          //   .orWhere({ sender: friend, receiver: user });

          // Store new ChatInfo after all removing user from accepted_by
          const updatedChat = [];
          // Loops in All Chats of a Specific Group
          for (let chat of allChats) {
            // Removing User from accepted_by Column and then saving to the Database
            const accepted_by = chat.accepted_by.split(",");
            if (accepted_by.indexOf(user) !== -1) {
              accepted_by.splice(accepted_by.indexOf(user), 1);
              chat.accepted_by = accepted_by.join();
              updatedChat.push(chat);
              await db.query(`update private_messages  set accepted_by= '${accepted_by.join()}' where chatid = '${chat.chatid}'; `)
              // await db("private_messages")
              //   .where({ chatid: chat.chatid })
              //   .update({ accepted_by: accepted_by.join() });
              // Deleting whole row if accepted by is empty
              if (accepted_by.length === 0) {
                await db.query(`delete private_messages where(chatid = '${chat.chatid})`)
                // await db("private_messages")
                //   .where({ chatid: chat.chatid })
                //   .del();
              }
            }
          }
        }
      }
      res.json(allMsgs);
    }
  }

  router.delete("/specific", new DeleteChat().specific);
  router.delete("/whole", new DeleteChat().deleteWhole);
  return router;
};

module.exports = wrapper;
