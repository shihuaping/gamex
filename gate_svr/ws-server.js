

const WebSocket = require('ws');
const clientHandler = require('./client-handler');
const shortID = require('./short-ID');


function startServer(sysConfig) {

    const host = sysConfig.svrHost;
    const port = sysConfig.svrPort;
    const wss = new WebSocket.Server({host:host,port:port});

    wss.on('connection', function (ws) {

        const psudoID = shortID.getNextID();
        const ip = req.connection.remoteAddress;
        ws.psudoID = psudoID;
        ws.ip = ip;

        clientHandler.onConnection(ws);


        ws.on('message', function (msg) {
            clientHandler.onMessage(ws, msg);
        });

        ws.on('error', function (err) {
            clientHandler.onError(ws,err);
        });

        ws.on('close', function () {
            clientHandler.onClose(ws);
        });
    });
}

exports.startServer = startServer;
