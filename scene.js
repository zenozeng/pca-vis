(function() {
    var canvas = document.getElementById('scene');
    canvas.width = 900;
    canvas.height = 400;

    var scene = new Phoria.Scene();
    scene.camera.position = {x:0.0, y:5.0, z:-15.0};
    scene.perspective.aspect = canvas.width / canvas.height;
    scene.viewport.width = canvas.width;
    scene.viewport.height = canvas.height;

    var renderer = new Phoria.CanvasRenderer(canvas);

    var plane = Phoria.Util.generateTesselatedPlane(8, 8, 0, 20);
    scene.graph.push(Phoria.Entity.create({
        points: plane.points,
        edges: plane.edges,
        polygons: plane.polygons,
        style: {
            drawmode: "wireframe",
            shademode: "plain",
            linewidth: 0.5,
            objectsortmode: "back"
        }
    }));

    var c = Phoria.Util.generateUnitCube();
    var cube = Phoria.Entity.create({
        points: c.points,
        edges: c.edges,
        polygons: c.polygons
    });
    scene.graph.push(cube);
    scene.graph.push(new Phoria.DistantLight());

    var count = 0;
    var direction = 1;
    var fnAnimate = function() {
        // cube.rotateY(0.5 * Phoria.RADIANS);
        count++;

        if (count > 400) {
            count = 0;
            direction *= -1;
        }
        var offset = 0.01 * direction;
        cube.translate([offset, offset, offset]);

        scene.modelView();
        renderer.render(scene);

        requestAnimationFrame(fnAnimate);
    };

    fnAnimate();

})();
