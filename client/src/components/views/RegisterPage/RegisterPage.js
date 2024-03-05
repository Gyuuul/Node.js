import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';

export default function RegisterPage() {
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const dispatch= useDispatch();
  const navigate= useNavigate();

  const handler= (e)=>{
    e.preventDefault();

    if(password !== confirmPassword){
      return alert("비밀번호를 확인해주세요.")
    }

      let user={
        name:name,
        email: email,
        password: password,
      }

      dispatch(registerUser(user))
      .then(response=> {
        if(response.payload.success){
          navigate('/login');
        }else{
          alert("ERROR");
        }
      }
        
      )
  }

  return (
    <div style={{display: 'flex', justifyContent:'center',alignItems:'center',
    width:'100%', height:'100vh'}}>
      <form style={{display:'flex', flexDirection: 'column', gap: '20px'}}>
        <label>이름</label>
        <input type='text' value={name} onChange={(e)=>{
          setName(e.target.value);
        }}></input>

        <label>이메일</label>
        <input type='email' value={email} onChange={(e)=>{
          setEmail(e.target.value);
        }}></input>

        <label>비밀번호</label>
        <input type='password' value={password} onChange={(e)=>{
          setPassword(e.target.value);
        }}></input>

        <label>비밀번호 확인</label>
        <input type='password' value={confirmPassword} onChange={(e)=>{
          setConfirmPassword(e.target.value);
        }}></input>

        <button onClick={handler}>회원가입</button>
      </form>
    </div>
  )
}

