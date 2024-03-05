import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate= useNavigate();

    const hadler=async(e)=>{
        e.preventDefault();

        await axios.get('/api/users/logout')
        .then(res=>console.log(res.data))

        navigate('/login');
    }

    useEffect(()=>{
        axios.get('/api/hello')
            .then(res=> console.log(res.data))
    },[])

    return (
        <div style={{display: 'flex', justifyContent:'center',alignItems:'center',
        width:'100%', height:'100vh'}}> 
            <h2>시작페이지</h2>

            <button onClick={hadler}>로그아웃</button>
        </div>
    )
}


