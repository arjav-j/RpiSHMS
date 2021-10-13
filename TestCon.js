const mysql = require('mysql')
require('dotenv').config({path: "./.env"})

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "test",
})

db.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Test DB connected');
    }
})

module.exports = db;