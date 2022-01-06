import * as Types from './Types';

const initialState = {
    googleUser: null,
    localUser: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GOOGLE_AUTH_SUCCESS:
            return {
                ...state,
                googleUser: {...action.payload.user},
            };
        case Types.LOGOUT_GOOGLE_USER:
            return {
                ...state,
                googleUser: null,
            };
        case Types.GET_GOOGLE_USER:
            return {
                ...state,
                googleUser: action.payload,
            };
        case Types.REGISTER_LOCAL_USER:
            return {
                ...state,
                localUser: { ...action.payload },
            };
        case Types.LOGIN_LOCAL_USER:
            return {
                ...state,
                localUser: action.payload,
            };
        case Types.LOGOUT_LOCAL_USER:
            return {
                ...state,
                localUser: null,
            };
        case Types.GET_LOCAL_USER:
            return {
                ...state,
                localUser: action.payload,
            };
        case Types.REDIRECT_AFTER_LOGIN:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default authReducer