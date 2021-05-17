<<<<<<< HEAD
const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config;
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//templating engine
app.engine('hbs',exphbs({extname: '.hbs'}));
app.set('view engine','hbs');

//declaring the port
const port = process.env.PORT || 3000;

const routes = require ('./server/routes/user');
app.use('/',routes);

// //database connection pool
// const pool=mysql.createConnection({
//     connectionLimit :100,
//     host    : 'localhost',
//     user    : 'root',
//     password: 'Root.1234',
//     database:  'demo',
// })



app.listen(port,()=>console.log('Listening to port '+ port ));

=======
const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config;
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//templating engine
app.engine('hbs',exphbs({extname: '.hbs'}));
app.set('view engine','hbs');

//declaring the port
const port = process.env.PORT || 3000;

const routes = require ('./server/routes/user');
app.use('/',routes);

// //database connection pool
// const pool=mysql.createConnection({
//     connectionLimit :100,
//     host    : 'localhost',
//     user    : 'root',
//     password: 'Root.1234',
//     database:  'demo',
// })



app.listen(port,()=>console.log('Listening to port '+ port ));

>>>>>>> 530654bee35f80307285cfec45806df05c06a49d
