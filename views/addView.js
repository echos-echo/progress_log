const html = require('html-template-tag');

// formatted html for our 'add a log' page, utilized by add.js
// includes all fields, the submit button, and an additional link to which you can
// go to the page that shows all our logs
module.exports = () => html`
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