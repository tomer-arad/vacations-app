const _ = require('lodash');

const ADD_USER = 'INSERT INTO `users`(`first_name`, `last_name`, `username`, `password`) VALUES (?,?,?,?)'
const GET_USER = 'SELECT `id`, `first_name`, `last_name`, `is_admin`, `avatar` FROM `users` WHERE `username`=?';
const FETCH_USERS = 'SELECT `username` FROM `users`';

const {createHashedPassword} = require('../utils/user-utils');

let error;

const createUser = async (res, body) => {
    const {firstName, lastName, username, password} = body
    const [results] = await global.mysqlConnection.execute(FETCH_USERS);
    const usernames = _.map(results, 'username');
    const findUser = _.includes(usernames, username)
    if(!findUser){
        return global.mysqlConnection.execute(ADD_USER, [firstName, lastName, username, createHashedPassword(password)]);
    }
    error = new Error('Username Problem');
    return res.status(400).json(error.message);
}

const getUserInfo = (username) => global.mysqlConnection.execute(GET_USER, [username]);

module.exports = {
    createUser,
    getUserInfo,
}