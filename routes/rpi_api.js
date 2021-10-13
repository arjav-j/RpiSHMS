const express = require('express')
const apiCon = require('../controllers/Rpi_apiCon');
const { route } = require('./auth');

const router = express.Router()

// TODO: Route API requests to API controller


router.post('/input', apiCon.rpiInp);

router.post('/auth', apiCon.rpiAuth);

router.post('/test', apiCon.rpiTest);

module.exports = router;