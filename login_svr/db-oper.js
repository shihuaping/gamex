
const mysql = require('mysql');


function getConnection() {
    mysql.createPool()
}

function login(userInfo) {

    var sql = `select * from user_base where account='${userInfo.account}' and password='${userInfo.password}';`;
    const sqlConn = getConnection();

    sqlConn.query
}