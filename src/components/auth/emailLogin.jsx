import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthInput,AuthInputWrapper,AuthSubmitButton,AuthStyledLink } from "../styles/auth/auth";

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
      <FormWrapper>
        <div>
          <label htmlFor="email-input">Email</label>
          <AuthInputWrapper>
            <AuthInput
              type="email"
              placeholder="Email"
              // value={email}
              onChange={(val) => setEmail(val.target.value)}
              id="email-input"
            />
          </AuthInputWrapper>
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <AuthInputWrapper>
            <AuthInput
              type="password"
              placeholder="Password..."
              // value={password}
              id="password-input"
              onChange={(val) => setPassword(val.target.value)}
            />
          </AuthInputWrapper>
        </div>
        <AuthStyledLink style={{textAlign:'end'}} id="forgot-password" to="/forgotPassword">
          Forgot Password ?
        </AuthStyledLink>

        <AuthSubmitButton type="submit">Login</AuthSubmitButton>
      </FormWrapper>
    </form>
  );
};

const FormWrapper = styled.div`
display: grid;
grid-template-rows: 3fr 3fr 1fr 2fr;
row-gap: 24px;
`;
