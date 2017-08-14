

//-------------------------------------
//          redis
//  type : server1 server2 server3
//
//
//-------------------------------------

const rdsOper = require('./redis-oper');
const cmdDefine = require('../protocol/cmd-define');
const packet = require('../protocol/packet');

//
// {
//      name
//      type
//      ip
//      port
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
        case cmdDefine.SUB_CENTER_UPDATE:
            let serverInfo = jObj.body;
            registerServer(serverInfo);
            break;
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