
const wsServer = require('./ws-server');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');

logger.debug(sysConfig);

wsServer.startServer(sysConfig);