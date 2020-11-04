import { GET_VACATIONS_DATA, USER_VACATIONS, SORT_VACATIONS, LIKE_VACATION, DEL_VACATIONS, ADD_VACATION, EDIT_VACATION, CATCH_FAILUR, OPEN_TOGGLE } from './types';
import axios from 'axios';
import _ from 'lodash';

export const getVacationsData = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/vacations');
            dispatch({
                type: GET_VACATIONS_DATA,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}

export const getUserVacations = (following) => {
    return async dispatch => {
        try {
            const { data } = await axios.post('/likes/vacations', { "vacationsId": following });
            dispatch({
                type: USER_VACATIONS,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}

export const deleteVacation = (vacationId) => {
    return async dispatch => {
        try {
            await axios.delete(`/vacations/${vacationId}`);
            const { data } = await axios.get('/vacations');
            dispatch({
                type: DEL_VACATIONS,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}

export const editVacation = (vacation) => {
    return async dispatch => {
        try {
            await axios.patch(`/vacations/${vacation.id}`, vacation).catch(err => {
                throw err;
            }); 
            const { data } = await axios.get('/vacations');
            dispatch({
                type: EDIT_VACATION,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
                payload: err.response.data
            })
        }
    }
}

export const addVacation = (vacation) => {
    return async dispatch => {
        try {
            await axios.post('/vacations', vacation).catch(err => {
                throw err;
            });
            const { data } = await axios.get('/vacations');
            dispatch({
                type: ADD_VACATION,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
                payload: err.response.data
            })
        }
    }
}

export const toggleOpen = () => {
    return async dispatch => {
        try {
            dispatch({
                type: OPEN_TOGGLE,
                payload: null,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}

export const sortVacations = (vacations, following) => {
    return dispatch => {
        try {
            const data = vacations.sort((vacation) => {
                if(following.indexOf(vacation.id) > -1) {
                  return -1;
                } else {
                  return 1
                }
            })
            dispatch({
                type: SORT_VACATIONS,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}

export const likeVacation = (vacation, currentUser, following) => {
    return async dispatch => {
        const vacationId = vacation.id;
        const userId = currentUser.id;
        try {
            if(_.includes(following, vacationId)){
                vacation.likes --;
                await axios.delete(`/likes/${vacationId}/${userId}`);
            } else {
                vacation.likes ++;
                await axios.post(`/likes/${vacationId}/${userId}`);
            }
            await axios.patch(`/vacations/${vacationId}`, {...vacation, "likes": `${vacation.likes}`});
            dispatch({
                type: LIKE_VACATION,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}