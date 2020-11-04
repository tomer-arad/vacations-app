const express = require('express');
const router = express.Router();
const passport = require('passport');
const { handleError } = require('../utils');
const { validUser } = require('../middleware/authValidation');
const {createUser, getUserInfo} = require('../services/auth-service')

// @route       POST /auth
// @desc        Login authentocation
router.post('/login', 
passport.authenticate('local', {failureRedirect: '/login'}), async (req, res) => {
    try {
        res.sendStatus(200);
    } catch (err) {
        console.error(err)
    }
});

// @route       POST /auth
// @desc        Sign up new user
router.post('/signup', validUser, async (req, res) => {
    try {
        const { username } = req.body
        await createUser(res, req.body);
        res.json({msg: `User ${username} was added`});
    } catch (err) {
        handleError(err, res)
    }
});

// @route       GET /auth
// @desc        Fetch user data
router.get('/logged', async(req, res) => {
    try {
        const { username } = req.user;
        const [result] = await getUserInfo(username);
        res.json(result[0]);
    } catch (err) {
        console.error(err)
        res.send({msg: 'user not found'})
    }
})

// @route       GET /auth
// @desc        Logout user
router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        req.logout();
        res.cookie('connect.sid', req.cookies['connect.sid'], {maxAge: -1});
        res.sendStatus(200);
        if(err) {
            res.sendStatus(400);
        }
    });
});

module.exports = router;