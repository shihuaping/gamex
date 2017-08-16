

const packet = require('../protocol/packet');
const cmdDefine = require('../protocol/cmd-define');

//房间列表暂时不存数据库了

function createRoom() {

}

function enterRoom() {

}

function leaveRoom() {

}

function dismissRoom() {

}

function reenterRoom() {

}

function queryPlayInfo() {

}

function playerSitDown() {

}

function playerReady() {

}

function playerStandUp() {

}

function palyerWatch() {

}

function playerOpeCard() {

}

function playerWin() {

}


function process(socket, data) {

    let jObj = JSON.parse(data);
    let mainCmd = jObj.head.mcmd;
    let subCmd = jObj.head.scmd;

    switch (subCmd) {
        case cmdDefine.SUB_GAME_CREATE_ROOM:    //创建房间
            break;
        case cmdDefine.SUB_GAME_ENTER_ROOM:     //加入房间
            break;
        case cmdDefine.SUB_GAME_LEAVE_ROOM:     //离开房间
            break;
        case cmdDefine.SUB_GAME_DISMISS_ROOM:   //解散房间
            break;
        case cmdDefine.SUB_GAME_REENTER_ROOM:   //断线重进房间
            break;
        case cmdDefine.SUB_GAME_QUERY_PLAYER_INFO:     //查询玩家游戏状态
            break;
        case cmdDefine.SUB_GAME_DESK_SIT_DOWN:  //坐下
            break;
        case cmdDefine.SUB_GAME_DESK_READY:     //准备
            break;
        case cmdDefine.SUB_GAME_DESK_STAND_UP:  //起立
            break;
        case cmdDefine.SUB_GAME_DESK_WATCH:     //观战
            break;
        case cmdDefine.SUB_GAME_DESK_OPE_CARD:  //出牌，过牌，吃牌，碰，杠....等牌操作
            break;
        case cmdDefine.SUB_GAME_DESK_WIN:       //胡牌
            break;
        default:
            logger.error("unknown mainCmd:%d,subCmd:%d", mainCmd, subCmd);
            break;
    }
}


exports.process = process;