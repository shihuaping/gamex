
//
// 房间号生成规则：游戏ID+6个数字，6个数字随机生成，每次服务重启生成的数字都不一样
// 避免被猜到房间号，每个房间号带一个4位随机码，获取房间的时候动态生成
//

//
// [1,2,3,4,5] 方便随机数获取
// {1:"room1",2:"room2"....}
//

roomIDList = [];
roomList = {};

const Room = require('./room');


//初始化房间列表
function initRoomList(gid,maxRoomCount) {

    for (let i=0;i<maxRoomCount;i++) {
        roomIDList.push(Math.ceil(Math.random()*100000));
    }

    //随机数有可能有重复，无所谓了

    for(v in roomIDList) {
        let r = new Room();
        r.roomID = v;
        r.gid = gid;
        roomList[v] = r;
    }

}

//获取一个可用的房间
function getRoom() {

    let max = roomIDList.length;
    let pos = Math.ceil(max * Math.random());

    //从0开始
    let k = pos-1;

    //fuck this api
    roomList.splice(k, 1);

    let r = roomList[k];
    return r;
}

//销毁房间
function destroyRoom(roomId) {

    roomIDList.push(roomId);

    let r = new Room();
    r.roomID = roomId;
    r.gid = gid;
    roomList[roomId] = r;
}

exports.initRoomList = initRoomList;
exports.getRoom = getRoom;

