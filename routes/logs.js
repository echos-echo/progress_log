const logsRouter = require('express').Router();
const html = require('html-template-tag');
const {Log} = require('../db');

logsRouter.get('/', async(req, res, next) => {
    try {
        // this statement should appear in your console when localhost:3000/logs loads
        console.log('this page is where you can see all current logs in your database');

        // this will fetch all rows of data in our logs
        // { order: [['updatedAt', 'DESC']]}
        // this specifies that we will order it by the time it was updated, in descending order
        // so the most recent submission will be at the top of the page
        const logs = await Log.findAll({ order: [['updatedAt', 'DESC']]});

        const logLayout = html`
            <html>
                <head>
                    <title>Your Daily Logs</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h1>Logs you have made will appear here in chronological order</h1>
                    <a href='../add'>Click here to add a new log</a>
                    <hr>
                    <div>
                        ${
                            logs.map(each => {
                                return html`
                                <h2>${each.learned}</h2>
                                <h4>Posted on ${each.createdAt}</h4>
                                <p>${each.details}</p>
                                <h4>Mood for the Day: ${each.mood}</h4>
                                <form method='POST' action='/logs'>
                                    <button name='id' value='${each.id}'>Delete this log</button>
                                </form>
                                <hr>
                                `
                            })
                        }
                    </div>
                </body>
            </html>
        `
        res.send(logLayout);
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

module.exports = logsRouter;;