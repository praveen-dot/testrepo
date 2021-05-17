<<<<<<< HEAD
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '982011764670-kdemg9tumtolcqgsdgjab45t4h4tb8u8.apps.googleusercontent.com';
const CLIENT_SECRET = 'yf-DA9UueDy2Q91vs4zNSTnY';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04SYMrqL4TNZVCgYIARAAGAQSNgF-L9IrVxdhmSWU0Dq8Kmod624oy12FTJdYNNqPzNavU5WFGVf73ub_OK9jCBmF7QtBK3hZ4g'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



//database connection pool
const pool = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Root.1234',
    database: 'demo',
})

// var smtpTransport = nodemailer.createTransport ( "SMTP" , {  

//     service: "Gmail",
//     auth: {
//       XOAuth2: {
//         user: "rgp.vicky@gmail.com@gmail.com" , // Your gmail address.
//                                               // Not @ developer.gserviceaccount.com 
//         clientId: "507462725293-8f4bdkn4dt7c2cu6a8vjdb98jrpd7d1r.apps.googleusercontent.com" ,
//         clientSecret: "gaPHfVFBgdYApoR35iSLzXZf" ,
//         refreshToken: "1//04dekGHim4MkrCgYIARAAGAQSNgF-L9IroV2bc7kYgC2A3ccCl3cvDJ8qyPwNUNaIaE9_lm8w8iRGqS4e--MSOYxoZPbjT9NA9A"
//       }
//     }
//   });

//  let transporter = nodemailer.createTransport({
//      host:'smtp.unimi.it',
//      port: '567',
//      secure:false,
//      auth: {
//         user: 'praveen.ramasamygunasekaran@studenti.unimi.it',
//         pass: ''
//      },
//      tls:{
//          rejectUnauthorized:false
//      }
//    });

pool.connect((err) => {
    if (err) throw err; // not connected!
    console.log('Connected as ID ');

})


exports.login = (req, res) => {
    res.render('login');
}


//index page get request
exports.view = (req, res) => {

    pool.query('SELECT * FROM employees', (err, rows) => {
        console.log("inside the get request")
        if (!err) {
            console.log('the data from the employees table: \n', rows);
            res.render('index', { rows })
        } else {
            console.log(err);
        }

    })
}

//index page post request
exports.index = (req, res) => {
    var username = req.body.name;
    var password = req.body.password;
    if (username == 'Admin' && password == 'pass') {
        // pool.connect((err,connection)=>{
        //     if(err) {
        //         console.log("error in connecting to db");
        //         throw err;
        //     }
        //     console.log('connected to DB ');
        // })
        pool.query('SELECT * FROM employees', (err, rows) => {
            if (!err) {
                console.log('the data from the employees table: \n', rows);
                res.render('index', { rows })
            } else {
                console.log(err);
            }

        })
    }
}
// else{
//     console.log('error login');
//     res.render('login', {
//         message: 'Invalid username or password',
//         messageClass: 'alert-danger'
//     });

//add user get request
exports.form = (req, res) => {
    console.log("red");
    res.render('adduser');
}

//add user post request
exports.create = (req, res) => {
    const { name, email, contact } = req.body;
    // const mailContent =
    // '<p>Your Crendentials are :</p>';

    pool.query('INSERT INTO employees SET name=?, email=?, contact=?', [name, email, contact], (err, rows) => {
        // var mailOptions = {
        //     from: '"BValue Credentials" <praveen.ramasamygunasekaran@studenti.unimi.it>',
        //     to: 'e' ,
        //     subject: 'Testing',
        //     text: 'Only test',
        //     html : mailContent
        //   };

        async function sendMail() {
            try {
                const accessToken = await oAuth2Client.getAccessToken()
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'rgp.vicky@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                })
                const mailcontent = `
                <p>Hi<br><br>Your Credentials are : <br></p>
                <ul>  
                  <li>Name: ${req.body.name}</li>
                  <li>pass: ${req.body.name}.${req.body.contact}</li>
                </ul>
                <p>Thanks<br>bValue</p>
              `;

                const mailOptions = {
                    from: '"BValue Credentials" <rgp.vicky@gmail.com>',
                    to: req.body.email,
                    subject: 'bValue Testing',
                    text: 'Testing',
                    html: mailcontent
                };
                console.log('receipient' + req.body.email)

                const result = await transport.sendMail(mailOptions)
                return result

            } catch (error) {
                return error
            }
        }
        sendMail().then(result => console.log('Email Sent', result))
            .catch((error) => console.log(error.message));
        if (!err) {
            console.log('the data from the employees table: \n', rows);
            res.render('adduser', { alert: 'User added successfully.' })
        } else {
            console.log(err);
        }

    })
}

