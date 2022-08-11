const express = require('express');
const html = require("html-template-tag");
const {db, Log} = require('./db');
// db is a Sequelize object made in /db/index.js, the 'database' model, so to speak
// Log is the model (object) that represents the table logs in our database
// --> we use Log to communicate with the table in the database
// --> reference index.js to see how Log is structured

const addRouter = require('./routes/add');
const logsRouter = require('./routes/logs');

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

// function to start up the app... and also connect to the database!!!
const start = async () => {
    try {
        console.log('starting...');
        // force: false indicates that we will not re-create the database every time
        await db.sync({force: false});

        // app begins to listen on port 3000
        const PORT = 3000;
        app.listen(PORT, ()=> {
            console.log(`Listening on port: ${PORT}`);
            console.log(`Your site is available at http://localhost:${PORT}`);
        })
    } catch (err) {
        console.error(err);
    }
}

// !! FROM HERE ON, THESE ARE THE ROUTES FOR SPECIFIC PAGES !!
// PLEASE REFER TO THE CODE/COMMENTS ON THE FILES CORRESPONDING TO THE ROUTER NAMES!!

// the root page, but will redirect to another page...
app.get('/', async (req, res, next) => {
    res.redirect('/logs');
})

// will load up a page where the user can log a daily entry
app.use('/add', addRouter);

// will load up a page where the user can see all their past logs
app.use('/logs', logsRouter)


// engines starting, start our app!!
start();