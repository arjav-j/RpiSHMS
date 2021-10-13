const db = require('../conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config({path: '../.env'})

const addUser = async (req,res,user) => {

    const salt = bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(user.password, 8);

    const name = user.name,
        email = user.email,
        password = hashedPass,
        is_locked = false,
        role = 'user';

    db.query('INSERT INTO users SET ?',{ name, email, password, is_locked, role}, (error, results) => {
        if (error) { console.log(error); return; }
        res.render('login', {message : "user registered, login to continue"});
        return;
    })
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

exports.register = (req,res) => {
    
    const user = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [user.email], (error, results) => {
        if (error) { console.log(error); return; }

        if (results.length > 0) {
            res.render('register', {message : "Email already in use"});
            return;
        } else if (user.password != user.passwordconfirm) {
            res.render('register', {message : "Passwords do not match"});
            return;
        } else {
            addUser(req,res,user)
        }
    })

}


exports.login = async (req,res) => {
    const user = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [user.email], (error, results) => {
            
        if (error) { console.log(error); return; }
        
        let pass = bcrypt.compare(user.password, results[0].password)
        
        if(!results || !pass){
            res.status(401).render('login',{message: 'Email and password dont match'})
            console.log(hashedPass,'\n',results[0].password)
            return;
        } else {
            console.log('logged in')
            const token = createToken(results[0].uid);
            res.cookie('jwt', token, { httpOnly: true})
            res.cookie('test_cookie', 'output for test cookie')
            res.redirect('/home');
        }
    })
}

exports.logout = (req,res) => {
    console.log('logged out')
    
    // TO DO : Destroy session / Token
    res.clearCookie("jwt");
    
    res.redirect('/')
}