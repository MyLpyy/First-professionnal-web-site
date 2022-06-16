var rand = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
    return rand() + rand(); // to make it longer
};

token(); // "bnh5yzdirjinqaorq0ox1tf383nb3xr"