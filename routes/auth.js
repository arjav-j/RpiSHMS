const express = require('express')
const authController = require('../controllers/authCon')

const router = express.Router()

router.post('/login', authController.login )

router.post('/register', authController.register )

router.get('/logout', authController.logout)

module.exports = router;