/*
    牌列表说明：
每个牌的每个花色都有一个单独的ID，一共54个ID，ID按黑红梅方的顺序生成
a,2,3,....q,k 黑桃 [1,2,3,4,5,6,7,8,9,10,11,12,13]
a,2,3,....q,k 红桃 [1,2,3,4,5,6,7,8,9,10,11,12,13] * 2
a,2,3,....q,k 梅花 [1,2,3,4,5,6,7,8,9,10,11,12,13] * 3
a,2,3,....1,k 方块 [1,2,3,4,5,6,7,8,9,10,11,12,13] * 4
小王
大王
*/

const  assert = require('assert');

// 花色定义
let SUIT_TYPE = {
    SPADE: 1,       //黑桃
    HEART: 2,       //红桃
    CLUB: 3,        //梅花
    DIAMOND: 4,     //方块
    JOKER: 5,       //大小王
};

// 牌面显示定义
let CARD_CHAR = [
    "null","A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "Kinglet", "King",
];

// 出牌类型
let CARD_TYPE = {
    DAN: 1,                 //单张
    DUI_ZI: 2,              //对子
    WANG_ZHA: 3,            //王炸
    ZHA_DAN: 4,             //炸弹
    SHUN_ZI: 5,             //顺子
    LIAN_DUI: 6,            //连对
    SAN: 7,                 //三张（不带）
    SAN_DAI_YI: 8,          //三带一
    SAN_DAI_YI_DUI: 9,      //三带一对
    FEI_JI: 10,             //飞机（不带）
    FEI_JI_DAI_YI: 11,      //飞机（带单）
    FEI_JI_DAI_DUI: 12,     //飞机（带对子）
    SI_DAI_ER: 13,          //四带二
    SI_DAI_LIANG_DUI: 14,   //四带两对
};

// 获取花色
// 3-q,k,a,2 每张牌有四个花色
function getSuitType(id) {

    let suitType = null;

    if (id >= 1 && id <= 13)
        suitType = SUIT_TYPE.SPADE;
    else if (id >= 14 && id <= 26)
        suitType = SUIT_TYPE.HEART;
    else if (id >= 27 && id <= 39)
        suitType = SUIT_TYPE.CLUB;
    else if (id >= 40 && id <= 52)
        suitType = SUIT_TYPE.DIAMOND;
    else if (id === 53 || id === 54)
        suitType = SUIT_TYPE.JOKER;

    return suitType
}

// 获取显示字
function getCardChar(id) {

    let displayChar = null;

    if (id >= 1 && id <= 52)
        displayChar = CARD_CHAR[(id - 1) % 13 + 1];
    else if (id === 53)
        displayChar = CARD_CHAR[14];
    else if (id === 54)
        displayChar = CARD_CHAR[15];

    return displayChar;
}


// 获取牌等级
// 大王 > 小王 > 2 > A > K .... > 3
function getGrade(id) {
    let grade = 0;
    if (id === 54) {       //大王
        grade = 17;
    } else if (id === 53) {    //小王
        grade = 16;
    } else {
        let modResult = id % 13;
        if (modResult === 2)       // 2
            grade = 15;
        else if (modResult === 1)   // A
            grade = 14;
        else if (modResult === 0)  // K
            grade = 13;
        else if (modResult >= 3 && modResult < 13)   // 3到Q
            grade = modResult;
    }

    return grade;
}


let AllCards = [];
for (let i = 1; i <= 54; i++) {
    AllCards[i] = {
        id: i,
        grade: getGrade(i),        // 等级
        suit: getSuitType(i),     // 花色
        display: getCardChar(i),     // 牌面
    };
}

console.log(AllCards);

function sortCards(cards) {
    cards.sort(function (a, b) {
        if(AllCards[a].grade > AllCards[b].grade) return -1;
        else if(AllCards[a].grade == AllCards[b].grade) return 0;
        else  return 1;
    });
}

function getGrades(cards) {
    let t = {};
    for (let v of cards) {
        let grade = AllCards[v].grade;
        if (! (grade in t)) {
            t[grade] = 0;
        }
        t[grade] = t[grade] + 1;
    }
    return t;
}


function dump(cards) {
    sortCards(cards);
    for (let v of cards) {
        console.log("花色：%d，牌面：%s, 权重：%d", AllCards[v].suit, AllCards[v].display, AllCards[v].grade);
    }
}


