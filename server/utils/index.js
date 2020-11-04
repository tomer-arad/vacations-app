const handleError = (err, res) => {
    console.error(err.message);
    res.status(400).send({msg: 'Error'});
}

module.exports = {
    handleError,
}