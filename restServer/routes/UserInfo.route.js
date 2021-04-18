const imageDataUri = require("image-data-uri");
const UserInfo = async ({ db1, db, res, req }) => {
  const { username } = req.query;
  const [[userInfo]] = await db.query(
    `call Get_profile('${username}');`
  );
  const[activity,data2]= await db.query(`select * from diff where username='${username}' `)
  console.log(userInfo[0])

  const datauri = await imageDataUri.encodeFromFile(
    `../socketServer${userInfo[0].image_url}`
  );
  let userActivity = {}
    Object.keys(userInfo[0]).filter((key,i) => i >5 ).map(key => userActivity={...userActivity,[key]:userInfo[0][key]});
  const time = {};
   Object.keys(userActivity).map(day => {
      const [hr,min,sec] = userActivity[day].split(':');
      time[day] =Math.floor((Math.abs(Number(hr)) * 60) + Number(min) + (Number(sec) / 60));
  })
    console.log(time)
  res.json({
    ...userInfo[0],
    image_url: datauri,
    activity:time
  });
};

module.exports = UserInfo;
