const imageDataUri = require("image-data-uri");

const userInfo = async ({ data, db1, db, io }) => {
  const { dataURI, bio, dob, username } = data;
  // console.log(data);
  // console.log(dataURI);
  let imageurl = await imageDataUri.outputFile(dataURI, `./media/${username}`);
  let imgURlArr = imageurl.split("");
  imgURlArr.shift();
  imageurl = imgURlArr.join("");
  console.log(imageurl, "123");
  await db1.query(
    `call Store_user_info ('${username}','${dob}','${bio}','${imageurl}')`
 );
  let [socketidsName, field] = await db1.query(`select * from socketids`);
  for (let socketid of socketidsName) {
    io.to(socketid.id).emit("user-noti", {
      type: "Changed User Info",
      content: {
        username,
        photoURL: `http://localhost:5000/media/${username}.png`,
        bio,
        dob,
      },
    });
  }
};
module.exports = userInfo;
