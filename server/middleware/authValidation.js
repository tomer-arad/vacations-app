const { VALID_STRING, VALID_USERNAME, VALID_PASSWORD } = require('./index');

const validUser = (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    if (!VALID_STRING(firstName) || !VALID_STRING(lastName)) {
        error = new Error('String Problem');
        return res.status(400).json(error.message);
    }
    if (!VALID_USERNAME(username)) {
        error = new Error('Username Problem');
        return res.status(400).json(error.message);
    }
    if (!VALID_PASSWORD(password)) {
        error = new Error('Password Problem');
        return res.status(400).json(error.message);
    }
    return next();
}

module.exports = {
    validUser,
}