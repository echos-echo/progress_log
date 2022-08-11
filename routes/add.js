const addRouter = require('express').Router();
const {Log} = require('../db');

// the view that formats our html, so we don't have to write it here!
const addView = require('../views/addView');

// handles the loading of the add page at localhost:3000/add
addRouter.get('/', async (req, res, next) => {
    try {
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
        res.redirect('./logs');
    } catch (err) {
        // nothing will show in the browser, but this will appear in your console
        // if you did not fill out all the necessary fields
        console.log('Could not enter data: Please enter all necessary fields');
        // and then redirects back to the add page so you can try again
        next(res.redirect('/'));
    }
})

module.exports = addRouter;