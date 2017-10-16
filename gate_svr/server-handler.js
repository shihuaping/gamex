
//
//
// 服务器返回数据时的处理
//
//

const logger = require('./logger');
const connections = require('./connections');

function onConnection(fd,tcpConn) {
    logger.info("client connected,fd:%d,ip:%s", fd, tcpConn.ip);
    connections.addSvrConn(fd,tcpConn);
}

function onMessage(tcpConn,msg) {
    logger.info("client read data,fd:%d,ip:%s", fd, tcpConn.ip);
    connections.updateSvrConn(tcpConn);

    var jObj = JSON.parse(msg);
}

function onError(tcpConn,err) {
    logger.error("client error,fd:%d,ip:%s", fd, tcpConn.ip);
    logger.error(err);
    const fd = ws.psudoID;
    connections.removeSvrConn(fd);
}

function onClose(tcpConn) {
    logger.info("client close,fd:%d,ip:%s", fd, tcpConn.ip);

    const fd = tcpConn.psudoID;
    connections.removeSvrConn(fd);
}