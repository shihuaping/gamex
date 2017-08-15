
const sysConfig = require('./config/sys-config.json');
const redis = require('redis');
const redisKey = require('../lib/rds-key');

var host = sysConfig.redisHost;
var port = sysConfig.redisPort;
var password = sysConfig.redisPassword;

function readCachedServers(cb) {
    var rds = null;
    if (!!password && password.length > 0) {
        rds = redis.createClient({host:host,port:port,password:password});
    } else {
        rds = redis.createClient({host:host,port:port});
    }

    for (let v of redisKey.SERVER_TYPE_LIST) {
        let key = redisKey.KEY_SERVER_TYPE + v;
        rds.get(key, function (error,reply) {
            cb (v, reply);
        });
    }
}

exports.readCachedServers = readCachedServers;