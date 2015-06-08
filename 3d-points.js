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
        var s = 8;
        var coordinate = Phoria.Entity.create({
            points: [{x: 0,y: 0, z: 0},
                     {x: s, y: 0, z: s},
                     {x: 0, y: s, z: 0},
                     {x: 0, y: 0, z: s}
                    ],
            edges: [{a:0, b: 1}],
            style: {
                linewidth: 10,
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

        var angle1 = 0; // 绕 Z 轴转了 angle1
        var angle2 = 0;
        var step = 2;
        var fnAnimate = function() {

            coordinate.rotateY(step * Phoria.RADIANS);

            scene.modelView();
            renderer.render(scene);

            requestAnimationFrame(fnAnimate);
        };

        fnAnimate();
    });

})();
