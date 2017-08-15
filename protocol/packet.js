
function Packet(mainCmd,subCmd) {

    this.head = {};
    this.head.mcmd = mainCmd;
    this.head.scmd = subCmd;
    this.body = {};
}

function getPacket(mainCmd,subCmd) {
    return new Packet(mainCmd,subCmd);
}

exports.getPacket = getPacket;
