import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {VictoryBar,VictoryChart,VictoryAxis,VictoryTooltip} from "victory"
import {
  Container,
  InputPrimary,
  PPImage,
  PPInput,
  PPInputContainer,
  PPBTN,
  LinkPrimary,
  PPTextBox,
  FormHeading
} from "../Styles/Form.styles";

const ProfilePage = ({ user }) => {
  const [userInfo, setUserInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isTextBoxHovered, setIsTextBoxHovered] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5005/user/info?username=${user}`)
      .then((response) => response.json())
      .then((user) => {
        const dob = user.dob.split("T");
        console.log(dob);
        console.log(user)
        setUserInfo({ ...user, dob: dob[0] });
      });
  }, []);
  
  return (
    <>
    <Container className="">
      <PPImage src={userInfo.image_url} alt="user DP" />
      <InputPrimary type="text" value={userInfo.username} />

      <InputPrimary type="date" value={userInfo.dob} />
      <PPTextBox type="text" value={userInfo.description} />
      <PPInputContainer
        className=""
        onMouseEnter={() => setIsInputHovered(true)}
        onMouseLeave={() => setIsInputHovered(false)}
        isInputHovered={isInputHovered}
      >
        <PPInput
          type={showPassword ? "text" : "password"}
          name=""
          id=""
          value={userInfo.password}
          isInputHovered={isInputHovered}
        />
        <PPBTN onClick={() => setShowPassword(!showPassword)}>
          {!showPassword ? (
            <svg
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
            >
              <title>Show Password</title>
              <g>
                <g>
                  <g>
                    <path
                      d="M201.5,472h-105c-22.056,0-40-17.944-40-40V268c0-22.056,17.944-40,40-40h288c22.056,0,40,17.944,40,40v21
				c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20v-21c0-44.112-35.888-80-80-80h-24.037v-70.534
				C360.463,52.695,306.631,0,240.463,0s-120,52.695-120,117.466V188H96.5c-44.112,0-80,35.888-80,80v164c0,44.112,35.888,80,80,80
				h105c11.046,0,20-8.954,20-20C221.5,480.954,212.546,472,201.5,472z M160.463,117.466c0-42.715,35.888-77.466,80-77.466
				s80,34.751,80,77.466V188h-160V117.466z"
                    />
                    <circle cx="203.5" cy="346" r="20" />
                    <path
                      d="M491.864,403.503c-0.703-1.001-3.115-4.415-4.614-6.3c-6.696-8.422-22.376-28.146-44.193-45.558
				C415.085,329.319,386.299,318,357.5,318s-57.585,11.319-85.556,33.643c-21.82,17.414-37.499,37.137-44.187,45.551
				c-1.503,1.889-3.917,5.305-4.621,6.307c-4.847,6.898-4.848,16.096-0.002,22.994c0.705,1.003,3.119,4.421,4.617,6.302
				c6.694,8.422,22.373,28.145,44.192,45.559C299.915,500.681,328.701,512,357.5,512s57.584-11.319,85.557-33.643
				c21.817-17.413,37.498-37.136,44.196-45.562c1.498-1.885,3.908-5.296,4.611-6.297
				C496.712,419.599,496.712,410.401,491.864,403.503z M357.5,472c-29.705,0-60.841-19.164-92.642-57
				c31.799-37.835,62.935-57,92.642-57c29.703,0,60.843,19.169,92.643,57.001C418.342,452.835,387.206,472,357.5,472z"
                    />
                    <circle cx="128.5" cy="346" r="20" />
                    <circle cx="358.5" cy="415" r="38" />
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
              <title>Hide Password</title>
              <g>
                <g>
                  <g>
                    <circle cx="370" cy="346" r="20" />
                    <path
                      d="M460,362c11.046,0,20-8.954,20-20v-74c0-44.112-35.888-80-80-80h-24.037v-70.534C375.963,52.695,322.131,0,255.963,0
				s-120,52.695-120,117.466V188H112c-44.112,0-80,35.888-80,80v164c0,44.112,35.888,80,80,80h288c44.112,0,80-35.888,80-80
				c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40H112c-22.056,0-40-17.944-40-40V268
				c0-22.056,17.944-40,40-40h288c22.056,0,40,17.944,40,40v74C440,353.046,448.954,362,460,362z M335.963,188h-160v-70.534
				c0-42.715,35.888-77.466,80-77.466s80,34.751,80,77.466V188z"
                    />
                    <circle cx="219" cy="346" r="20" />
                    <circle cx="144" cy="346" r="20" />
                    <circle cx="294" cy="346" r="20" />
                  </g>
                </g>
              </g>
            </svg>
          )}
        </PPBTN>
      </PPInputContainer>

      <LinkPrimary to="/">Back</LinkPrimary>
    
    </Container>
    <Container>
      <FormHeading style={{margin:0}}>Activity Time</FormHeading>
            <VictoryChart  domainPadding={30}>
              <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
      
          
          tickFormat={ ["Mon","Tue","Wed","Thrus","Fri","Sat","Sun"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x}min`)}
        />
        <VictoryBar
        height={"40%"}
        width={"40%"}
        labelComponent={<VictoryTooltip/>}
         data={Object.keys(userInfo.activity || {}).map((key,i) =>( {x:i+1,y:userInfo.activity[key],label:userInfo.activity[key]}))
            
        }
          
        />
            </VictoryChart>
            </Container>
    </>
  );
};

export default ProfilePage;
