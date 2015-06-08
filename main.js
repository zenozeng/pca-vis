(function() {
    var canvas = document.getElementById('points');
    canvas.width = 900;
    canvas.height = 300;

    var scene = new Phoria.Scene();
    scene.camera.position = {x: 0, y: 3.0, z: -15.0};
    scene.camera.lookat = {x: 0, y: 0, z: 0};
    scene.perspective.aspect = canvas.width / canvas.height;
    scene.viewport.width = canvas.width;
    scene.viewport.height = canvas.height;

    var renderer = new Phoria.CanvasRenderer(canvas);

    var plane = Phoria.Util.generateTesselatedPlane(8, 8, 0, 20);
    var p = Phoria.Entity.create({
        points: plane.points,
        edges: plane.edges,
        polygons: plane.polygons,
        style: {
            color: [200, 200, 200],
            drawmode: "wireframe",
            shademode: "plain",
            linewidth: 2,
            objectsortmode: "back"
        }
    });
    scene.graph.push(p);

    // todo space to pause

    $.get('data.json', function(data) {
        var s = 30;
        var coordinate = Phoria.Entity.create({
            points: [{x: 0,y: 0, z: 0},
                     {x: s, y: 0, z: 0},
                     {x: 0, y: s, z: 0},
                     {x: 0, y: 0, z: s}
                    ],
            edges: [{a:0, b: 1}, {a: 0, b: 2}, {a: 0, b: 3}],
            style: {
                linewidth: 3,
                drawmode: 'wireframe'
            }
        });
        scene.graph.push(coordinate);

        var cubes = data.map(function(p) {
            var c = Phoria.Util.generateUnitCube(0.2);
            var cube = Phoria.Entity.create(c);
            cube.translate([p.x, p.y, p.z]);
            scene.graph.push(cube);
            return cube;
        });

        scene.graph.push(new Phoria.DistantLight());
        scene.modelView();
        renderer.render(scene);

        // todo: ji suan cov ju zeng

        var angle1 = 0; // 绕 Z 轴转了 angle1
        var angle2 = 0;
        var step = 0.1;
        var fnAnimate = function() {
            angle1 += step * Math.PI;
            if (angle1 > Math.PI * 2) {
                angle1 = 0;
                angle1 += step * Math.PI;
            }


            // coordinate.rotateZ(0.5 * Phoria.RADIANS);
            // var positions = data.map(function(p) {
            //     var x = p.x,
            //         y = p.y,
            //         z = p.z;

            //     var r = Math.sqrt(x*x + y*y);
            //     // vec: (x, y) and (1, 0)
            //     var theta = Math.acos(x / r) - angle1;
            //     x = Math.cos(theta) * r;
            //     y = Math.sin(theta) * r;

            //     return [p.x, p.y, p.z];
            //     return [x, y, z];
            // });

            // cubes.forEach(function(c, i) {
            //     c.translate(positions[i]);
            // });

            coordinate.rotateY(angle1);
            coordinate.rotateX(angle2);

            scene.modelView();
            renderer.render(scene);

            coordinate.rotateY(-angle1);
            coordinate.rotateX(-angle2);

            // cubes.forEach(function(c, i) {
            //     var p = positions[i];
            //     c.translate([-p[0], -p[1], -p[2]]);
            // });

            requestAnimationFrame(fnAnimate);
        };

        fnAnimate();
    });

    setTimeout(function() {
        window.location.reload();
    }, 5000);

})();
