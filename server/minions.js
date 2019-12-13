const express = require('express');
const minionsRouter = express.Router();

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMin = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMin);

});

minionsRouter.post('/', (req, res, next) => {
    const newMin = addToDatabase('minions', req.body);
    res.status(201).send(newMin);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const delMin = deleteFromDatabasebyId('minions', req.minion.id);
    if (delMin === true) {
        res.status(204).send();
    }
    res.status(404).send();
});

module.exports = minionsRouter;