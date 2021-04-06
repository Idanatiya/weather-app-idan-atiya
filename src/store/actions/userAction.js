import { useHistory } from 'react-router';
import { userService } from './../../services/user.service';
import { setToast } from './toastAction';


export function signup(user) {
    const signedUpUser = userService.handleSignup(user)
    return {
        type: 'SET_USER',
        user: signedUpUser
    }
}

export function login(username) {
        try {
            const user = userService.handleLogin(username);
            return {type: 'SET_USER',user}
        } catch (err) {
            setToast({msg: err.message, type: 'error'})
        }
}


export function logout() {
    return {
        type: 'LOGOUT_USER'
    }
}