//updating page get request
exports.edit = (req, res) => {
    pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edituser', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
}

// Update User
exports.update = (req, res) => {
    const { name, email, contact } = req.body;
    pool.query('UPDATE employees SET name=?, email=?, contact=? where id=?', [name, email, contact, req.params.id],
        (err, rows) => {
            if (!err) {

                pool.query('SELECT * FROM employees where id=?', [req.params.id], (err, rows) => {
                    if (!err) {
                        res.render('edituser', { rows, alert: `Details have been updated.` });
                    }
                    else {
                        console.log(err);
                    }
                    console.log('the data from user table: \n', rows);
                });

            }
        })

}

exports.delete = (req, res) => {
    pool.query('DELETE FROM employees where id==?', [req.params.id], (err, rows) => {
        if (!err) {
            pool.query('SELECT * FROM employees', (err, rows) => {
                console.log("inside the get request")
                if (!err) {
                    console.log('the data from the employees table: \n', rows);
                    res.render('index', { rows })
                } else {
                    console.log(err);
                }

            })
        }
        else {
            console.log(err);
        }
        console.log('The data  from table are :\n', rows);
    })

}

module.exports.pool = pool;

=======
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '982011764670-kdemg9tumtolcqgsdgjab45t4h4tb8u8.apps.googleusercontent.com';
const CLIENT_SECRET = 'yf-DA9UueDy2Q91vs4zNSTnY';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04SYMrqL4TNZVCgYIARAAGAQSNgF-L9IrVxdhmSWU0Dq8Kmod624oy12FTJdYNNqPzNavU5WFGVf73ub_OK9jCBmF7QtBK3hZ4g'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



//database connection pool
const pool = mysql.createConnection({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'Root.1234',
    database: 'demo',
})

// var smtpTransport = nodemailer.createTransport ( "SMTP" , {  

//     service: "Gmail",
//     auth: {
//       XOAuth2: {
//         user: "rgp.vicky@gmail.com@gmail.com" , // Your gmail address.
//                                               // Not @ developer.gserviceaccount.com 
//         clientId: "507462725293-8f4bdkn4dt7c2cu6a8vjdb98jrpd7d1r.apps.googleusercontent.com" ,
//         clientSecret: "gaPHfVFBgdYApoR35iSLzXZf" ,
//         refreshToken: "1//04dekGHim4MkrCgYIARAAGAQSNgF-L9IroV2bc7kYgC2A3ccCl3cvDJ8qyPwNUNaIaE9_lm8w8iRGqS4e--MSOYxoZPbjT9NA9A"
//       }
//     }
//   });

//  let transporter = nodemailer.createTransport({
//      host:'smtp.unimi.it',
//      port: '567',
//      secure:false,
//      auth: {
//         user: 'praveen.ramasamygunasekaran@studenti.unimi.it',
//         pass: 'Qwer4321.'
//      },
//      tls:{
//          rejectUnauthorized:false
//      }
//    });

pool.connect((err) => {
    if (err) throw err; // not connected!
    console.log('Connected as ID ');

})


exports.login = (req, res) => {
    res.render('login');
}