//单张
function isDan(cards) {
    return cards.length === 1;
}


assert(isDan([33]));
assert(isDan([23, 5]) === false);

//对子
function isDuiZi(cards) {
    return cards.length === 2
        && AllCards[cards[0]].grade === AllCards[cards[1]].grade;
}

assert(isDuiZi([30, 43]));
assert(isDuiZi([30, 52]) === false);

//大小王炸弹
function isDuiWang(cards) {
    return (cards.length === 2) && (cards[0] + cards[1] === 107);

}

assert(isDuiWang([53, 54]));
assert(isDuiWang([53, 52]) === false);


//三张
function isSan(cards) {
    return cards.length === 3
        && (AllCards[cards[0]].grade === AllCards[cards[1]].grade)
        && (AllCards[cards[1]].grade === AllCards[cards[2]].grade);
}

assert(isSan([30, 43, 17]));   //4 4 4
assert(isSan([30, 43, 15]) === false);//4 4 2

//三带一
function isSanDaiYi(cards) {
    if (cards.length !== 4) {
        return false;
    }

    sortCards(cards);
    if (AllCards[cards[0]].grade !== AllCards[cards[1]].grade) {
        let t = cards[3];
        cards[3] = cards[0];
        cards[0] = t;
    }

    if (AllCards[cards[0]].grade === AllCards[cards[1]].grade) {
        if (AllCards[cards[0]].grade === AllCards[cards[2]].grade
            && AllCards[cards[0]].grade !== AllCards[cards[3]].grade) {
            return true;
        }
    }

    return false;
}

assert(isSanDaiYi([30, 43, 17, 5]));  //4 4 4 3
assert(isSanDaiYi([30, 43, 17, 4]) === false); //4 4 4 4

//三带一对
function isSanDaiDui(cards) {
    if (cards.length !== 5) {
        return false;
    }

    sortCards(cards);
    if (AllCards[cards[0]].grade !== AllCards[cards[2]].grade) {
        let t = cards[3];
        cards[3] = cards[0];
        cards[0] = t;

        t = cards[1];
        cards[1] = cards[4] ;
        cards[4] = t;
    }

    if (AllCards[cards[0]].grade === AllCards[cards[1]].grade) {
        if (AllCards[cards[0]].grade === AllCards[cards[2]].grade
            && AllCards[cards[2]].grade !== AllCards[cards[3]].grade
            && AllCards[cards[3]].grade === AllCards[cards[4]].grade) {
            return true;
        }
    } else {
        return false;
    }
    return false;
}

assert(isSanDaiDui([30, 43, 17, 5, 31]));// 4 4 4 5 5
assert(isSanDaiDui([30, 43, 17, 3, 31]) === false);//4 4 4 5 3


//四张（炸弹）
function isSi(cards) {
    if (cards.length !== 4) {
        return false;
    }
    for (var i = 0; i < 3; i++) {
        if (AllCards[cards[i]].grade !== AllCards[cards[i + 1]].grade) {
            return false;
        }
    }
    return true;
}


assert(isSi([30, 43, 17, 4]));// 4 4 4 4
assert(isSi([30, 43, 18, 4]) === false); // 4 4 5 4

//四带二
function isSiDaiEr(cards) {
    if (cards.length !== 6) {
        return false;
    }
    let grades = getGrades(cards);
    for (let i in grades) {
        if (grades[i] === 4) {
            return true;
        }
    }

    return false;
}

assert(isSiDaiEr([30, 43, 17, 4, 3, 5]));// 4 4 4 4 3 5
assert(isSiDaiEr([30, 43, 17, 4, 3, 16]));// 4 4 4 4 3 3

//四带两对
function isSiDaiLiangDui(cards) {
    if (cards.length !== 8) {
        return false
    }
    let grades = getGrades(cards);
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    for (let i in grades) {
        if (!t1) {
            t1 = grades[i]
        } else if (!t2) {
            t2 = grades[i];
        } else if (!t3) {
            t3 = grades[i];
        }
    }

    let arr = [t1, t2, t3];
    arr.sort(function (a, b) {
        if( a > b) { return -1;}
        else if(a===b) {return 0;}
        else {return 1;}
    });

    return (arr.length === 3) &&
        (arr[0] === 4) && (arr[1] === 2) && (arr[2] === 2);
}

