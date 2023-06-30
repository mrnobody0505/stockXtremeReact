import styled from 'styled-components'
import { Link } from "react-router-dom";
export const AuthMain = styled.main`
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  background: url("https://images.unsplash.com/photo-1517934274943-d1749ff2d7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width:900px){
    grid-template-columns: 1fr;
    padding:16px;
  }

  @media screen and (max-width:320px){
    padding: 8px;
  }
  
`;


export const AuthSideImage = styled.img`
  border-radius: 24px;
  width: 100%;
  height: 100%;
  object-fit: cover;


  @media screen and (max-width:900px){
    display:none;
  }
`;

export const AuthFormContainer = styled.section`
  width: 400px;
  margin: 0 auto;
  display: grid;
  row-gap: 48px;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;


export const AuthLogoLinkContainer = styled.div`
    height:100px;
    text-align:center;
`


export const AuthSignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
