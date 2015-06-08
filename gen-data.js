var fs = require('fs');
var numbers = 100;
var array = [];
var gen = function(min, max) {
    return min + Math.random() * (max - min);
};
var noise = function(pos) {
    return gen(-0.1 * pos, 0.1 * pos);
};

for (var i = 0; i < numbers; i++) {
    var pos = gen(0, 4);
    array.push([pos + noise(pos), pos + noise(pos), pos + noise(pos)]);
}

fs.writeFileSync('data.json', JSON.stringify(array, null, 4));
