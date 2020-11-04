import { GET_VACATIONS_DATA, USER_VACATIONS, DEL_VACATIONS, SORT_VACATIONS, LIKE_VACATION, ADD_VACATION, EDIT_VACATION, CATCH_FAILUR, OPEN_TOGGLE } from '../actions/types';

const initialState = {
    vacations: [],
    sortedVacations: [],
    success: null,
    errorType: null
}

const vacationReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_VACATIONS_DATA:
            return {
                ...state,
                vacations: action.payload,
            };

        case USER_VACATIONS:
            return {
                ...state,
                vacations: action.payload,
            };

        case DEL_VACATIONS:
            return {
                ...state,
                vacations: action.payload,
            };

        case EDIT_VACATION:
            return {
                ...state,
                vacations: action.payload,
                success: true,
            };

        case ADD_VACATION:
            return {
                ...state,
                vacations: action.payload,
                success: true,
            };

        case SORT_VACATIONS:
            return {
                ...state,
                vacations: action.payload,
            };

        case LIKE_VACATION:
            return {
                ...state,
            };

        case OPEN_TOGGLE:
            return {
                ...state,
                success: false,
                errorType: action.payload,
            };

        case CATCH_FAILUR:
            return {
                ...state,
                errorType: action.payload,
            };

        default:
            return state; 
    }
}

export default vacationReducer;
