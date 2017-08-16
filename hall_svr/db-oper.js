const mysql = require('mysql');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');


var pool = null;

function getPool() {
    pool = mysql.createPool(
        {
            connectionLimit: 50,
            host: sysConfig.mysqlHost,
            port: sysConfig.mysqlPort,
            user: sysConfig.mysqlUsername,
            password: sysConfig.mysqlPassword,
            database: 'gamedb'
        }
    );
}

getPool();

function getGameList() {
    return new Promise(function (resolve, reject) {
        try {
            //avoid sql injection
            let sql = 'select * from game_list';
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

exports.getGameList = getGameList;

