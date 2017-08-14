const cmdDefine = require('../protocol/cmd-define');
const dbOper = require('./db-oper');
const packet = require('../protocol/packet');

async function process(socket, jObj) {

    const mainCmd = jObj.head.mcmd;
    const subCmd = jObj.head.scmd;

    switch (subCmd) {
        case cmdDefine.SUB_LOGIN_ACCOUNT:
            let data = await dbOper.login(userInfo);

            if (data.length > 0) {
                data.token = "just for test";

                var retObj = packet.getPacket(mainCmd,subCmd+100);
                retObj.body = data;
                socket.write(JSON.stringify(retObj));
            }

            break;
        case cmdDefine.SUB_LOGIN_PHONE:
            break;
        case cmdDefine.SUB_LOGIN_VISITOR:
            break;
    }
}