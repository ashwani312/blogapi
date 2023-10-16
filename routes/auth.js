const router = require('express').Router();
const { registerTheUser, loginTheUser } = require('../controllers/authController');


//register route
router.post('/register', registerTheUser)

//login route
router.post('/login', loginTheUser)

module.exports = router