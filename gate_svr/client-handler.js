

//
//
// 客户端请求进来时的处理
//
//

const logger = require('./logger');
const connections = require('./connections');
const cmdDefine = require('../protocol/cmd-define');

function onConnection(fd,ws) {
    logger.info("client connected,fd:%d,ip:%s", fd, ws.ip);
    connections.addClientConn(fd,ws);
}

function onMessage(ws,msg) {

    logger.info("client read data,fd:%d,ip:%s", ws.psudoID, ws.ip);
    connections.updateClient(ws);

    var jObj = JSON.parse(msg);
    var mainCmd = jObj.head.mcmd;
    var subCmd = jObj.head.scmd;

    switch (mainCmd) {
        case cmdDefine.HEART_BEAT:
            ws.send(msg);
            break;
        case cmdDefine.LOGIN:

        default:
            logger.error("client fd:%d send unkown cmd:%d", ws.psudoID, mainCmd);
    }
}

function onError(ws,err) {
    logger.error("client error,fd:%d,ip:%s", fd, ws.ip);
    logger.error(err);
    const fd = ws.psudoID;
    connections.removeClientConn(fd);
}

function onClose(ws) {
    logger.info("client close,fd:%d,ip:%s", fd, ws.ip);

    const fd = ws.psudoID;
    connections.removeClientConn(fd);
}