const { VALID_STRING, VALID_LENGTH, VALID_PRICE, VALID_DATES, VALID_IMG } = require('./index')

const validVacation = (req, res, next) => {
    const { country, destination, description, starts, ends, price, image } = req.body;
    let error;
    if (!VALID_STRING(country) || !VALID_STRING(destination)){
        error = new Error('String Problem');
        return res.status(400).json(error.message);
    } 
    if(!VALID_LENGTH(description)){
        error = new Error('Array Problem');
        return res.status(400).json(error.message);
    }
    if(!VALID_DATES(starts, ends)){
        error = new Error('Date Problem');
        return res.status(400).json(error.message);
    }
    if(!VALID_PRICE(price)) {
        error = new Error('Price Problem');
        return res.status(400).json(error.message);
    }
    if(!VALID_IMG(image)){
        error = new Error('URL Problem');
        return res.status(400).json(error.message);
    }
    return next();
}

module.exports = {
    validVacation,
}