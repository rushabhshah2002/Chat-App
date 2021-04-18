import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "./varibles";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
`;
export const InputPrimary = styled.input`
  height: 5rem;
  width: 30rem;
  padding: 1rem;
  border: none;
  font-size: 2rem;
  margin: 1rem;
  border-radius: 2px;
  transition: background 0.3s ease-out;
  &:hover {
    border-bottom: 1px solid ${colors["Gunmetal"]};
  }
  &:active,
  &:focus {
    outline: none;
    background: ${colors["Cultured"]};
    border-bottom: 1px solid ${colors["Gunmetal"]};
  }
`;

export const FormHeading = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
  color: ${colors["Charleston Green"]};
`;
export const BTNPrimary = styled.button`
  background: none;
  color: ${colors["Gunmetal"]};
  height: 5rem;
  padding: 1rem;
  cursor: pointer;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  border: none;
  border: 1px solid transperent;
  font-family: "Josefin Slab", serif;
  &:hover,
  &:active,
  &:focus {
    outline: none;
    border: 1px solid ${colors["Gunmetal"]};
    border-radius: 0.5rem;
  }
  &:active,
  &:focus {
    background: ${colors["Cultured"]};
  }
`;
export const LinkPrimary = styled(Link)`
  color: ${colors["Gunmetal"]};
  text-decoration: none;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  padding: 1rem;
  transition: background 0.2s ease-out;
  &:hover {
    border-bottom: 1px solid ${colors["Gunmetal"]};
    background: ${colors["Cultured"]};
  }
`;
export const PPImage = styled.img`
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
  border: 2px solid ${colors["Gunmetal"]};
`;
export const PPInput = styled.input`
  height: 100%;
  width: 90%;
  padding: 1rem;
  border: none;
  font-size: 2rem;
 background: ${({ isInputHovered }) =>
   isInputHovered ? colors["Cultured"] : "white"}};
  border-radius: 2px;
  transition: background 0.3s ease-out;
  &:active,
  &:focus {
    outline: none;
    
  }
`;
export const PPInputContainer = styled.div`
  margin: 1rem;
  height: 5rem;
  width: 30rem;
  display: flex;
  align-items: center;
  transition: background 0.3s ease-out;
  border-bottom: ${({ isInputHovered }) =>
    isInputHovered ? `1px solid ${colors["Gunmetal"]}` : "unset"};
  background: ${({ isInputHovered }) =>
    isInputHovered ? colors["Cultured"] : "white"}};
`;
export const PPBTN = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.5rem;
  &:focus{
    outline :none;
  }
`;
export const PPTextBox = styled.textarea`
  height: 10rem;
  width: 30rem;

  border: none;
  font-size: 2rem;
  resize: none;

  &:focus,
  &:active {
    outline: none;
    border-bottom: 1px solid ${colors["Gunmetal"]};
  }
  &:hover {
    border-bottom: 1px solid ${colors["Gunmetal"]};

    border-radius: 0.5rem;
  }
`;
export default styled;
