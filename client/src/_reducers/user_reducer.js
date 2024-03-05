import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

// reducer의 인자는 (previousState, action)
export default function(state= {}, action){
    switch (action.type){
        case LOGIN_USER:
            return{...state, loginSuccess: action.payload}
        break;

        case REGISTER_USER:
            return{...state, registerSuccess: action.payload}
        break;

        case AUTH_USER:
            // server auth router에 유저의 정보가 모두 담겨 있음
            // 그 유저 정보가 action.payload에 담겨있는 것
            return{...state, userData: action.payload}
        break;

        default:
            return state;
    }
}