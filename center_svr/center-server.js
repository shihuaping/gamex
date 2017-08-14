const net = require('net');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');
const process = require('process');
const centerHandler = require('./center-handler');

const server = net.createServer();

//attention:
//1.to be more stable
//all request should put into a queue

function startServer() {

    server.on('listening', function () {
        logger.info("server is listening on port:%d", sysConfig.svrPort);
    });

    server.on('connection', function (socket) {

        logger.info("connection income,ip:%s", socket.remoteAddress);

        socket.setTimeout(60 * 1000, function () {
            logger.error("ip:%s,idle timeout, disconncting, bye", socket.remoteAddress);
            socket.end('idle timeout, disconnecting, bye!');
            socket.destroy();
        });

        socket.on('data', function (data) {
            logger.info("ip:%s, get data", socket.remoteAddress);
            console.debug(data);
            centerHandler.process(socket, data);
        });

        socket.on('error', function (err) {
            logger.info("ip:%s,error", socket.remoteAddress);
            logger.error(err);
            socket.destroy();
        });

        socket.on('close', function (had_error) {
            logger.info("ip:%s,socket closed", socket.remoteAddress);
            if (!socket.destroyed) {
                logger.info("destroy socket");
                socket.destroy();
            }
        })
    });

    server.on('error', (err) => {
        logger.error(err);
        process.exit(1);
    });

    server.listen(sysConfig.svrPort, sysConfig.svrHost, () => {
        logger.info('server bound on host:%s,port:%d', sysConfig.svrHost, sysConfig.svrPort);
    });
}

exports.startServer = startServer;