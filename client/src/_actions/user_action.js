import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

// login 페이지에서 받아온 정보를 파라미터에 넣어줌
export async function loginUser(dataToSubmit){
    const request= await axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export async function registerUser(dataToSubmit){
    const request= await axios.post('/api/users/register',dataToSubmit)
    .then(response=> response.data)

    return{
        type: REGISTER_USER,
        payload: request,
    }
}

export async function auth(){
    // get method는 body부분이 필요 없음
    const request= await axios.get('/api/users/auth')
    .then(response=> response.data)

    return{
        type: AUTH_USER,
        payload: request,
    }
}