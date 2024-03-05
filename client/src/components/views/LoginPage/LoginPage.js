import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

export default function LoginPage() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const dispatch= useDispatch();

    const hadleSubmit= async(e)=>{
        e.preventDefault();

        // 서버로 보낼 정보 담기
        let user= {
            email: email,
            password: password,
        }

        try{
            const res= await axios.post('/api/users/login', user);

            dispatch(loginUser(user))
        }
        catch(error){
            console.error(error);
        }

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
