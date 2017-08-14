
const wsServer = require('./ws-server');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');
const registerCenter = require('./register-center');

logger.debug(sysConfig);

setInterval(registerCenter.registerSelf, 5*1000);

wsServer.startServer(sysConfig);