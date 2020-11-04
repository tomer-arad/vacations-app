import { GET_USER_DATA, GET_FOLLOWING_DATA, CATCH_FAILUR } from '../actions/types';

const initialState = {
    currentUser: {},
    following: [],
    success: true
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_DATA:
            return {
                ...state,
                currentUser: action.payload,
            };

        case GET_FOLLOWING_DATA:
            return {
                ...state,
                following: action.payload,
            };

        case CATCH_FAILUR:
            return {
                ...state,
                following: [],
                success: false,
            };

        default:
            return state; 
    }
}

export default userReducer;