assert(isSiDaiLiangDui([30, 43, 17, 4, 3, 16, 5, 18]));// 4 4 4 4 3 3 5 5
assert(isSiDaiLiangDui([3, 16, 5, 18, 30, 43, 17, 4]));// 3 3 5 5 4 4 4 4
assert(isSiDaiLiangDui([30, 43, 17, 4, 3, 6, 5, 18]) === false); // 4 4 4 4 3 6 5 5


//顺子
function isShunZi(cards) {

    // 顺子必须超过五张
    if (cards.length < 5)
        return false;

    sortCards(cards);

    //最大的牌不能超过A
    if (AllCards[cards[0]].grade > 14)
        return false;

    //如果不连续
    for (let i=0;i<cards.length-1;i++) {
        if (AllCards[cards[i]].grade !== AllCards[cards[i + 1]].grade + 1)
            return false;
    }

    return true;
}

assert(isShunZi([13, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1]));
assert(isShunZi([35, 21, 20, 6, 31, 4]));//9 8 7 6 5 4
assert(isShunZi([21, 20, 4, 31]) === false);  //9 8 7 4 5
assert(isShunZi([35, 21, 5, 6, 31]) === false);  //9 8 5 6 5 4

//连对
function isLianDui(cards)
{
    //连对必须有三对以上
    if (cards.length < 6)
        return false;

    //连对必须牌数是偶数
    if (cards.length % 2 === 1)
        return false;

    sortCards(cards);

    //最大的牌不能超过A
    if (AllCards[cards[0]].grade > 14)
        return false;

    //如果牌不连续
    for (let i=0; i < cards.length / 2 - 1; i++) {
        //先判定是不是都是对子
        if (AllCards[cards[i * 2]].grade !== AllCards[cards[i * 2 + 1]].grade)
            return false;

        //再判定连续对
        if (i < cards.length / 2 - 1
            && AllCards[cards[i * 2 + 1]].grade !== AllCards[cards[(i+1) * 2 ]].grade + 1)
            return false;
    }

    return true;
}

assert(isLianDui([35, 9, 21, 8, 20, 7]));// 9 9 8 8 7 7
assert(isLianDui([35, 9, 21, 8, 20, 7, 6, 19]));// 9 9 8 8 7 7 6 6
assert(isLianDui([35, 9, 21, 8, 20, 7, 33]) === false);// 9 9 8 8 7 7 7

//飞机(不带)
function isFeiJi(cards) {

    if (cards.length !== 6 && cards.length !== 9)
        return false;

    let grades = getGrades(cards);

    // 如果不是三张，就判错
    for (let i in grades) {
        if (grades[i] !== 3)
            return false;
    }

    //如果是三张组合，还要判定是不是连续的
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    for(k in grades) {
        if (grades[k] === 3) {
            if (!t1) t1 = Number(k);
            else if(!t2) t2 = Number(k);
            else if(!t3) t3 = Number(k);
        }
    }

    if (cards.length === 6 && t1 && t2 && (t1 === t2 + 1 || t2 === t1 + 1))
        return true;

    if (cards.length === 9 && t1 && t2 && t3) {
        let arr = [t1, t2, t3];
        arr.sort(function (a, b) {
            if (a > b) return -1;
            else if (a === b) return 0;
            else return 1;
        });

        if (arr[0] === arr[1] + 1 && arr[1] === arr[2] + 1)
            return true;
    }

    return false

}

assert(isFeiJi([35, 9, 22, 21, 8, 34]));// 9 9 9 8 8 8
assert(isFeiJi([35, 9, 22, 21, 8, 34, 7, 20, 33]));// 9 9 9 8 8 8 7 7 7
assert(isFeiJi([35, 9, 22, 20, 7, 33]) === false);// 9 9 9 7 7 7

//飞机(带单张)
function isFeiJiDaiDan(cards) {
    if (cards.length !== 8 && cards.length !== 12)
        return false;

    let grades = getGrades(cards);

    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    for(let k in grades) {
        if (grades[k] === 3) {
            if (!t1) t1 = Number(k);
            else if(!t2) t2 = Number(k);
            else if(!t3) t3 = Number(k);
        }
    }

    //判定三张是否连续
    if (cards.length === 8 && t1 && t2 && (t1 === t2 + 1 || t2 === t1 + 1))
        return true;

    if (cards.length === 12 && t1 && t2 && t3) {
        let arr = [t1, t2, t3];
        arr.sort(function (a,b) {
            if (a>b)return -1;
            else if(a===b) return 0;
            else  return 1;
        });

        if (arr[0] === arr[1] + 1 && arr[1] === arr[2] + 1)
            return true;
    }

    return false;
}

