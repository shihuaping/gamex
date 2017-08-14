
create database if not exists gamedb default charset utf8;

use gamedb;

create table if not exists user_base (
    uid         int         not null default 0  comment '用户ID',
    account     varchar(64) not null default '' comment '用户帐号',
    name        varchar(64) not null default '' comment '用户名',
    nickName    varchar(64) not null default '' comment '昵称',
    password    char(32)    not null default '' comment '用户密码',
    token       char(32)    not null default '' comment '用户动态token',
    sex         int         not null default 0  comment '性别',
    city        int         not null default 0  comment '城市',
    province    int         not null default 0  comment '省份',
    faceURL     char(255)   not null default '' comment '用户头像',
    createTime  timestamp   not null default 0  comment '创建时间',
    index(account,password)
) engine=innodb default charset 'utf8';