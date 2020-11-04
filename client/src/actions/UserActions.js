import { GET_USER_DATA, GET_FOLLOWING_DATA, CATCH_FAILUR } from './types';
import axios from 'axios';

export const getUserData = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/auth/logged');
            dispatch({
                type: GET_USER_DATA,
                payload: data,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
            })
        }
    }
}

export const getFollowingData = (userId) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/likes/${userId}`);
            const followingList = data.map(({vacation_id}) => vacation_id);
            dispatch({
                type: GET_FOLLOWING_DATA,
                payload: followingList,
            })
        } catch(err) {
            dispatch({
                type: CATCH_FAILUR,
                payload: null,
            })
        }
    }
}