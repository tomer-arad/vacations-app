const express = require('express');
const router = express.Router();
const { handleError } = require('../utils');
const { validVacation } = require('../middleware/vacationsValidation')
const { allVacations, addVacation, updateVacation, deleteVacation } = require('../services/vacations-service');

// @route       GET /vacations
// @desc        Get all vacations
router.get('/', async(req, res) => {
    try{
        const [results] = await allVacations();
        res.json(results);
    } catch(err) {
        handleError(err, res);
    }
});

// @route       POST /vacations
// @desc        Add new vaction
router.post('/', validVacation, async(req, res) => {
    const data = req.body;
    try{
        await addVacation(data);
        res.json({ msg: 'Trip Added :)' })
    } catch(err) {
        handleError(err, res);
    }
});

// @route       PATCH /vacations
// @desc        Update Selected vacation
router.patch('/:id', validVacation, async(req, res) => {
    const { id } = req.params;
    const data = req.body;
    try{
        await updateVacation(id, data);
        res.json({ msg: `Trip ${id} Updated :)` })
    } catch(err) {
        handleError(err, res);
    }
});

// @route       DELETE /vacations
// @desc        Delete Selected vacation
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        await deleteVacation(id);
        res.json({ msg: `Trip ${id} Deleted!` })
    } catch(err) {
        handleError(err, res);
    }
});

module.exports = router;