
// 大厅提供以下功能：
//      游戏列表（游戏类型，游戏种类)
//      服务器列表
//      在线人数等其它信息


const hallServer = require('./hall-server');
const registerCenter = require('./register-center');

setInterval(registerCenter.registerSelf, 5*1000);

hallServer.startServer();
