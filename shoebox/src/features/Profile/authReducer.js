import * as Types from './Types';

const initialState = {
    googleUser: null
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
        default:
            return state;
    }
};

export default authReducer