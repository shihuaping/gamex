
const cmdDefine = require('../protocol/cmd-define');
const dbOper = require('./db-oper');
const packet = require('../protocol/packet');
const logger = require('./logger');

async function process(socket,data) {

    let jObj = JSON.parse(data);
    console.log(jObj);

    let mainCmd = jObj.head.mcmd;
    let subCmd = jObj.head.scmd;

    switch (subCmd) {
        case cmdDefine.SUB_HALL_GAME_LIST:
            let gameList = await dbOper.getGameList();
            let retObj = packet.getPacket(mainCmd, subCmd+100);
            retObj.body = gameList;
            let json = JSON.stringify(retObj);
            socket.write(json);
            break;
        default:
            logger.error("unsupport mainCmd:%d,subCmd:%d", mainCmd,subCmd);
            break
    }

}


exports.process = process;