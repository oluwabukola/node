const config = require('config');
const startupDebugger = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

app.set('view engine', 'pug');

//Configuration
const pswd = config.get('mail.password');
console.log(pswd);
// console.log ("application name:" +  config.get("name"));
// console.log ("mail server:" +  config.get("mail.host"));
// console.log ("mail password:" +  config.get("mail.password"));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled..'); // console.log()
}

const port = process.env.PORT || 3000;
    app.listen(3000, () => {
        console.log(`listening on port  ${port}...`);
    });





