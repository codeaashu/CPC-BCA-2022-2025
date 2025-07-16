const express = require('express');
const router = express.Router();

const { loginUser, signupUser } = require('../controllers/authController'); // ✅ must match exports

router.post('/signup', signupUser); // ✅ handler must be a real function
router.post('/login', loginUser);

module.exports = router;
