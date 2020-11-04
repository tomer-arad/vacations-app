const _ = require('lodash');
const FETCH_VACATIONS = 'SELECT * FROM `vacations`';
const INSERT_VACATION = 'INSERT INTO `vacations`(`country`, `destination`, `description`, `starts`, `ends`, `price`, `image`) VALUES (?,?,?,?,?,?,?)';
const DELETE_VACATION = 'DELETE FROM `vacations` WHERE id = ?';
const UPDATE_VACATION = (id, field) => `UPDATE vacations SET ${field}=? WHERE id=${id}`;
const AUTO_INC_RESET = 'ALTER TABLE `vacations` AUTO_INCREMENT = 1';

const allVacations = () => global.mysqlConnection.execute(FETCH_VACATIONS, []);

const addVacation = async (data) => {
    console.log(data);
    const newTrip = _.values(data)
    return global.mysqlConnection.execute(INSERT_VACATION, newTrip);
}

const updateVacation = (id, data) => {
    const updateData = _.keys(data).map((key, idx) => {
        const newVal = _.values(data)[idx];
        return global.mysqlConnection.execute(UPDATE_VACATION(id, key), [newVal])
    })
    return updateData;
};

const deleteVacation = async (id) => {
    try {
        await global.mysqlConnection.execute(DELETE_VACATION, [id]);
        return global.mysqlConnection.execute(AUTO_INC_RESET, []);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    allVacations,
    addVacation,
    updateVacation,
    deleteVacation
}