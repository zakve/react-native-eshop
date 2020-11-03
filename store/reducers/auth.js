import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTOLOGIN } from "../actions/auth"

const initialState = {
    token: null,
    userId: null,
    didTryAutologin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                didTryAutologin: true
            };
        case SET_DID_TRY_AUTOLOGIN:
            return {
                ...state,
                didTryAutologin: true
            }
        case LOGOUT: {
            return {
                ...initialState,
                didTryAutologin: true
            }
        }
        default:
            return state
    }
}