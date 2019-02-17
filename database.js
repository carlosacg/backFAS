const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'db4free.net',
    user: 'un1v4ll3uv',
    password: 'un1v4ll3uv',
    port: 3306,
    database: 'fas_db'
})

mysqlConnection.connect(function (err) {
    if (err) {
        console.log();
        return;
    } else {
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;
