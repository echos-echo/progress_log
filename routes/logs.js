const logsRouter = require('express').Router();
const {Log} = require('../db');

// the view that formats our html, so we don't have to write it here!
const logsView = require('../views/logsView');

// handles the loading of all logs from the database onto localhost:3000/logs
logsRouter.get('/', async(req, res, next) => {
    try {
        // this will fetch all rows of data in our logs
        // { order: [['updatedAt', 'DESC']]}
        // this specifies that we will order it by the time it was updated, in descending order
        // so the most recent submission will be at the top of the page
        const logs = await Log.findAll({ order: [['updatedAt', 'DESC']]});
        // note: logs is a Promise object, but its the type of its value will ultimately be an array whenever we use it

        // logsView takes in our logs as an argument, and returns a string of
        // formatted html that uses data from logs
        // and then sends all that to res
        res.send(logsView(logs));
    } catch (err) {
        next();
    }
})

// will fire this method when user clicks the button to delete a specific log
logsRouter.post('/', async (req, res, next) => {
    try {
        // /logs also gets the log id and saves it to a button
        const id = req.body.id;

        // .destroy() takes an object that handles SQL queries, as below
        // there are many other queries it can handle, so please check the documentation for .destroy() in your own time
        await Log.destroy({
            where: {
                id: id
            }
        });

        // after deleting the log, it will show the updated page without the log you just deleted :)
        res.redirect('./logs');
    } catch (err) {
        // here, it will redirect back to the current logs page if the delete fails,
        // but nothing will be changed
        next(res.redirect('./logs'));
    }
})

module.exports = logsRouter;