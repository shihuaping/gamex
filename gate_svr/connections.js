
var clientConns = {};
var svrConns    = {};
var mapConns    = {};

function addClientConn(fd,conn) {
    clientConns[fd] = {conn:conn,updateTime:new Date().getTime()};
}

function updateClientConn(conn) {
    conn.updateTime = new Date().getTime();
}

function addSvrConn(fd, conn) {
    svrConns[fd] = {conn:conn,updateTime:new Date().getTime()};
}

function addMapConn(fdClient, fdSvr) {
    mapConns[fdClient]  = fdSvr;
    mapConns[fdSvr]     = fdClient;
}

function updateSvrConn(conn) {
    conn.updateTime = new Date().getTime();
}

function getClientConn(fd) {
    if (fd in clientConns) {
        return clientConns[fd].conn;
    }
    return null;
}

function getSvrConn(fd) {
    if (fd in svrConns) {
        return svrConns[fd].conn;
    }
    return null;
}

function getMapConn(fd) {
    if (fd in mapConns) {
        return mapConns[fd];
    }
    return 0;
}

function removeSvrConn(fd) {
    const clientFd = getMapConn(fd);
    if (!!clientFd) {
        delete mapConns[clientFd];
        delete mapConns[fd];
    }
    if (fd in svrConns) {
        delete svrConns[fd];
    }
    if (clientFd in clientConns) {
        const conn = clientConns[clientFd];
        if (!!conn) conn.close();
        delete clientConns[clientFd];
    }
}

function removeClientConn(fd) {
    const svrFd = getMapConn(fd);
    if (!!svrFd) {
        delete mapConns[svrFd];
        delete mapConns[fd];
    }
    if (fd in clientConns) {
        delete clientConns[fd];
    }
    if (svrFd in svrConns) {
        const conn = [svrFd];
        if (!!conn) conn.destroy();
        delete svrConns[svrFd];
    }
}

function checkTimeout() {

    var outTimeFd = [];
    const now = new Date().getTime();
    for (k in clientConns) {
        if ((now - clientConns[k].updateTime) > 60*1000) {
            outTimeFd.push(k);
        }
    }

    for (var i=0; i<outTimeFd.length;i++ ) {
        logger.error("client fd:%d timeout", outTimeFd[i]);
        const fd = outTimeFd[i];
        if (fd in clientConns) {
            delete clientConns[fd];
            const svrFd = mapConns[fd];
            if (!!svrFd) {
                if (svrFd in svrConns) {
                    svrConns[svrFd].conn.destroy();
                    delete svrConns[svrFd];
                }
            }
        }
    }

    outTimeFd = []
    for (k in svrConns) {
        if((now - svrConns[k].updateTime) > 60*1000) {
            outTimeFd.push(k);
        }
    }

    for (var i=0; i<outTimeFd.length;i++ ) {
        logger.error("server fd:%d timeout", outTimeFd[i]);
        const fd = outTimeFd[i];
        if (fd in clientConns) {
            svrConns[fd].conn.destroy();
            delete svrConns[fd];
            const clientFd = mapConns[fd];
            if (!!clientFd) {
                if (clientFd in clientConns) {
                    clientConns[svrFd].conn.close();
                    delete clientConns[svrFd];
                }
            }
        }
    }


}

setInterval(checkTimeout, 10*1000);

exports.addClientConn   = addClientConn;
exports.updateClientConn = updateClientConn;
exports.addSvrConn      = addSvrConn;
exports.updateSvrConn   = updateSvrConn();
exports.getClientConn   = getClientConn;
exports.getSvrConn      = getSvrConn;
exports.addMapConn      = addMapConn;
exports.getMapConn      = getMapConn;
exports.removeClientConn = removeClientConn;
exports.removeSvrConn   = removeSvrConn;