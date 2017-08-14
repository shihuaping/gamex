
server = require('./server');
const registerCenter = require('./register-center');
const logger = require('./logger');
const sysConfig = require('./config/sys-config.json');

logger.debug(sysConfig);

setInterval(registerCenter.registerSelf, 5*1000);

server.startServer();
