import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import styled from "styled-components";


export const EmailLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = UserAuth();
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      navigate("/home");
    } catch (err) {
      setErrorMessage(getErrorMessage(err.message));
      console.log(err);
    }
  };

  const getErrorMessage = (errorCode) => {
    let errorMessage = "";
    switch (errorCode) {
      case "Firebase: Error (auth/wrong-password).":
        errorMessage = "Invalid password. Please try again.";
        break;
      // Add more cases for other error codes if needed
      default:
        errorMessage = "An error occurred. Please try again.";
        break;
      }

    return errorMessage;
  };
  
  return (
    <form onSubmit={handleEmailLogin}>
      <FormContainer>
        <InputContainer className="form-container">
          <label htmlFor="email-input">Email</label>
          <InputWrapper className="input-wrapper">
            <Input
              type="email"
              placeholder="Email"
              // value={email}
              onChange={(val) => setEmail(val.target.value)}
              id="email-input"
              />
          </InputWrapper>
        </InputContainer>
        <InputContainer className="form-container">
          <label htmlFor="password-input">Password</label>
          <InputWrapper className="input-wrapper">
            <Input
              type="password"
              placeholder="Password..."
              // value={password}
              id="password-input"
              onChange={(val) => setPassword(val.target.value)}
              />
          </InputWrapper>
        </InputContainer>
        <StyledLink id="forgot-password" to="/forgotPassword">
          Forgot Password ?
        </StyledLink>

        <SubmitButton type="submit">Login</SubmitButton>
      </FormContainer>
    </form>
  );
};

const FormContainer = styled.div`
display: grid;
grid-template-rows: 3fr 3fr 1fr 2fr;
row-gap: 24px;
onSubmit={handleEmailLogin}
`;

const InputContainer = styled.div``;

const InputWrapper = styled.div`
  margin-top: 8px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #d4d7e3;
  background-color: white;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 16px;
  background-color:inherit;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 16px 0;
  height: 52px;
  border-radius: 12px;
  background: #162d3a;
  color: white;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0.2px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
color: #1E4AE9;
text-decoration: none;
text-align: end;
}
`;