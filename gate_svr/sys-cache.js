
const redisOper = require('./redis-oper');

var cached = {};

function saveServerInfo(type,serverList) {
    let jArray = JSON.parse(serverList);
    cached[type] = jArray;
}

// read servers info from redis
function readCached() {

    redisOper.readCachedServers(saveServerInfo);
}

function getServerList(type) {

    return cached[type];
}

setInterval(readCached, 60*1000);

exports.getServerList = getServerList;
exports.readCached = readCached;