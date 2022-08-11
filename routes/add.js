const addRouter = require('express').Router();
const html = require('html-template-tag');
const {Log} = require('../db');

addRouter.get('/', async (req, res, next) => {
    try {
        // this statement should appear in your console when you load localhost:3000/add
        console.log('this page is where you can add a daily log to your database');
        // the html form that we want to appear in the user's page
        // when they type in localhost:3000/
        const layout = html`
            <html>
                <head>
                    <title>Add Your Daily Log</title>
                    <meta charset="UTF-8">
                </head>
                <body>
                    <h2>Add Today's Log</h2>
                    <a href='../logs'>Click here if you'd like to see your past logs :)</a>
                    <hr>
                    <form method="POST" action="/add">
                        <div>
                            <h3>*How're you feeling:</h3>
                            <div><input type='radio' id='happy' value='happy' name='mood'>
                            <label for='happy'>Happy</label></div>
                            <div><input type='radio' id='sad' value='sad' name='mood'>
                            <label for='sad'>Sad</label></div>
                            <div><input type='radio' id='tired' value='tired' name='mood'>
                            <label for='tired'>Tired</label></div>
                            <div><input type='radio' id='angry' value='angry' name='mood'>
                            <label for='angry'>Angry</label></div>
                            <div><input type='radio' id='frustrated' value='frustrated' name='mood'>
                            <label for='frustrated'>Frustrated</label></div>
                            <div><input type='radio' id='confused' value='confused' name='mood'>
                            <label for='confused'>Confused</label></div>
                            <div><input type='radio' id='relieved' value='relieved' name='mood'>
                            <label for='relieved'>Relieved</label></div>
                            <div><input type='radio' id='meh' value='meh' name='mood'>
                            <label for='meh'>Meh...</label></div>
                            <div><input type='radio' id='unsure' value='unsure' name='mood'>
                            <label for='unsure'>Unsure</label></div>

                            <div>
                                <h3>*What did you feel you learned today:</h3>
                                <input name='learned' type='text' placeholder='what did you learn?'>
                            </div>
                        </div>
                        <div>
                            <h3>What else do you want to share? (optional!)</h3>
                            <textarea name='details' rows='10' cols='70'></textarea>
                        </div>
                        <div>
                            <button type="submit">submit your daily log</button>
                        </div>
                    </form>
                </body>
            </html>
        `
        res.send(layout);
    } catch(err) {
        next();
    }
})


// will fire this method when user click submit on the log form above ^
addRouter.post('/', async (req, res, next) => {
    try {
        // grabs these fields from the form in the html body
        const mood = req.body.mood;
        const learned = req.body.learned;
        const details = req.body.details;

        // inserts the data into our model Log
        const submitLog = await Log.create({
            // note, the order of the keys in this object do not have to be the exact same
            // as how the columns are defined in the table.
            // as long as the key matches to some column, sequelize will handle which column the data goes
            mood: mood,
            details: details,
            learned: learned,
        })

        // redirects to page localhost:3000/logs
        res.redirect('../logs');
    } catch (err) {
        console.log('Could not enter data: Please enter all necessary fields');
        next(res.redirect('/'));
    }
})

module.exports = addRouter;