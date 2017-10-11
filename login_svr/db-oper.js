const mysql = require('mysql');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');


var pool = null;

function getPool() {
    pool = mysql.createPool(
        {
            connectionLimit: 50,  //TODO config in file
            host: sysConfig.mysqlHost,
            port: sysConfig.mysqlPort,
            user: sysConfig.mysqlUsername,
            password: sysConfig.mysqlPassword,
            database: 'userdb'
        }
    );
}

getPool();

function login(userInfo) {
    return new Promise(function (resolve, reject) {
        try {
            //avoid sql injection
            let sql = 'select * from user_base where account=' + mysql.escape(userInfo.account) +
                ' and password=' + mysql.escape(userInfo.password);
            console.log(sql);

            pool.getConnection(function (err, conn) {
                conn.query(sql, function (err, results, fields) {

                    conn.release();
                    if (err) {
                        throw  err;
                    }

                    resolve(results);
                });
            });

        } catch (ex) {
            logger.error(ex);
            reject(ex);
        }
    });

}

function register(userInfo) {

    return new Promise(function (resolve, reject) {
        try {
            let sql = 'insert into user_base(accuounts, password) values(' +
                mysq.escape(userInfo.accounts) + ',' + mysq.escape(userInfo.password) + ')';

            console.log(sql);

            pool.getConnection(function (err, conn) {
                conn.query(sql, function (err, results, fields) {
                    conn.release();
                    if(err) {
                        throw  ex;
                    }

                    resolve(results);
                })
            })
        } catch (ex) {
            logger.error(ex);
            reject(ex);
        }
    });

}

exports.login = login;
exports.register = register;

