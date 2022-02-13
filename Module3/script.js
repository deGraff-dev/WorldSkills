let ys = [450, 450, 400];
let xs = [450, 550, 500];
let xs_new = [450, 550, 500];
let ys_new = [450, 450, 400];
let arcs = [];
let asteroids = [];
let radiusAsteroid = 55;
let v = 1;
let macAsteroidSpeed = 30;
let maxAsteroids = 5;
let creationSpeed = 1500;
var left = false;
var right = false;
var topp = false;
var down = false;

function createAsteroid() {
    if (asteroids.length < maxAsteroids) {
        let asteroid = new Asteroid();
        asteroids.push(asteroid)
    }

}




window.onload = function () {
    let health = 3;
    let hp = document.getElementById('hp');
    let score = 0;
    let score_p = document.getElementById('score');
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");





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


    });
    canvas.addEventListener('click', (e) => {
        let cntx = (xs_new[0] + xs_new[1]) / 2;
        let cnty = (ys_new[0] + ys_new[1]) / 2;
        console.log(xs_new[1] - cntx, ys_new[1] - cnty)
        let arc = new Arc(xs_new[2], ys_new[2], xs_new[2] - cntx, ys_new[2] - cnty, 'red');
        arcs.push(arc);
    });



    window.addEventListener('keydown', function (event) {
        if (event.code === 'KeyW') {
            topp = true;
            down = false;
        }
        if (event.code === 'KeyS') {
            down = true;
            topp = false;
        }
        if (event.code === 'KeyD') {
            left = false;
            right = true;
        }
        if (event.code === 'KeyA') {
            right = false;
            left = true;
        }
    });
    window.addEventListener('keyup', function (event) {
        if (event.code === 'KeyW') {
            topp = false;
        }
        if (event.code === 'KeyS') {
            down = false;
        }
        if (event.code === 'KeyD') {
            right = false;
        }
        if (event.code === 'KeyA') {
            left = false;
        }
    });





    setInterval(createAsteroid, creationSpeed);


    function render() {
        if (topp) {
            for (let i = 0; i < ys_new.length; i++) {
                if (ys[0] > 0 && ys[1] > 0 && ys[2] > 0) {
                    ys[i] = ys[i] - v;
                    ys_new[i] = ys_new[i] - v;
                }




            }


        }
        if (down) {
            if (ys[0] < 700 && ys[1] < 700 && ys[2] < 700) {
                for (let i = 0; i < ys_new.length; i++) {

                    ys[i] = ys[i] + v;
                    ys_new[i] = ys_new[i] + v;
                }


            }


        }
        if (right) {
            if (xs[0] < 1000 && xs[1] < 1000 && xs[2] < 1000) {
                for (let i = 0; i < ys_new.length; i++) {

                    xs[i] = xs[i] + v;
                    xs_new[i] = xs_new[i] + v;
                }

            }


        }
        if (left) {
            if (xs[0] > 0 && xs[1] > 0 && xs[2] > 0) {
                for (let i = 0; i < ys_new.length; i++) {

                    xs[i] = xs[i] - v;
                    xs_new[i] = xs_new[i] - v;
                }



            }


        }
        hp.textContent = health;
        score_p.textContent = score;
        if (health == 0) {
            alert("Игра окончена. Ты проиграл. Твой счет:  " + score);
            macAsteroidSpeed = 30;
            maxAsteroids = 5;
            creationSpeed = 1500;
            score = 0;
            health = 3;
            asteroids = [];
            arcs = [];
            ys = [450, 450, 400];
            xs = [450, 550, 500];
            xs_new = [450, 550, 500];
            ys_new = [450, 450, 400];
            left = false;
            right = false;
            topp = false;
            down = false;
        }
        if (score == 1000) {
            maxAsteroids += 1;
            macAsteroidSpeed += 10;
            score -= 1000;
            if (creationSpeed >= 200) {
                creationSpeed -= 100;
            }
        }
        ctx.fillStyle = 'black';
        ctx.clearRect(0, 0, 1000, 700);
        ctx.beginPath();
        ctx.moveTo(xs_new[0], ys_new[0]);
        ctx.lineTo(xs_new[1], ys_new[1]);
        ctx.lineTo(xs_new[2], ys_new[2]);
        ctx.fill();
        ctx.closePath()

        arcs.forEach(element => {
            asteroids.forEach(aster => {

                let xrazn = Math.abs(aster.x - element.x)
                let yrazn = Math.abs(aster.y - element.y)
                let otr = Math.pow(Math.pow(xrazn, 2) + Math.pow(yrazn, 2), 0.5)
                if (otr <= radiusAsteroid + 10) {
                    score += 100;
                    arcs = arcs.filter(function (f) { return f !== element })
                    asteroids = asteroids.filter(function (f) { return f !== aster })
                }
            });
            if (element.x > 0 && element.x < 1000 && element.y > 0 && element.y < 700) {
                element.DrawArc(ctx);
                element.Update();
            } else {

                arcs = arcs.filter(function (f) { return f !== element })
            }


        });
        asteroids.forEach(element => {
            let DrawFlag = true;
            for (let i = 0; i < 3; i++) {

                let xrazn = Math.abs(xs_new[i] - element.x)
                let yrazn = Math.abs(ys_new[i] - element.y)
                let otr = Math.pow(Math.pow(xrazn, 2) + Math.pow(yrazn, 2), 0.5)
                if (otr <= radiusAsteroid) {
                    DrawFlag = false;
                    health -= 1;
                    asteroids = asteroids.filter(function (f) { return f !== element })
                }

            }
            if (DrawFlag) {
                if (element.x - radiusAsteroid >= 0 && element.x + radiusAsteroid <= 1000 && element.y - radiusAsteroid >= 0 && element.y + radiusAsteroid <= 700) {
                    element.DrawAsteroid(ctx);
                    element.Update();
                } else {

                    if (element.x - radiusAsteroid <= 0) {
                        element.x += 10;
                        element.changeRVX();

                    }
                    if (element.x + radiusAsteroid >= 1000) {
                        element.x -= 10;
                        element.changeRVX();
                    }
                    if (element.y - radiusAsteroid <= 0) {
                        element.y += 10;
                        element.changeRVY();
                    }
                    if (element.y + radiusAsteroid >= 700) {
                        element.y -= 10;
                        element.changeRVY();
                    }

                }
            }


        });

    }





    setInterval(render, 10)

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



class Arc {

    constructor(centerX, centerY, rvx, rvy, color) {
        this.x = centerX;
        this.y = centerY;
        this.rvx = rvx;
        this.rvy = rvy;
        this.color = color;

    }
    DrawArc(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    Update() {
        this.x += this.rvx * 0.1;
        this.y += this.rvy * 0.1;
    }
}





class Asteroid {

    constructor() {
        if (Math.random() * 100 >= 50) {
            this.x = Math.random() * 1000;
            this.y = radiusAsteroid + 5;

        } else {
            this.x = radiusAsteroid + 5;
            this.y = Math.random() * 700;;
        }
        this.rvx = Math.random() * macAsteroidSpeed + 10;
        this.rvy = this.rvx;

        this.color = 'grey';

    }
    DrawAsteroid(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, radiusAsteroid, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    changeRVX() {
        this.rvx = -(this.rvx)
    }
    changeRVY() {
        this.rvy = -(this.rvy)
    }
    Update() {
        this.x += this.rvx * 0.1;
        this.y += this.rvy * 0.1;
    }
}