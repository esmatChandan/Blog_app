const express = require('express');
//const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const jwt_verify = require('../controller/authentication');
const { userlogin, register, getall, logoutUser } = require('../controller/auth_controller');


router.get('/users', getall);
router.post('/register', register);
router.post('/user_login', userlogin);
router.post('/user_logout', logoutUser);
router.post('/auth', jwt_verify);


// router.get('/users', async (req, res) => {
//     try {
//       const users = await User.find();
//       res.status(200).send(users);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });

module.exports = router;
