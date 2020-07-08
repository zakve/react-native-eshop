import AsyncStorage from '@react-native-community/async-storage';
import { API_KEY } from 'react-native-dotenv';
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })
    }
}

const saveTokenToStorage = async (token, userId, expirationTokenDate) => {
    try {
        const jsonValue = JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationTokenDate.toISOString()
        })
        await AsyncStorage.setItem('userData', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;

            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email was already registered!'
            } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message = 'Too many attempts try it later!'
            }
            throw new Error(message)
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.token, parseInt(resData.expiresIn) * 1000));
        const expirationTokenDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveTokenToStorage(resData.idToken, resData.localId, expirationTokenDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;

            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!'
            }
            throw new Error(message)
        }

        const resData = await response.json();
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
        const expirationTokenDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveTokenToStorage(resData.idToken, resData.localId, expirationTokenDate)
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}