const GET_FOLLOWING = 'SELECT `vacation_id` FROM `like_manager` WHERE `user_id`=?'
const ADD_FOLLOW = 'INSERT INTO `like_manager`(`vacation_id`, `user_id`) VALUES (?,?)';
const DEL_FOLLOW = 'DELETE FROM `like_manager` WHERE `vacation_id` = ? AND `user_id` = ?';
const USER_VACATIONS = (arr) => `SELECT * FROM vacations WHERE id IN (${arr})`;

const getFollowingData = (userId) => global.mysqlConnection.execute(GET_FOLLOWING, [userId]);

const addFollow = (vacationId, userId) => global.mysqlConnection.execute(ADD_FOLLOW, [vacationId, userId]);

const deleteFollow = (vacationId, userId) => global.mysqlConnection.execute(DEL_FOLLOW, [vacationId, userId]);

const userVacations = (vacationsId) => global.mysqlConnection.execute(USER_VACATIONS(vacationsId));;


module.exports = {
    addFollow,
    deleteFollow,
    getFollowingData,
    userVacations,
};