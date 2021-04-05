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
    return dispatch => {
        console.log('getting into login action',username);
        try {
            const user = userService.handleLogin(username);
            console.log('user',user);
            dispatch({type: 'SET_USER', user})
        } catch (err) {
            // dispatch(setToast({msg: err.message, type: 'error'}))
            throw Error(err.message)
        }
    }
}


export function logout() {
    return {
        type: 'LOGOUT_USER'
    }
}