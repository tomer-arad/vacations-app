const express = require('express');
const router = express.Router();
const { handleError } = require('../utils')
const { addFollow, deleteFollow, getFollowingData, userVacations } = require('../services/user-service');


// @route       GET /likes
// @desc        Get user likes data
router.get('/:userId', async(req, res) => {
    const { userId } = req.params;
    try{
        const [result] = await getFollowingData(userId);
        res.json(result);
    } catch(err) {
        handleError(err, res);
    }
});

// @route       POST /likes
// @desc        Add like to vacation
router.post('/:vacationId/:userId', async(req, res) => {
    const { vacationId, userId } = req.params;
    try{
        await addFollow(vacationId, userId);
        res.status(200).send({ msg: `User ${userId} follows vacation ${vacationId}`});
    } catch(err) {
        handleError(err, res);
    }
});

// @route       DELETE /likes
// @desc        Remove like from vacation
router.delete('/:vacationId/:userId', async(req, res) => {
    const { vacationId, userId } = req.params;
    try{
        await deleteFollow(vacationId, userId);
        res.status(200).send({ msg: `User ${userId} unfollows vacation ${vacationId}`});
    } catch(err) {
        handleError(err, res);
    }
});

// @route       GET /likes
// @desc        Show user vacations
router.post('/vacations', async(req, res) => {
    const { vacationsId } = req.body;
    try{
        const [result] = await userVacations(vacationsId);
        res.json(result);
    } catch(err) {
        handleError(err, res);
    }
});

module.exports = router;