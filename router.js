const express = require('express');
const router = express.Router();

router.use('/user/', require('./routes/user'));

module.exports = router;