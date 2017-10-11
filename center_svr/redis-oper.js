
//
// 将服务信息保存在redis中，如果服务比较多，会造成冲突。每5秒一次心跳，极端情况下可能有服务永远注册不上。
// 仅有几个服务甚至十几个服务可以忽略上面的问题。有几十个服务就不要使用这种方式了，应该用rpc。
//

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

//保存服务信息
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
            // get a usefull id, TODO cocurrency problem
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
            rds.set(keyName, json, 60*1000);
        }

    });
}

//查询可用服务列表
function getServerList(type) {

    return new Promise(function (resolve, reject) {
        let keyName = rdsKey.KEY_SERVER_TYPE + type;
        rds.get(keyName, function (err, reply) {
            if (err) {
                reject(err);
                return;
            }
            resolve(reply);
        })
    });
}

//移除掉线的服务
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
    rds.set(keyName, json, 60*1000);
}

exports.getServerList = getServerList;
exports.saveServer = saveServer;
exports.removeServer = removeServer;