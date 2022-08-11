const addRouter = require('express').Router();
const {Log} = require('../db');

// the view that formats our html, so we don't have to write it here!
const addView = require('../views/addView');

addRouter.get('/', async (req, res, next) => {
    try {
        // this statement should appear in your console when you load localhost:3000/add
        console.log('this page is where you can add a daily log to your database');
        // the html form that we want to appear in the user's page
        // when they type in localhost:3000/

        // addView is a function that returns our formatted html
        // it takes no arguments because we are not trying to send variables to our page
        res.send(addView());
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