import { useNavigate } from "react-router-dom";
import googleImage from "../../public/img/icon/icons8-google.svg";
import { UserAuth } from "../../context/authContext";
import styled from "styled-components";


export const GoogleLogin = () => {
  const navigate = useNavigate();
  const { googleLogin } = UserAuth();
  const handleLoginByGoogle = async (e: any) => {
    e.preventDefault();
    try {
      const result = await googleLogin();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <QuickLogin onClick={handleLoginByGoogle}>
        <Icon src={googleImage} />
        <Text>Login with Google</Text>
      </QuickLogin>
    </div>
  );
};

const QuickLogin = styled.button`
  background-color: #f3f9fa;
  border-radius: 12px;
  padding: 9px 12px;
  border: 1px solid transparent;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #dfe3e4;
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 28px;
  margin-right: 16px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
`;