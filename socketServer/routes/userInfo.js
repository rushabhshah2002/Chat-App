const imageDataUri = require("image-data-uri");

const userInfo = async ({data,db1,db,io}) => {
    
    const {dataURI , bio,dob,username } = data;
    // console.log(data);
    // console.log(dataURI)
    let imageurl = await imageDataUri.outputFile(dataURI,`./media/${username}`)
    let imgURlArr = imageurl.split("");
    imgURlArr.shift();
    imageurl = imgURlArr.join("");
    console.log(imageurl,"123");
    await db1.query(`insert into user_info(dob,image_url,description,username,last_updated) values ('${dob}','${imageurl}','${bio}','${username}',current_timestamp)`)
    let [socketidsName,field]= await db1.query(`select * from socketids`)
    for(let socketid of socketidsName){
        io.to(socketid.id).emit("user-noti",{
            type:"Changed User Info",
            content:{
                username,
                photoURL:`http://localhost:5000/media/${username}.png`,
                bio,
                dob
            }
        })
    }
}
module.exports =userInfo;