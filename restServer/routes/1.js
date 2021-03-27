const mysql = require('mysql2');
// create the pool
const pool = mysql.createPool({host:'localhost', user: 'root', database: 'test123',password='1234567'});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
// query database using promises
const user = await promisePool.query("SELECT * from person");
console.log(user)

server rest
 chats=`select * from user_chat where username = ${username} order by last_updated ;`
 user=`select username,joined_on from all_users order by joined_on ;`
 `Select * from private_messages where (sender = '${user}' and reciever = '${friend}') or (reciever = '${friend}' and  sender = '${user}');`

 login sign
 `Select username,email,joined_on from  all_users where usename='${username}' and password ='${password}'`
 `insert into all_users values(userid='${uid()}',username='${username}',password='${password}',email='${email}')`\
 `select * from all_users where username='${username}' and password ='${password}' and email='${email}' `


 let [,field] = await db1.query()

 group routes
 `select member from group_info where member = '${username}'`
 `select * from group_info where groupid = '${groupid}';`


 delete chat
`delete from  ${type === "group" ? `group_chat` : `private_messages`}  where chatid = ${chatids};`
'fb493bdcb6f', 'vraj', 'vraj', '12345', '2021-03-21 20:49:07'
`insert into socketids values('${username}','${id}');`
