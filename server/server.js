const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { dbConfig, cookieConfig } = require('./config');
const {localStrategyHandler, serializeUser, deserializeUser, isValid} = require('./passport');

const authController = require('./controllers/auth');
const tripsController = require('./controllers/vacations');
const userController = require('./controllers/user')
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(session({
    secret: 'keepitrippy!$@#$',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(dbConfig),
    cookie: cookieConfig
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

const init = async () => {
    const connection = await mysql.createConnection(dbConfig)
    global.mysqlConnection = connection;
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

init();

app.use('/auth', authController);
app.use('*', isValid)
app.use('/likes', userController);
app.use('/vacations', tripsController);

process.on('uncaughtException', (err, origin) => {
  console.log(err);
});