import { combineReducers } from 'redux';
import userReducer from './userReducer';
import vacationReducer from './vacationReducer';

export default combineReducers({
    userReducer,
    vacationReducer,
});