

//-------------------------------------
//          redis
//  type : server1 server2 server3
//
//
//-------------------------------------

const rdsOper = require('./redis-oper');
const cmdDefine = require('../protocol/cmd-define');
const packet = require('../protocol/packet');

//serverInfo
// {
//      name
//      type
//      ip
//      port
//      activeTime
//      serverNo
//      ext
// }
function registerServer(serverInfo) {

    rdsOper.saveServer(serverInfo);
}

function removeServer() {

    rdsOper.removeServer(serverInfo)
}

async function getServer(socket, serverInfo) {

    let serverList = await rdsOper.getServerList(serverInfo.type);
}

function process(socket, data) {


    let jObj = JSON.parse(data);

    console.log(jObj);

    let mainCmd = jObj.head.mcmd;
    let subCmd = jObj.head.scmd;
    switch (subCmd) {
        //更新服务状态
        case cmdDefine.SUB_CENTER_UPDATE:
            let serverInfo = jObj.body;
            serverInfo.ip = socket.remoteAddress;
            serverInfo.activeTime = Math.floor(new Date().getTime()/1000);
            registerServer(serverInfo);
            break;
        //查询服务可用列表
        case cmdDefine.SUB_CENTER_GET:
            let serverList = getServer(socket, serverInfo);
            let retObj = packet.getPacket(mainCmd,subCmd+100);
            retObj.body = serverList;
            socket.write(retObj);
            break;
        default:
            break
    }

}

exports.process = process;
