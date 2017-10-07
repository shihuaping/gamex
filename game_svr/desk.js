

const sysConfig = require('./config/sys-config.json');
const cmdDefine = require('../protocol/cmd-define');

function init() {
    gameInst = require('./plugin/'+sysConfig.plugin);
}

function playerOpeCard(socket, packet) {

    const cardEvent = packet.body.cardEvent;
    switch (cardEvent.ope) {
        case cmdDefine.EVENT_OUT_CARD:
            gameInst.outCards(cardEvent);
            break;
        case cmdDefine.EVENT_PASS_CARD:
            gameInst.passCards(cardEvent);
            break;
        default:
            break;
    }
}