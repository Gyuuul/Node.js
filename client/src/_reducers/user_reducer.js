import { LOGIN_USER } from "../_actions/types";

// reducer의 인자는 (previousState, action)
export default function(state= {}, action){
    switch (action.type){
        case LOGIN_USER:
            return{...state, loginSuccess: action.payload}
        break;

        default:
            return state;
    }
}