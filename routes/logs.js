const logsRouter = require('express').Router();
const {Log} = require('../db');

// the view that formats our html, so we don't have to write it here!
const logsView = require('../views/logsView');

logsRouter.get('/', async(req, res, next) => {
    try {
        // this statement should appear in your console when localhost:3000/logs loads
        console.log('this page is where you can see all current logs in your database');

        // this will fetch all rows of data in our logs
        // { order: [['updatedAt', 'DESC']]}
        // this specifies that we will order it by the time it was updated, in descending order
        // so the most recent submission will be at the top of the page
        const logs = await Log.findAll({ order: [['updatedAt', 'DESC']]});

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
        res.redirect('/logs');
    } catch (err) {
        next();
    }
})

module.exports = logsRouter;