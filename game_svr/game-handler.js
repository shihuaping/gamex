

const packet = require('../protocol/packet');
const cmdDefine = require('../protocol/cmd-define');
const room = require('./room');

function process(socket, data) {

    let jObj = JSON.parse(data);
    let mainCmd = jObj.head.mcmd;
    let subCmd = jObj.head.scmd;

    switch (subCmd) {
        case cmdDefine.SUB_GAME_CREATE_ROOM:    //创建房间
            room.createRoom(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_ENTER_ROOM:     //加入房间
            room.enterRoom(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_LEAVE_ROOM:     //离开房间
            room.leaveRoom(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DISMISS_ROOM:   //解散房间
            room.dismissRoom(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_REENTER_ROOM:   //断线重进房间
            room.reenterRoom(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_QUERY_PLAYER_INFO:     //查询玩家游戏状态
            room.queryPlayerInfo(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DESK_SIT_DOWN:  //坐下
            room.playerSitDown(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DESK_READY:     //准备
            room.playerReady(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DESK_STAND_UP:  //起立
            room.playerStandUp(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DESK_WATCH:     //观战
            room.playerWatch(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DESK_OPE_CARD:  //出牌，过牌，吃牌，碰，杠....等牌操作
            room.playerOpeCard(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_DESK_WIN:       //胡牌
            room.playerWin(socket, jObj);
            break;
        case cmdDefine.SUB_GAME_KICK_PLAYER:    //房主踢人
            room.kickPlayer(socket, jObj);
            break;
        default:
            logger.error("unknown mainCmd:%d,subCmd:%d", mainCmd, subCmd);
            break;
    }
}


exports.process = process;