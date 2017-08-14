

const net = require('net');
const sysConfig = require('./config/sys-config.json');
const serverHandler = require('./server-handler');
const logger = require('./logger');
const shortID = require('./short-ID');

function getNewConnection(port,host) {

    if (!port) port = sysConfig.centerSvrPort;
    if (!host) host = sysConfig.centerSvrHost;

    var conn = net.createConnection({port:port,host:host}, function () {
        const psudoID = shortID.getNextID();
        conn.psudoID = psudoID;
        conn.ip = host;

        logger.info("connect to server,ip:%s,port:%d", host, port);
        serverHandler.onConnect(psudoID, conn);
    });

    conn.on('end', function () {

        logger.info("server connection closed,fd:%d,ip:%s", conn.psudoID, conn.ip);
        serverHandler.onClose(conn);
    });

    conn.on('error', function (err) {

        logger.info("server connection error,fd:%d,ip:%s", conn.psudoID, conn.ip);
        logger.error(conn,err);
        serverHandler.onError(conn);
    });

    conn.on('data', function (data) {
        console.log("server fd:%d get data:%s", conn.psudoID, data);
        serverHandler.onData(data);
    });

};

exports.getNewConnection = getNewConnection;