assert(isFeiJiDaiDan([35, 9, 22, 21, 8, 34, 3, 4]));// 9 9 9 8 8 8 3 4
assert(isFeiJiDaiDan([35, 9, 22, 21, 8, 34, 7, 20, 33, 3, 4, 5]));// 9 9 9 8 8 8 3 4 5
assert(isFeiJiDaiDan([35, 9, 22, 20, 7, 33, 3, 4]) === false);// 9 9 9 7 7 7

//飞机(带对子)
function isFeiJiDaiDui(cards) {
    if (cards.length !== 10 && cards.length !== 15)
        return false;

    let grades = getGrades(cards);

    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    for(let k in grades) {
        if (grades[k] === 3) {
            if (!t1) t1 = Number(k);
            else if(!t2) t2 = Number(k);
            else if(!t3) t3 = Number(k);
        } else if(grades[k] !== 2) {
            return false;
        }
    }

    if (cards.length === 10 && t1 && t2 && (t1 === t2 + 1 || t2 === t1 + 1) )
        return true;

    if (cards.length === 15 && t1 && t2 && t3) {
        let arr = [t1, t2, t3];
        arr.sort(function (a, b) {
            if (a > b) return -1;
            else if (a === b) return 0;
            else return 1;
        });
        if (arr[0] === arr[1] + 1 && arr[1] === arr[2] + 1)
            return true;
    }

    return false;
}

assert(isFeiJiDaiDui([35, 9, 22, 21, 8, 34, 7, 20, 33, 3, 16, 4, 17, 5, 18]));//9 9 9 8 8 8 7 7 7 3 3 4 4 5 5
assert(isFeiJiDaiDui([35, 9, 22, 21, 8, 34, 3, 4, 16, 17]));// 9 9 9 8 8 8 3 3 4 4
assert(isFeiJiDaiDui([35, 9, 22, 21, 8, 34, 3, 4, 16, 18]) === false); // 9 9 9 8 8 8 3 3 4 5

function getCardType(cards) {
    let c = cards.length;
    if (c === 1) {         //单张
        return CARD_TYPE.DAN;
    }else if (c === 2) {     //两张只可能是王炸或一对
        if (isDuiWang(cards)) {
            return CARD_TYPE.WANG_ZHA;
        } else if (isDuiZi(cards)) {
            return CARD_TYPE.DUI_ZI;
        }
    } else if (c === 3) {    //三张只可能是单出三张
        if (isSan(cards))
            return CARD_TYPE.SAN;
    }else if (c === 4) {    //四张只可能是炸弹或三带一
        if (isSi(cards))
            return CARD_TYPE.ZHA_DAN;
        else if (isS && aiYi(cards))
            return CARD_TYPE.SAN_DAI_YI;
    }else if (c === 5) {    //5张只可能是顺子或三带一对
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
        else if (isSanDaiDui(cards))
            return CARD_TYPE.SAN_DAI_YI_DUI;
    }else if (c === 6) {    //6张可能是顺子、飞机（不带）、四带二、连对
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
        else if (isFeiJi(cards))
            return CARD_TYPE.FEI_JI;
        else if (isSiDaiEr(cards))
            return CARD_TYPE.SI_DAI_ER;
        else if (isLianDui(cards))
            return CARD_TYPE.LIAN_DUI;
    } else if (c === 7 || c === 11) {  //7或11张只可能是顺子
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
    } else if (c === 8) {     //8张可能是顺子、连对、飞机（带单）
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
        else if (isFeiJiDaiDan(cards))
            return CARD_TYPE.FEI_JI;
        else if (isLianDui(cards))
            return CARD_TYPE.LIAN_DUI;
    } else if (c === 9) {      //9张只可能是顺子、飞机（3头不带）
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
        else if (isFeiJi(cards))
            return CARD_TYPE.FEI_JI;
    } else if (c === 10) {    //10张可能是顺子、飞机(2头带对子)、连对
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
        else if (isFeiJiDaiDui(cards))
            return CARD_TYPE.FEI_JI;
        else if (isLi && ui(cards))
            return CARD_TYPE.LIAN_DUI;
    } else if (c === 12) {    //12张可能是顺子、飞机(3头带单张)、连对
        if (isShunZi(cards))
            return CARD_TYPE.SHUN_ZI;
        else if (isFeiJiDaiDan(cards))
            return CARD_TYPE.FEI_JI;
        else if (isLi && ui(cards))
            return CARD_TYPE.LIAN_DUI;
    } else if (c ===13) {
        //13张不合法，顺子带2，不可能是飞机，不可能是4带
    } else if (c === 14) {   //14张只可能是连对
        if (isLi && ui(cards))
            return CARD_TYPE.LIAN_DUI;
    }else if (c === 15) {  //15张只可能是飞机（3头带对子）
        if (isFeiJiDaiDui(cards))
            return CARD_TYPE.FEI_JI;
    }

    return null;
}

