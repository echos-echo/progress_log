const html = require('html-template-tag');

// formatted html for our 'all logs' page
// we don't need the Log model from db here because we already have our logs data passed in when the function is called
// this data is retrieved before this function in logs.js
module.exports = (logs) => html`
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