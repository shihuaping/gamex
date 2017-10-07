
const ddzRule = require('./ddz-rule');

class DouDiZhu {

    constructor() {
        //牌池
        this.cardPool = [];
        //座位
        this.seats = {};
        //地主
        this.diZhu = 0;
        //底牌
        this.diPai = [];
    }

    //初始化
    initGame() {

        let full = [];
        let allCards = ddzRule.getAllCards();
        for(let i=0;i<54;i++) {
            full.push(allCards[i+1].id);
        }

        let pos = 1;
        this.seats[pos] = {};
        this.seats[pos].handCards = []; //手上的牌
        this.seats[pos].outCards = [];  //已经打出的牌

        //洗牌，每人发17张
        let arrLength = full.length;
        for(let i=0;i<17;i++) {
            let j = Math.floor(Math.random()*arrLength);
            this.seats[pos].handCards.push(full[j]);
            full.splice(j,1);
            arrLength--;
        }

        pos = 2;
        this.seats[pos] = {};
        this.seats[pos].handCards = []; //手上的牌
        this.seats[pos].outCards = [];  //已经打出的牌

        for(let i=0;i<17;i++) {
            let j = Math.floor(Math.random()*arrLength);
            this.seats[pos].handCards.push(full[j]);
            full.splice(j,1);
            arrLength--;
        }

        pos = 3;
        this.seats[pos] = {};
        this.seats[pos].handCards = []; //手上的牌
        this.seats[pos].outCards = [];  //已经打出的牌

        for(let i=0;i<17;i++) {
            let j = Math.floor(Math.random()*arrLength);
            this.seats[pos].handCards.push(full[j]);
            full.splice(j,1);
            arrLength--;
        }

        //留下三张给地主
        this.diPai = full;

        //ddzRule.dump(this.seats[1].handCards);
        //ddzRule.dump(this.seats[2].handCards);
        //ddzRule.dump(this.seats[3].handCards);
        //ddzRule.dump(full);
    }

    //发牌
    sendCards() {

    }

    //出牌
    outCards() {

    }

    //过牌
    passCards() {

    }


    //叫地主
    qiangDiZhu() {

    }

}

let ddz = new DouDiZhu();
ddz.initGame();
