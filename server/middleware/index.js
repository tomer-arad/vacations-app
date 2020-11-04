const _ = require('lodash');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
.is().min(4)                                    // Minimum length 8
.is().max(12)                                   // Maximum length 12
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const userSchema = new passwordValidator();
userSchema
.has().letters()
.has().not().symbols()
.has().not().spaces();

const priceSchema = new passwordValidator();
priceSchema
.has().not().letters()
.has().not().symbols()
.has().digits(1);

const VALID_STRING = (str) => {
    if(str && _.isString(str)){
        return true;
    }
    console.log('String Problem')
    return false;
};

const VALID_LENGTH = (arr) => {
    if(arr.length > 0 && arr.length < 500){
        return true;
    }
    console.log('Array Problem')
    return false;
};

const VALID_PRICE = (price) => {
    if(priceSchema.validate(price)){
        return true;
    }
    console.log('Number Problem')
    return false;
}

const VALID_IMG = (img) => {
    if(_.startsWith(img, 'https')){
        return true;
    }
    console.log('URL Problem')
    return false;
}

const VALID_DATES = (start, end) => {
    const now = Date.now();
    const fromDate = new Date(start);
    const toDate = new Date(end);
    if(fromDate > now && fromDate < toDate){
        return true;
    }
    console.log('Date Problem')
    return false;
}

const VALID_USERNAME = (username) => {
    if(userSchema.validate(username) && username.length > 0){
        return true;
    }
    return false;
}

const VALID_PASSWORD = (password) => {
    if(schema.validate(password)){
        return true
    }
    console.log('Invalid Password')
    return false;
}

module.exports = {
    VALID_STRING,
    VALID_LENGTH,
    VALID_PRICE,
    VALID_DATES,
    VALID_IMG,
    VALID_USERNAME,
    VALID_PASSWORD
}