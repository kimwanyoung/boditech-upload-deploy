import styled from "styled-components";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
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
      axios.post('/api/login', {data: {id:userInfo.id, password: userInfo.password}})
        .then(res => {
          if(res.data === 'success'){
            navigate('/Sheet', {state : userInfo.id});
          }else{
            alert('등록되지 않은 사용자 입니다.');
            return;
          }
        })
        .catch(err => console.log(err));
    }
    else alert('아이디 및 비밀번호를 확인해주세요');
  }

  return (
    <LoginPageWrapper>
      <LoginBox>
        <InputWrapper>
          <LoginInput label="ID" variant="outlined" name="id" onChange={handleInput}/>
          <LoginInput type="password" label="Password" variant="outlined" name="password" onChange={handleInput}/>
        </InputWrapper>
        <BtnWrapper>
          <LoginButton variant="contained" color="info" onClick={handleSubmit}>로그인</LoginButton>
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
  width: 100vw;
  height: 100vh;
`

const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
  height: 40%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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