import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const hadleSubmit= async(e)=>{
        e.preventDefault();

        // 서버로 보낼 정보 담기
        let user= {
            email: email,
            password: password,
        }

        dispatch(loginUser(user))
        .then(response=> {
            if(response.payload.loginSuccess){
                navigate('/');
            }else{
                alert('Error')
            }
        })
    }

    return (
        <div style={{display: 'flex', justifyContent:'center',alignItems:'center',
        width:'100%', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column', gap:'30px'}}>
                <label>이메일</label>
                <input type='email' value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }}></input>

                <label>비밀번호</label>
                <input type='password' value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                }}></input>

                <button onClick={hadleSubmit}>로그인</button>
            </form>
        </div>
    )
}

