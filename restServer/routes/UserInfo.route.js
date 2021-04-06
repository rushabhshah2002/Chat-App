const imageDataUri = require("image-data-uri");
const UserInfo = async ({ db1, db, res, req }) => {
  const { username } = req.query;
  const [userInfo, data] = await db.query(
    `select all_users.username,all_users.email,all_users.password,user_info.image_url,user_info.dob,user_info.description from all_users,user_info where  all_users.username='${username}' and user_info.username='${username}';`
  );
  const datauri = await imageDataUri.encodeFromFile(
    `../socketServer${userInfo[0].image_url}`
  );
  res.json({
    ...userInfo[0],
    image_url: datauri,
  });
};
module.exports = UserInfo;
