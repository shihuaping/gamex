
// room - desk

//房间列表暂时不存数据库了

const desk = require('./desk');

//创建一个房间，实际是从已有房间里取一个
function createRoom(socket, packet) {

}

//进入房间。可以游戏，可以围观
function enterRoom(socket, packet) {

}

//离开房间
function leaveRoom(socket, packet) {

}

//解散房间，将房间归还到房间列表
function dismissRoom(socket, packet) {

}

//这个掉线重入，是不是要这么设计还在取舍中
function reenterRoom(socket, packet) {

}

//进房间后，要查询玩家列表
function queryPlayInfo(socket, packet) {

}

//坐桌子
function playerSitDown(socket, packet) {

}

//准备游戏，准备人数满员就开始游戏
function playerReady(socket, packet) {

}

//离开桌子
function playerStandUp(socket, packet) {

}

//围观，主要是广播
function playerWatch(socket, packet) {

}

//游戏中
function playerOpeCard(socket, packet) {
    desk.playerOpeCard(socket, packet);
}

//赢了
function playerWin(socket, packet) {

}

//房主踢人，服务器踢+客户端通知
function kickPlayer(socket, packet) {

}

exports.createRoom      = createRoom;
exports.enterRoom       = enterRoom;
exports.dismissRoom     = dismissRoom;
exports.reenterRoom     = reenterRoom;
exports.leaveRoom       = leaveRoom;
exports.queryPlayerInfo = queryPlayInfo;
exports.playerSitDown   = playerSitDown;
exports.playerReady     = playerReady;
exports.playerStandUp   = playerStandUp;
exports.playerWatch     = playerWatch;
exports.playerOpeCard   = playerOpeCard;
exports.playerWin       = playerWin;
exports.kickPlayer      = kickPlayer;
