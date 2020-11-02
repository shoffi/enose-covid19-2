const mysql = require('mysql');

let connection = mysql.createConnection({
    host    :   "34.101.214.113",
    user    :   "raspi",
    password:   "raspberry",
    database:   "sensor"
})

connection.connect(function (err) {
    console.log(err)
})

connection.query("SELECT * FROM data", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});