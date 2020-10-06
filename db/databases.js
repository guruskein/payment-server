const dataBase = require('mysql');
var connection = null


connection = dataBase.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "institution_payment"
});
connection.connect((err) => {
    (err) ? console.log("Error:**DB Connection error**", err) : console.log("Info:**DB Connection Successful**");
});

module.exports = connection;