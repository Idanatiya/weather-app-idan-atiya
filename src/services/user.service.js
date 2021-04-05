import { storageService } from './storage-service';
var gUsers = storageService.loadFromStorage('userDB') || [];


function _checkIfExists(username) {
    return gUsers.find(user => user.username === username)
}

function handleLogin(username) {
    const user= _checkIfExists(username)
    if(!user) {
        throw Error(`User ${username} is not exists`)
    }
    return user;
}

function handleSignup(user) {
    const userToAdd = {
        ...user,
        createdAt: Date.now(),
        id: Math.random().toString().substring(2,8)
       
    }
    gUsers.push(userToAdd)
    storageService.saveToStorage('userDB',gUsers)
    return userToAdd;
}


export const userService = {
    handleLogin,
    handleSignup,
}