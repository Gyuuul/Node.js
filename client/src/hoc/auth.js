import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function(SpecificComponent, option, adminRoute = null) {
    // option
    // null => 아무나 접근 가능한 페이지
    // true => 로그인한 사람만 접근 가능한 페이지
    // false => 로그인한 사람은 접근 불가능한 페이지 

    // adminRoute
    // true 관리자만 출입 가능 
    // 아무것도 없으면 null

    function AuthenticationCheck(){
        const dispatch= useDispatch();
        const navigate= useNavigate();

        useEffect(()=>{
            dispatch(auth())
            .then(response =>{
                console.log(response);

                // 분기처리
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        // 로그인 안한 사람이 로그인 한 사람만 접근 가능한
                        // 페이지에 들어가려 한다면
                        navigate('/login');
                    }
                }else{
                    // 로그인 한 상태
                    // 관리자가 아닌데 관리자 페이지에 들어가려는 경우
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/');
                    }else{
                        // 로그인 한 유저가 로그인페이지나 회원가입 페이지에 가려할때
                        if(option===false){
                            navigate('/')
                        }
                    }
                }
            })
        },[])

        return(
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}