assert(getCardType([54]) === CARD_TYPE.DAN);
assert(getCardType([54, 53]) === CARD_TYPE.WANG_ZHA);
assert(getCardType([3, 3]) === CARD_TYPE.DUI_ZI);
assert(getCardType([3, 3, 4, 4, 5, 5]) === CARD_TYPE.LIAN_DUI);
assert(getCardType([3, 4, 5, 6, 7]) === CARD_TYPE.SHUN_ZI);
assert(getCardType([13, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1]) === CARD_TYPE.SHUN_ZI);
assert(getCardType([3, 3, 3, 3]) === CARD_TYPE.ZHA_DAN);
assert(getCardType([3, 3, 3, 3, 4, 4, 4, 4]) !== CARD_TYPE.FEI_JI);
assert(getCardType([3, 4, 5, 6, 7, 8, 9]) === CARD_TYPE.SHUN_ZI);
assert(getCardType([3, 3, 3, 4, 4, 4, 5, 5, 5]) === CARD_TYPE.FEI_JI);
assert(getCardType([3, 3, 3, 1, 4, 4, 4, 2, 5, 5, 5, 7]) === CARD_TYPE.FEI_JI);
assert(getCardType([3, 3, 3, 1, 1, 4, 4, 4, 2, 2, 5, 5, 5, 7, 7]) === CARD_TYPE.FEI_JI);
assert(getCardType([3, 3, 4, 4, 2, 2]) === null);
assert(getCardType([3, 3, 3, 4, 2]) === null);
assert(getCardType([3, 3, 3, 4, 4, 4, 2]) === null);
assert(getCardType([2, 3, 4, 5, 6]) === null);
assert(getCardType([3, 4, 5, 6, 7, 7]) === null);
////////////////////////////////////////////-


// 获取牌信息，花色，牌面，权重
function getCardDetail(card) {
    return AllCards[card];
}


// 将多张牌排序后返回牌信息
function getSortedCardsDetail(cards) {
    sortCards(cards);
    let cardDetails = [];
    for (let i in cards) {
        cardDetails[i] = _M.getCardDetail(cards[i]);
    }
    return cardDetails;
}


// 检查能不能出牌
function checkCards(preCards, curCards) {
    let card_type = getCardType(curCards);
    if (card_type === null)
        return false;

    //头次打
    if (preCards === null)
        return true;

    // 上家牌类型
    let pre_act = getCardType(preCards);
    if (card_type === CARD_TYPE.WANG_ZHA) {   // 王炸无视任何牌
        return true;
    } else if (card_type === CARD_TYPE.ZHA_DAN) {  //出炸弹，炸弹需要和上家比大小
        if (pre_act === CARD_TYPE.WANG_ZHA) {
            return false;
        } else if (pre_act === CARD_TYPE.ZHA_DAN) {
            if (AllCards[preCards[1]].grade < AllCards[curCards[1]].grade)
                return true;
            else
                return false;
        } else {
            return true;
        }
    } else if (pre_act !== card_type) {  // 和上家比牌型，上家出什么自己也要出什么
        return false;
    } else if (preCards.length !== curCards.length) {
        return false;
    } else {                          // 牌型一样，但必须比上家大
        sortCards(preCards);
        sortCards(curCards);
        if (AllCards[preCards[1]].grade < AllCards[curCards[1]].grade)
            return true;
        else
            return false;
    }
    return false;
}

