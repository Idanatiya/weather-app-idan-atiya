import { userService } from './../../services/user.service';
import { setToast } from './toastAction';
import { storageService } from './../../services/storage-service';


export function signup(user) {
    const signedUpUser = userService.handleSignup(user);
    storageService.saveToStorage('loggedUser',user)
    return {
        type: 'SET_USER',
        user: signedUpUser
    }
}

export function login(username) {
    return dispatch => {
        try {
            const user = userService.handleLogin(username);
            storageService.saveToStorage('loggedUser',user)
            dispatch({type: 'SET_USER',user})
        } catch (err) {
            setToast({msg: err.message, type: 'error'})
        }
    }
}


export function logout() {
    storageService.saveToStorage('loggedUser',null)
    return {
        type: 'LOGOUT_USER'
    }
}