
const wsServer = require('./ws-server');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');
const registerCenter = require('./register-center');


logger.debug(sysConfig);

registerCenter.registerSelf();
setInterval(registerCenter.registerSelf, 10*1000);

wsServer.startServer(sysConfig);