import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "./varibles";

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 2rem;
  height: 8vh;
  box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.1);
`;
export const NavLinkIconsContainerLeft = styled.div`
  margin-right: 1rem;
`;
export const NavLinkIconsContainerRight = styled.div``;
export const NavLinkIcons = styled.button`
  height: ${({ isProfile }) => (isProfile ? "100%" : "3rem")};
  width: ${({ isProfile }) => (isProfile ? "5rem" : "3rem")};
  cursor: pointer;
  border: none;
  background: ${({ isProfile, isProfileHovered }) =>
    isProfile && isProfileHovered ? colors.Cultured : "none"};
  margin: 0 1rem;
  padding: ${({ isProfile }) => (isProfile ? "0 1rem" : "0")};
`;
export const NavLinkSVG = styled.svg`
  fill: ${colors["Davys Grey"]};
  &:hover {
    fill: ${colors["Charleston Green"]};
  }
`;
export const CreateGroupDetails = styled.div`
  position: fixed;
  height: 40rem;
  left: 40%;
  top: 20%;
  padding: 1rem;
  width: 40rem;
  display: flex;
  background: ${colors["Cultured"]};
  flex-direction: column;
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.3);
`;
export const CreateGroupDetailsContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: brightness(0.3);
`;
export const CGFriendLabel = styled.label`
  height: 4rem;
  width: 100%;
  cursor: pointer;
  padding: 0.3rem 1rem;
  display: flex;
  font-family: Proza Libre;
  justify-content: space-between;
  align-items: center;

  background-color: ${colors["Cultured 2"]};
  margin: 0.2rem 0;
  user-select: none;
  overflow: visible;
  color: ${colors["Gunmetal"]};
`;
export const CGFriendContainer = styled.div`
  width: 100%;
  heigth: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
export const CGInputs = styled.input`
  height: 6rem;
  border: none;
  margin-bottom: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  color: ${colors["Gunmetal"]};
  background-color: ${colors["Cultured"]};
  border-bottom: 1px solid ${colors["Gunmetal"]};
  font-family: Proza Libre;
  overflow: visible;
  &:hover {
    background-color: ${colors["Cultured 2"]};
  }
  &:active,
  &:focus {
    outline: none;
    border: 1px solid ${colors["Gunmetal"]};
    background-color: ${colors["Cultured 2"]};
  }
`;
export const CGFriendImage = styled.img`
  height: 100%;
  widht: 100%;
  border-radius: 50%;
  margin-right: 1.8rem;
  border: 1px solid ${colors["Gunmetal"]};
`;
export const CGBTN = styled.button`
  padding: 1rem;
  font-size: 1.5rem;
  background: none;
  border: 1px solid ${colors["Gunmetal"]};
  overflow: visible;
  cursor: pointer;
`;
export const CGSVG = styled.svg`
  height: 2rem;
  width: 2rem;
`;

export const CGFriendInfo = styled.span`
  height: 100%;
  width: 80%;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
`;
export const CGHeading = styled.h4`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 1rem;
  overflow: visible;
  color: ${colors["Charleston Green"]};
`;
export const CGExit = styled.button`
  width: 5rem;
  height: 5rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
  margin-left: 90%;
  margin-top: -1rem;
  color: ${colors["Gunmetal"]};
  &:hover {
    color: ${colors["Davys Grey"]};
  }
  &:active,
  &:focus {
    outline: none;
    color: ${colors["Slate Gray"]};
  }
`;

export const SPCContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors["Gunmetal"]};
  padding: 0.4rem;
  transition:all 0.2s ease-out;
  width: ${({ isInputFocus }) => (isInputFocus ? "50%" : "30%")};
  &:hover {
    background: ${colors["Cultured"]};
  }
  &:active,&:focus {
    backgroung:background: ${colors["Cultured"]};
    
  }
`;
export const SPCInput = styled.input`
  height: 3rem;
  width: 100%;
  border: none;
  font-size: 1.8rem;
  color: ${colors["Gunmetal"]};
  background-color: transparent;
  &:active,
  &:focus {
    outline: none;
  }
  font-family: Josefin;
`;
export const SPCBTN = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  background: transparent;
  margin-right: 0.8rem;
  border: none;
`;
export const SPCSContainer = styled.div`
  position: absolute;
  max-height: 40rem;
  height: fit-content;
  width: 72.4rem;
  margin-left: 2px;
  top: 5rem;
  left: 29.7%;
  border-top: none;
  background-color: #fff;
  overflow: scroll;
  padding-top: 1.6rem;
`;
export const SPCS = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${colors["Cultured"]};
  margin-bottom: 0.5rem;
`;
export const SPCSImage = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-right: 2rem;
  border: 1px solid ${colors["Gunmetal"]};
`;
export const SPCSFriendName = styled(Link)`
  text-decoration: none;
  color: ${colors["Slate Gray"]};
  font-size: 2rem;
  &:hover,
  &:focus,
  &:active {
    outline: none;
    color: ${colors["Charleston Green"]};
  }
  font-family: Proza Libre;
`;
export const UCContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 80vh;
`;
export const UC = styled.div`
  padding: 0.4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  background-color: ${colors.Cultured};
  font-family: Proza Libre;
`;
export const UCImage = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-right: 2rem;
`;
export const UCName = styled(Link)`
  text-decoration: none;
  color: ${colors["Slate Gray"]};
  font-size: 2rem;
  &:hover,
  &:focus,
  &:active {
    outline: none;
    color: ${colors["Charleston Green"]};
  }
`;
export const UCInfo = styled.div`
  display: flex;
  align-items: center;
`;
export const UPBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Josefin;
  margin-top: ${({ first }) => (first ? "2rem" : 0)};
  color: ${colors.Gunmetal};
  cursor: pointer;
  &:hover {
    color: ${colors["Charleston Green"]};
  }
  &:active {
    outline: none;
  }
`;
export const UPContainer = styled.div`
  position: absolute;
  height: 15rem;
  width: 20rem;
  top: 8%;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  box-shadow: -3px 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 10px;

  opacity: ${({ isProfileHovered }) => (isProfileHovered ? "100%" : 0)};
  display: ${({ isProfileHovered }) => (isProfileHovered ? "flex" : "none")};
`;
export const UPSVG = styled.svg`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  fill: ${({ isProfileLinkHovered, svg }) =>
    isProfileLinkHovered === svg
      ? colors["Charleston Green"]
      : colors["Davys Grey"]};
`;
