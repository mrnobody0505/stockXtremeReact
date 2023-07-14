import styled from 'styled-components'
import { Link } from "react-router-dom";

export const AuthInput = styled.input`
width: 100%;
min-height:30px;
border: none;
font-size: 16px;
background-color: white !important;

&:focus {
  outline: none;
}

&:-webkit-autofill,
&:-webkit-autofill:hover, 
&:-webkit-autofill:focus, 
&:-webkit-autofill:active {
  background-color: transparent !important;
  -webkit-box-shadow: 0 0 0 50px white inset;
  transition: background-color 5000s ease-in-out 0s !important;
}
`;

export const AuthInputWrapper = styled.div`
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #d4d7e3;
  background-color: white;
`;

export const AuthSubmitButton = styled.button`
  padding: 16px 0;
  height: 52px;
  border-radius: 12px;
  border-color: transparent;
  background: #162d3a;
  color: white;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0.2px;
  

  &:hover {
    cursor: pointer;
  }
`;


export const AuthStyledLink = styled(Link)`
color: #1E4AE9;
text-decoration: none;
`;