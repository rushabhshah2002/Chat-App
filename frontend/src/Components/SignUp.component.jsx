import { useState , useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
const SignUp = ({ setUser }) => {
  const history = useHistory();
  const [userLocation,setUserLocation] = useState({})
  const [userInfo, setUserInfo] = useState({});
  const onSignUp = () => {
    if (!userInfo.username || !userInfo.password || !userInfo.email) {
      return;
    }

    fetch("http://localhost:5005/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ user }) => {
        history.push("/info");
        setUser(user);
      });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation(position);
      setUserInfo({...userInfo,location:{
        lat: position.coords.latitude,
        long: position.coords.longitude
      }})
    })
  } ,[])
  return (
    <div className="">
      <label>
        <input
          type="text"
          placeholder={"email"}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
        />
      </label>
      <label>
        <input
          type="password"
          placeholder={"password"}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
      </label>
      <label>
        <input
          type="text"
          placeholder={"username"}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, username: target.value })
          }
        />
      </label>
      <button onClick={onSignUp}>Sign Up</button>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default SignUp;
