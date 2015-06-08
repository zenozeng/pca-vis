var fs = require('fs');
var numbers = 100;
var array = [];
var gen = function(min, max) {
    return min + Math.random() * (max - min);
};
var noise = function() {
    return gen(-0.3, 0.3);
};

for (var i = 0; i < numbers; i++) {
    var pos = gen(-4, 4);
    array.push({x: pos + noise(), y: pos + noise(), z: pos + noise()});
}

fs.writeFileSync('data.json', JSON.stringify(array, null, 4));
