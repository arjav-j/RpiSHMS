const express = require('express')

const router = express.Router()

var message = false;

router.get('/', (req,res) => {
    res.render('index')
})

router.get('/login', (req,res) => {
    res.render('login',{message})
})

router.get('/register', (req,res) => {
    res.render('register',{message})
})

router.get('/home', (req,res) => {
    res.render('home')
})

router.get('/test', (req,res) => {
    res.render('test')
})

module.exports = router;