//index page get request
exports.view = (req, res) => {

    pool.query('SELECT * FROM employees', (err, rows) => {
        console.log("inside the get request")
        if (!err) {
            console.log('the data from the employees table: \n', rows);
            res.render('index', { rows })
        } else {
            console.log(err);
        }

    })
}

//index page post request
exports.index = (req, res) => {
    var username = req.body.name;
    var password = req.body.password;
    if (username == 'Admin' && password == 'pass') {
        // pool.connect((err,connection)=>{
        //     if(err) {
        //         console.log("error in connecting to db");
        //         throw err;
        //     }
        //     console.log('connected to DB ');
        // })
        pool.query('SELECT * FROM employees', (err, rows) => {
            if (!err) {
                console.log('the data from the employees table: \n', rows);
                res.render('index', { rows })
            } else {
                console.log(err);
            }

        })
    }
}
// else{
//     console.log('error login');
//     res.render('login', {
//         message: 'Invalid username or password',
//         messageClass: 'alert-danger'
//     });

//add user get request
exports.form = (req, res) => {
    console.log("red");
    res.render('adduser');
}

//add user post request
exports.create = (req, res) => {
    const { name, email, contact } = req.body;
    // const mailContent =
    // '<p>Your Crendentials are :</p>';

    pool.query('INSERT INTO employees SET name=?, email=?, contact=?', [name, email, contact], (err, rows) => {
        // var mailOptions = {
        //     from: '"BValue Credentials" <praveen.ramasamygunasekaran@studenti.unimi.it>',
        //     to: 'e' ,
        //     subject: 'Testing',
        //     text: 'Only test',
        //     html : mailContent
        //   };

        async function sendMail() {
            try {
                const accessToken = await oAuth2Client.getAccessToken()
                const transport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: 'rgp.vicky@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken
                    }
                })
                const mailcontent = `
                <p>Hi<br><br>Your Credentials are : <br></p>
                <ul>  
                  <li>Name: ${req.body.name}</li>
                  <li>pass: ${req.body.name}.${req.body.contact}</li>
                </ul>
                <p>Thanks<br>bValue</p>
              `;
            
                const mailOptions = {
                    from: '"BValue Credentials" <rgp.vicky@gmail.com>',
                    to: req.body.email,
                    subject: 'bValue Testing',
                    text: 'Testing',
                    html: mailcontent
                };
                console.log('receipient'+ req.body.email)

                const result = await transport.sendMail(mailOptions)
                return result

            } catch (error) {
                return error
            }
        }
        sendMail().then(result => console.log('Email Sent', result))
            .catch((error) => console.log(error.message));
        if (!err) {
            console.log('the data from the employees table: \n', rows);
            res.render('adduser', { alert: 'User added successfully.' })
        } else {
            console.log(err);
        }

    })
}

//updating page get request
exports.edit = (req, res) => {
    pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('edituser', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });
}

// Update User
exports.update = (req, res) => {
    const { name, email, contact } = req.body;
    pool.query('UPDATE employees SET name=?, email=?, contact=? where id=?', [name, email, contact, req.params.id],
        (err, rows) => {
            if (!err) {

                pool.query('SELECT * FROM employees where id=?', [req.params.id], (err, rows) => {
                    if (!err) {
                        res.render('edituser', { rows, alert: `Details have been updated.` });
                    }
                    else {
                        console.log(err);
                    }
                    console.log('the data from user table: \n', rows);
                });

            }
        })

}

exports.delete = (req, res) => {
    pool.query('DELETE FROM employees where id==?', [req.params.id], (err, rows) => {
        if (!err) {
            pool.query('SELECT * FROM employees', (err, rows) => {
                console.log("inside the get request")
                if (!err) {
                    console.log('the data from the employees table: \n', rows);
                    res.render('index', { rows })
                } else {
                    console.log(err);
                }

            })
        }
        else {
            console.log(err);
        }
        console.log('The data  from table are :\n', rows);
    })

}

module.exports.pool = pool;

>>>>>>> 530654bee35f80307285cfec45806df05c06a49d
