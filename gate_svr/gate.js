
const wsServer = require('./ws-server');
const sysConfig = require('./config/sys-config.json');
const logger = require('./logger');
const registerCenter = require('./register-center');
const sysCache = require('./sys-cache');

logger.debug(sysConfig);

sysCache.readCached();
setInterval(registerCenter.registerSelf, 5*1000);

wsServer.startServer(sysConfig);