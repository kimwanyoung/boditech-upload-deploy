import styled from "styled-components";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from 'axios';
// import { PROXY } from "../components/proxy";

const Login = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({maxWidth: 767});
  const [userInfo, setUserInfo] = useState({
    id:'',
    password:''
  })

  const handleInput = e => {
    const {name,value} = e.target;
    let newUserInfo = {...userInfo};
    newUserInfo[name] = value;
    setUserInfo(newUserInfo);
  }

  const handleSubmit = () => {
    if(userInfo.id && userInfo.password) {
      axios.post(`/api/login`, {data: {id:userInfo.id, password: userInfo.password}})
        .then(res => {
          if(res.data === 'success'){
            navigate('/Sheet', {state : userInfo.id});
          }else{
            alert('This user is not registered.');
            return;
          }
        })
        .catch(err => console.error(err));
    }
    else alert('Please check your ID and password.');
  }

  return (
    <LoginPageWrapper>
      <LogoImg src="/logo.png" alt="logo" onClick={() => navigate('/')}/>
      <LoginBox isMobile={isMobile}>
        <InputWrapper>
          <LoginInput label="ID" variant="outlined" name="id" onChange={handleInput}/>
          <LoginInput type="password" label="Password" variant="outlined" name="password" onChange={handleInput}/>
        </InputWrapper>
        <BtnWrapper>
          <LoginButton variant="contained" color="info" onClick={handleSubmit}>Sign in</LoginButton>
        </BtnWrapper>
      </LoginBox>
    </LoginPageWrapper>
  )
}

export default Login;

const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const LogoImg = styled.img`
  margin-bottom: 2rem;
  cursor: pointer;
`

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${props => props.isMobile ? '90vw' : '30%'};
  height: ${props => props.isMobile ? '17rem' : '40%'};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const LoginButton = styled(Button)`
  width: 90%;
  height: 3rem;
  margin-bottom:0.5rem !important;
`

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const LoginInput = styled(TextField)`
  width: 90%;
  height: 3rem;
  margin-bottom:1rem !important;
`