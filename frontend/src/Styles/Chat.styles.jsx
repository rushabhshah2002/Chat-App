import styled from "styled-components";
import { colors } from "./varibles";
export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 8vh;
  box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  align-items: center;
`;
export const NavBarItemsLeft = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;
export const NavBarItemsRight = styled.div`
  display: flex;
  align-items: center;
  padding-right: 1rem;
`;
export const NavBarImage = styled.img`
  heigth: 4rem;
  width: 4rem;
  border-radius: 50%;
  margin: 0 1rem;
`;
export const NavBarChatName = styled.h3`
  font-size: 2rem;
  color: ${colors["Davys Grey"]};
  font-family: Josefin;
`;
export const NavBarBTN = styled.button`
  background: transparent;
  border: none;
  height: 3rem;
  width: 3rem;
  margin: 0 0.3rem;
  cursor: pointer;
`;
export const MsgContainer = styled.div`
  height: 75vh;
  overflow: scroll;
`;
export const Msg = styled.div`
  display: flex;
  flex-direction: ${({ userType }) =>
    userType === "user" ? "row-reverse" : "row"};
  align-items: center;
  margin-top: 1rem;
  width: 70%;
  margin-left: ${({ userType }) => (userType === "user" ? "30%" : 0)};
`;

export const MSGImage = styled.img`
  overflow: hidden;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin: 0 1rem;
  margin-top: 2rem;
  border: 1px solid ${colors["Charleston Green"]};
`;
export const MSGLabel = styled.label`
display:inline-block
height:100%;
width:100%;
`;
export const MSGSVG = styled.svg`
  height: 3rem;
  width: 3rem;
`;
export const MsgText = styled.p`
  padding: 2rem 2rem 2rem 3rem;
  border-radius: 3rem;
  width: fit-content;
  font-size: 1.6rem;
  font-family: Proza Libre;
  cursor: pointer;
  margin-left: ${({ userType }) => (userType === "user" ? "1rem" : 0)};
  margin-right: ${({ userType }) => (userType === "user" ? 0 : "1rem")};
  text-align: ${({ userType }) => (userType === "user" ? "right" : "left")};
  background: ${({ userType }) =>
    userType !== "user" ? colors["Cultured 2"] : colors.Gunmetal};
  color: ${({ userType }) =>
    userType === "user" ? colors.Cultured : colors["Charleston Green"]};
  box-shadow: -2px 4px 5px 0px rgba(0, 0, 0, 0.2);
`;
export const Announcement = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.8rem;
  margin: 2rem 0;
`;
export const SCContainer = styled.div`
  height: 6.8vh;
  width: 100%;
  padding: 0.5rem;
  display: flex;
  box-shadow: 1px 3px 4px 0px rgba(0, 0, 0, 0.2);
  align-items: center;
  border: ${({ inputFocus }) =>
    inputFocus ? `1px solid ${colors["Gunmetal"]}` : `1px solid transparent`};
  transition: all 0.2s ease-out;
  border-radius: 30px;
`;
export const SCInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  background: transparent;
  font-size: 1.8rem;
  padding: 1rem;
  &:hover,
  &:focus,
  &:active {
    outline: none;
  }
`;
export const SCLabel = styled.label`
  height: 100%;
  width: 100%;
  display: inline-block;
`;
export const SCBtn = styled.button`
  height: 100%;
  width: auto;
  background: transparent;
  border: none;
  margin-right: 2rem;
  cursor: pointer;
`;
