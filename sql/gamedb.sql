
create database if not exists gamedb default charset utf8;

use gamedb;

-- 游戏表
-- 游戏id手工维护
create table if not exists game_list (

    gid     int         not null default '0'    comment '游戏ID',
    name    varchar(32) not null default ''     comment '游戏名称',
    iconURL varchar(255) not null default ''    comment '游戏图标',
    index(gid)
) engine=innodb default charset 'utf8';

-- 游戏服相关信息
-- 注意游戏服ip和端口均为外网ip和端口
create table if not exists game_server_list (

    gid         int         not null default '0'    comment '游戏ID',
    name        varchar(64) not null default ''     comment '游戏服名称',
    ip          char(16)    not null default ''     comment '游戏服ip',
    port        int         not null default '0'    comment '游戏服端口',
    lowScore    bigint      not null default '0'    comment '允许最低分,为0表示不限制',
    upScore     bigint      not null default '0'    comment '允许最高分,为0表示不限制',
    status      int         not null default '0'    comment '1为正常，2为维护中，3为停服',
    createTime  timestamp   not null default  0     comment '创建时间',
    modifyTime  timestamp   not null default  0     comment '修改时间',
    index(gid,status)
) engine=innodb default charset 'utf8';

-- 每个用户在每个游戏中都有一份单独的数据，保证分数和金币数不乱
create table if not exists user_game_info (

    uid         int         not null default '0'    comment '用户id',
    uname       varchar(64) not null default ''     comment '用户昵称',
    gid         int         not null default '0'    comment '游戏ID',
    score       bigint      not null default '0'    comment '用户得分',
    coins       bigint      not null default '0'    comment '用户金币数',
    gems        int         not null default '0'    comment '用户钻石数',
    loginTime   timestamp   not null default  0     comment '登录时间',
    logoutTime  timestamp   not null default  0     comment '退出时间',
    index(uid,gid)
) engine = innodb default charset 'utf8';


