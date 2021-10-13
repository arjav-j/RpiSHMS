//const db = require('../conn');
const db = require('../TestCon');
require('dotenv').config({path: '../.env'})

exports.rpiTest = (req,res) => {
    var name = req.body.name;
    var age = req.body.age;
    var test_js = JSON.stringify(req.body);

    db.query('INSERT INTO sample SET ?',{name,age, test_js}, (error, results) => {
        if (error) { console.log(error); return; }
        res.send(results);
        return;
    })
}

exports.rpiAuth = (req,res) => {
    //body
}

exports.rpiInp = (req,res) => {
    //body
}