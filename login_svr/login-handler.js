
const cmdDefine = require('../protocol/cmd-define');

function process(socket, jObj) {

    const mainCmd = jObj.head.mcmd;
    const subCmd = jObj.head.scmd;

    switch (subCmd) {
        case cmdDefine.SUB_LOGIN_ACCOUNT:
            break;
        case cmdDefine.SUB_LOGIN_PHONE:
            break;
        case cmdDefine.SUB_LOGIN_VISITOR:
            break;
    }
}