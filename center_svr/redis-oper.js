const sysConfig = require('./config/sys-config.json');
const redis = require('redis');
const rdsKey = require('../lib/rds-key');
const logger = require('./logger');

const host = sysConfig.redisHost;
const port = sysConfig.redisPort;
const password = sysConfig.redisPassword;
let rds = null;

function getConnection() {

    if (rds) return rds;

    if (!!password && password.length > 0) {
        rds = redis.createClient({host: host, port: port, password: password});
    } else {
        rds = redis.createClient({host: host, port: port});
    }
    return rds;
}

getConnection();

function saveServer(serverInfo) {

    let keyName = rdsKey.KEY_SERVER_TYPE + serverInfo.type;

    rds.get(keyName, function (err, reply) {
        if (err) {
            logger.error(err);
            return;
        }

        jArray = JSON.parse(reply);

        if (!jArray) {
            jArray = [];
        }

        let serverIDList = [];
        for (let v of jArray) {
            serverIDList.push(v.serverNo);
        }

        serverIDList.sort(function (a,b) {
            if(a<b) return -1;
            else if(a===b) return 0;
            else return 1;
        });

        let serverId = 1;
        let prevID = 0;
        let count = 0;
        for(let v in serverIDList) {
            prevID = v;
            count++;
            if(count === 1) {
                serverId = prevID;
                continue;
            }
            // get a usefull id
            if(Math.abs(v-prevID) > 1) {
                serverId = prevID + 1;
                break;
            }
        }

        // set server number
        if(maxServerId > 1000) {
            maxServerId = 1;
        }
        serverInfo.serverNo = maxServerId + 1;


        let found = false;
        for (let v of jArray) {
            if (v.ip === serverInfo.ip) {
                // do nothing
                found = true;
                break;
            }
        }

        if (!found) {
            jArray.push(serverInfo);
            let json = JSON.stringify(jArray);
            rds.set(keyName, json);
        }

    });
}

function getServerList(type) {

    return new Promise(function (resolve, reject) {
        let keyName = rdsKey.KEY_SERVER_TYPE + serverInfo.type;
        rds.get(keyName, function (err, reply) {
            if (err) {
                reject(err);
                return;
            }
            resolve(reply);
        })
    });
}

async function removeServer(serverInfo) {
    let serverList = await getServerList(serverInfo.type);
    let jArray = JSON.parse(serverList);
    let idx = 0;
    for (let v of jArray) {
        if (v.ip === serverInfo.ip) {
            delete jArray[idx];
            break;
        }
        idx++;
    }
    let keyName = rdsKey.KEY_SERVER_TYPE + serverInfo.type;
    let json = JSON.stringify(jArray);
    rds.set(keyName, json);
}

exports.getServerList = getServerList;
exports.saveServer = saveServer;
exports.removeServer = removeServer;