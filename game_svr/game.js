

const registerCenter = require('./register-center');
const gameServer = require('./game-server');
const sysConfig = require('./config/sys-config.json');


console.log(sysConfig);

setInterval(registerCenter.registerSelf, 5*1000);

gameServer.startServer();

