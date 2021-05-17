<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const userController = require('../controllers/userController');

// router.get('/',(req,res)=>{
//     res.render('login');
// }
// )
//validating the user name and password and moving to the next page
// router.post('/index',(req,res)=>{
//     var username =req.body.name;
//     var password = req.body.password;
//     if(username=='Admin' && password =='pass'){
//         userController.pool.connect((err)=>{
//             if(err) {
//                 console.log("error in connecting to db");
//                 throw err;
//             }
//             console.log('connected to DB ');

//         }) 
//         userController.pool.query('SELECT * FROM employees',(err,rows)=>{
//             if(!err){
//                 console.log('the data from the employees table: \n',rows);
//               res.render('index',{ rows })  
//             }else{
//                 console.log(err);
//             }

//         })
//     }
//     else{
//         console.log('error login');
//         res.render('login', {
//             message: 'Invalid username or password',
//             messageClass: 'alert-danger'
//         });
//     }

//     }

// )

router.get('/', userController.login);
router.post('/index', userController.index);
router.get('/index', userController.view);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/:id', userController.delete);
// router.get('/:id',userController.delete);
=======
const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const userController = require('../controllers/userController');

// router.get('/',(req,res)=>{
//     res.render('login');
// }
// )
//validating the user name and password and moving to the next page
// router.post('/index',(req,res)=>{
//     var username =req.body.name;
//     var password = req.body.password;
//     if(username=='Admin' && password =='pass'){
//         userController.pool.connect((err)=>{
//             if(err) {
//                 console.log("error in connecting to db");
//                 throw err;
//             }
//             console.log('connected to DB ');

//         }) 
//         userController.pool.query('SELECT * FROM employees',(err,rows)=>{
//             if(!err){
//                 console.log('the data from the employees table: \n',rows);
//               res.render('index',{ rows })  
//             }else{
//                 console.log(err);
//             }

//         })
//     }
//     else{
//         console.log('error login');
//         res.render('login', {
//             message: 'Invalid username or password',
//             messageClass: 'alert-danger'
//         });
//     }

//     }

// )

router.get('/', userController.login);
router.post('/index', userController.index);
router.get('/index', userController.view);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/:id', userController.delete);
// router.get('/:id',userController.delete);
>>>>>>> 530654bee35f80307285cfec45806df05c06a49d
module.exports = router;