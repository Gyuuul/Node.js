import axios from "axios";
import { LOGIN_USER } from './types'

// login 페이지에서 받아온 정보를 파라미터에 넣어줌
export async function loginUser(dataToSubmit){
    const request= await axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return{
        type: LOGIN_USER,
        payload: request
    }

}