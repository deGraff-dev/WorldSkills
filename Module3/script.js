let ys = [350, 350, 300];
let xs = [350, 450, 400];
let xs_new = [350, 450, 400];
let ys_new = [350, 350, 300];


window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    render();



    canvas.addEventListener("mousemove", (e) => {
        let cntx = (xs[0] + xs[1] + xs[2]) / 3;
        let cnty = (ys[0] + ys[1] + ys[2]) / 3;
        var x = e.offsetX == undefined ? e.layerX : e.offsetX;
        x = x - cntx;
        var y = e.offsetY == undefined ? e.layerY : e.offsetY;
        y = y - cnty;
        var angle = get_angle(x, y);
        var delta = angle + (Math.PI / 2);
        for (let i = 0; i < 3; i++) {
            xs_new[i] = (xs[i] - cntx) * Math.cos(delta) - (ys[i] - cnty) * Math.sin(delta) + cntx;
            ys_new[i] = (xs[i] - cntx) * Math.sin(delta) + (ys[i] - cnty) * Math.cos(delta) + cnty;

        }
        render();

    });



    document.addEventListener('keydown', function (event) {
        if (event.code === 'KeyW') {
            for (let i = 0; i < ys_new.length; i++) {
                ys[i] = ys[i] - 5;
                ys_new[i] = ys_new[i] - 5;



            }
            render();
            return
        }
        if (event.code === 'KeyS') {
            for (let i = 0; i < ys_new.length; i++) {
                ys[i] = ys[i] + 5;
                ys_new[i] = ys_new[i] + 5;


            }
            render();
            return
        }
        if (event.code === 'KeyD') {
            for (let i = 0; i < ys_new.length; i++) {
                xs[i] = xs[i] + 5;
                xs_new[i] = xs_new[i] + 5;


            }
            render();
            return
        }
        if (event.code === 'KeyA') {
            for (let i = 0; i < ys_new.length; i++) {
                xs[i] = xs[i] - 5;
                xs_new[i] = xs_new[i] - 5;


            }
            render();
            return
        }
    });




    onkeyup = function (e) {
        delete pressedKeys[e.code];

        if (e.code === "KeyW") {
            console.log('Отжата кнопка W');
        } else if (e.code === "KeyD") {
            console.log('Отжата кнопка D');
        }
    }



    function render() {
        ctx.clearRect(0, 0, 1000, 700);
        ctx.beginPath();
        ctx.moveTo(xs_new[0], ys_new[0]);
        ctx.lineTo(xs_new[1], ys_new[1]);
        ctx.lineTo(xs_new[2], ys_new[2]);
        ctx.fill();
        ctx.closePath()
        console.log('render')
        ctx.fillRect(100, 100, 100, 200);
    }



}

function get_angle(x, y) {
    angle = Math.atan(y / x);
    if (x < 0 && y > 0) {
        return (angle + (Math.PI))

    }
    if (x < 0 && y < 0) {
        return (angle + (Math.PI))
    }
    if (x > 0 && y < 0) {
        return (angle + (Math.PI * 2))
    }
    if (x > 0 && y > 0) {
        return angle
    }
}



