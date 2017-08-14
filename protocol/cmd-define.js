
/*

1-1000 // framework

1001-1200 // login server
1201-1300 // center server

3000-10000 // game server


{
    "head":{
    "mcmd":1,
    "scmd:":1,
    "remoteAddress":"127.0.0.1",
    "seqNo":0
},
    "body": {
    //as your wish
}
}
*/

module.exports = {
    HEART_BEAT:1,

    LOGIN:1001,
    SUB_LOGIN_ACCOUNT:1,
    SUB_LOGIN_PHONE:2,
    SUB_LOGIN_VISITOR:3,

    CENTER:1201,
    SUB_CENTER_UPDATE:1,
    SUB_CENTER_GET:2
};