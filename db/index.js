const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/progress');

// creates a table that logs the user's mood, what they learned, and any other details
const Log = db.define('log', {
    mood: {
        // ENUM stands for enumerable; basically, you can only enter the predetermined values between the parenthesis
        // for this column field. Check documentation for Sequelize.ENUM for further details
        type: Sequelize.ENUM(
            'happy', 'sad', 'tired', 'angry', 'frustrated',
            'confused', 'relieved', 'meh', 'unsure'),
        allowNull: false
    },
    learned: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING
    }
})

module.exports = {db, Log};