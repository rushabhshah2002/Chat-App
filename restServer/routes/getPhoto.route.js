const imageDataUri = require("image-data-uri");
const getPhoto = async ({ db1, req, res }) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ message: "Username empty" });
  const userInfo = await db1("user_info").where({ username });
  console.log(
    userInfo,
    username,
    db1("user_info").where({ username }).toQuery()
  );
  const datauri = await imageDataUri.encodeFromFile(
    `../socketServer${userInfo[0].image_url}`
  );
  res.json({
    user: {
      ...userInfo[0],
      image_url: datauri,
    },
  });
};
module.exports = getPhoto;
