# progress_log
a short project I worked on from scratch to practice express, routers, and sequelize

<h1>Progress Log; tracking your progress for no one but yourself</h1>
<hr>
<h2>Setting Up</h2>
<p>In order to run, please first install <code>express, html-template-tag, nodemon, pg, and sequelize</code>
using the node package manager<br>i.e - <code>npm install express html-template-tag nodemon pg sequelize</code></p>
<p>A script running nodemon is already provided in <code>package.json</code>, so feel free to run using <code>npm start</code><p>
<h3>*IMPORTANT: BEFORE RUNNING</h3>
<p>You MUST create a database named <code>progress</code> on your machine, or else the code will crash as it is will not be able to find or recognize any database/tables</p>
<p>Please make sure you have postgresql set up according to your machine, and then either <code>createdb progress</code> from your command line or <code>psql</code>
into your psql command line in order to <code>CREATE DATABASE progress</code></p>
<p>Now you can <code>npm start</code> to run it all!
<h2>Using this Program</h2>
<p>Currently, this code is set up to send data to your browser at <a href='http://localhost:3000'>http://localhost:3000</a>, but feel free to modify the code to suit any port number you wish</p>
<p>There is also no styling; do not worry about the lack of styling. This is meant purely for JavaScript practice. I intentionally did not add any styles</p>
<p>Once you open it up on your localhost, it will send you to a page that is empty save for one header; that is expected!<br>
Follow the link at the top in order to go to the page where you may add a log<br>
The purpose of this mini application is for you to select a mood (based on how you feel from the day's contents), what you felt like you learned, and any other details you'd like to include (notable things, what you ate for lunch, any distractions, etc)<br>
It is meant to be a 'journal' of sorts, mainly for you to keep track of your learning progress. At the end of whichever goal you expect to reach, you can look back on this log and really take in how much you improved!</p>
<hr>
<p>I left many comments all over the code because this program was solely meant for me to practice, but I wanted to make this code available and readable for classmates who may be struggling with these concepts</p>
<p>Hopefully reading the code has helped you understand sequelize and express a bit better, even if you never use this app!</p>
