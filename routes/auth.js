const authController = require('../controller/authController');
const router = require('express').Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/refresh-token', authController.requestRefreshToken);

router.post('/logout', authController.logoutUser);

module.exports = router;