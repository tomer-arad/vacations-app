const {createHashedPassword} = require('../utils/user-utils');

module.exports = {
    localStrategyHandler: (username, password, done) => {
        global.mysqlConnection.execute('select * from users where username = ? and password = ?',[username, createHashedPassword(password)])
         .then(data => {
            const user = data[0][0];
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
         }).catch(err => {
             return done(err);
         });
    },
    serializeUser: (user, done) => {
        done(null, user);
    },
    deserializeUser: (user, done) => {
        done(null, user);
    },
    isValid: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.sendStatus(401);
    }
}