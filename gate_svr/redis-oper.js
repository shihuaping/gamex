
const sysConfig = require('./config/sys-config.json');
const redis = require('redis');
//const redisPool = require('redis-pool-connection');

var host = sysConfig.redisHost;
var port = sysConfig.redisPort;
var password = sysConfig.redisPassword;

function readCachedServers() {
    var rds = null;
    if (!!password && password.length > 0) {
        rds = redis.createClient({host:host,port:port,password:password});
    } else {
        rds = redis.createClient({host:host,port:port});
    }

    conn.hget
}

