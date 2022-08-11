const express = require('express');
const html = require("html-template-tag");
const {db, Log} = require('./db/index');
// db is a Sequelize object made in /db/index.js, the 'database' model, so to speak
// Log is the model (object) that represents the table logs in our database
// --> we use Log to communicate with the table in the database
// --> reference index.js to see how Log is structured

const app = express();

// we want express.static so that our app can reference other files using relative paths
// instead of absolute paths
app.use(express.static(__dirname + '/public'));
// express.urlencoded lets us parse html
app.use(express.urlencoded({ extended: false }));

// checks if we can establish a connection to the database
db.authenticate().then(() => {
    console.log('connected to database');
})

// function to start up the app...
const start = async () => {
    try {
        console.log('starting...');
        // force: false indicates that we will not re-create the database every time
        await db.sync({force: false});

        // app begins to listen on port 3000
        const PORT = 3000;
        app.listen(PORT, ()=> {
            console.log(`Listening on port: ${PORT}`);
        })
    } catch (err) {
        console.error(err);
    }
}

app.get('/', async (req, res, next) => {
    try {
        // the html form that we want to appear in the user's page
        // when they type in localhost:3000/
        const layout = html`
            <h2>Add Today's Log</h2>
            <hr>
            <form method="POST" action="/">
                <div>
                    <h3>How're you feeling:</h3>
                    <input type='radio' id='happy' value='happy' name='mood'>
                    <label for='happy'>Happy</label>
                    <input type='radio' id='sad' value='sad' name='mood'>
                    <label for='sad'>Sad</label>
                    <input type='radio' id='tired' value='tired' name='mood'>
                    <label for='tired'>Tired</label>
                    <input type='radio' id='angry' value='angry' name='mood'>
                    <label for='angry'>Angry</label>
                    <input type='radio' id='frustrated' value='frustrated' name='mood'>
                    <label for='frustrated'>Frustrated</label>
                    <input type='radio' id='confused' value='confused' name='mood'>
                    <label for='confused'>Confused</label>
                    <input type='radio' id='relieved' value='relieved' name='mood'>
                    <label for='relieved'>Relieved</label>
                    <input type='radio' id='meh' value='meh' name='mood'>
                    <label for='meh'>Meh...</label>
                    <input type='radio' id='unsure' value='unsure' name='mood'>
                    <label for='unsure'>Unsure</label>

                    <div>
                        <h3>What did you feel you learned today:</h3>
                        <input name='learned' type='text' placeholder='what did you learn?'>
                    </div>
                </div>
                <div>
                    <h3>What else do you want to share?</h3>
                    <textarea name='details' rows='10' cols='70'></textarea>
                </div>
                <div>
                    <button type="submit">submit your daily log</button>
                </div>
            </form>
        `
        res.send(layout);
    } catch(err) {
        next();
    }
})

app.post('/', async (req, res, next) => {
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

        res.redirect('/');
    } catch (err) {
        next();
    }
})

start();