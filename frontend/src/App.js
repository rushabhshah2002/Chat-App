import { Route, Switch, useHistory } from "react-router-dom";
import Chat from "./Components/Chat.component";
import { useState, useEffect } from "react";
import ChatDir from "./Pages/ChatDir.pages";
import Signup from "./Components/SignUp.component";
import Login from "./Components/Login.component";
import GroupSetting from "./Pages/GroupSetting.pages";
import UserInfoForm from "./Components/UserInfoForm.component.jsx";
import Map from "./Components/Map.component";
import ForgetPassword from "./Components/ForgetPassword.components";
import ProfilePage from "./Components/ProfilePage.components";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./App.css";
function App() {
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    console.log(history);
    if (user) {
      if (
        !user.username &&
        history.location.pathname !== "/login" &&
        history.location.pathname !== "/signup"
      ) {
        history.push("/signup");
      }
    }
  });
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App">
      <ReactNotification />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <ChatDir user={user} setUser={setUser} />}
        />
        <Route path="/signup" render={() => <Signup setUser={setUser} />} />
        <Route path="/login" render={() => <Login setUser={setUser} />} />
        <Route
          path="/forget/password"
          render={() => <ForgetPassword setUser={setUser} />}
        />
        <Route
          path="/:user/profile"
          render={() => <ProfilePage user={user.username} />}
        />
        <Route
          path="/info"
          render={() => <UserInfoForm user={user.username} />}
        />

        <Route
          path="/:groupid/edit"
          render={() => <GroupSetting user={user.username} />}
        />
        <Route
          path="/:type/:id/:groupName"
          render={() => <Chat user={user.username} />}
        />
        <Route path="/:type/:id" render={() => <Chat user={user.username} />} />

        <Route
          path="/:type/@:id"
          render={() => <Chat user={user.username} />}
        />
        <Route path="/map" render={() => <Map />} />
      </Switch>
      <div className="footer">
        <p>©2021 One Message</p>
      </div>
    </div>
  );
}

export default App;
