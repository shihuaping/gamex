
var idx = 1024;

 function getNextID() {
    if(idx > 4200000000) {
        idx = 1024;
    }
    idx++;
    return idx;
}


exports.getNextID = getNextID;
