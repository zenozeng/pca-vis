$.get('data.json', function(data) {
    var canvas = $('#2d-points')[0];
    var ctx = canvas.getContext('2d');
    var width = 400;
    var height = 400;
    canvas.width = width;
    canvas.height = height;
    var theta = 0;
    var draw = function() {
        theta += Math.PI * 0.001;
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        var r = width;
        ctx.moveTo(-r * Math.sin(theta) + r / 2, -r * Math.cos(theta) + r / 2);
        ctx.lineTo(r * Math.sin(theta) + r/2, r * Math.cos(theta) + r/2);
        ctx.moveTo(r * Math.cos(theta) + r/2, -r * Math.sin(theta) + r/2);
        ctx.lineTo(-r * Math.cos(theta) + r/2, r * Math.sin(theta) + r/2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#aaa';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 1;
        data.forEach(function(p) {
            var x = p.x / 4 * width;
            var y = p.y / 4 * height;
            ctx.moveTo(x, y);
            ctx.arc(x, y, 3, 0, Math.PI * 2);
        });
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.closePath();

        // 计算新的点坐标，轴是在逆时针旋转，相当于点在顺时针旋转
        var points = data.map(function(p) {
            var x = p.x;
            var y = p.y;
            var r = Math.sqrt(x * x + y * y);
            var angle = Math.atan(y / x);
            angle += theta;
            x = r * Math.cos(angle);
            y = r * Math.sin(angle);
            return {x: x, y: y};
        });

        // 计算协方差矩阵
        var E = function(X) {
            var sum = 0;
            X.forEach(function(x) {
                sum += x;
            });
            return sum / X.length;
        };
        var cov = function(X, Y) {
            var EXY = E(X.map(function(x, i) {
                return x * Y[i];
            }));
            var EX = E(X);
            var EY = E(Y);
            var COV = EXY - EX * EY;
            return COV.toFixed(2);
        };
        var X = points.map(function(p) {
            return p.x;
        });
        var Y = points.map(function(p) {
            return p.y;
        });
        $('#covxx').html(cov(X, X));
        $('#covxy').html(cov(X, Y));
        $('#covyx').html(cov(Y, X));
        $('#covyy').html(cov(Y, Y));

        requestAnimationFrame(draw);
    };
    draw();
});
