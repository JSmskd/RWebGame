const canvas = document.getElementById("canvas"); const ctx = canvas.getContext("2d");
let tick = 0
let moves = 0
let mouse = {
    inCanvas: false,
    x: 0,
    y: 0,
    left: false,
    middle: false,
    right: false
}
function mmmm(button, setTo) {
    switch (button) {
        case 0: mouse.left = setTo; break;
        case 2: mouse.right = setTo; break;
        case 1: mouse.middle = setTo; break;
        default: break;
    }
}
// function

// console.log(u);
let nw = window.open(file("players.html"), "popupWindow", "width=800, height=600, scrollbars=no,resizable=no"); console.log(nw.document)

window.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
document.addEventListener('mousemove', function (event) {
    mouse.x = event.offsetX
    mouse.y = event.offsetY
})
canvas.addEventListener('mouseleave', function (event) {
    mouse.inCanvas = false
})
canvas.addEventListener('mouseenter', function (event) {
    mouse.inCanvas = true
})
document.addEventListener('mousedown', function (event) {
    mmmm(event.button, true)
})
document.addEventListener('mouseup', function (event) {
    mmmm(event.button, false)
})
function wheelPart(cx, cy, r, sa, ea) {

    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r, sa, ea, false);
    // ctx.arc(20, 20, 30, 0, 2 * Math.PI);
    // ctx.fillRect(cx,cy,cx+r,cy+r)
    ctx.lineTo(cx, cy)
    ctx.fill(); ctx.stroke()
    ctx.closePath()
}
class wee {
    constructor(n) {
        this.name = n
        this.spaces = []
    }
    get total() {
        let put = 0;
        for (let i = 0; i < this.spaces.length; i++) {
            put += this.spaces[i].weight

        };
        // console.log(this.spaces.length)
        return put;
    }
    get weightSize() {
        const
        t = this.total; if (t > 0) { return (2 * Math.PI) * (1 / t) } else { return (0) }
    }

    addSpace(n, w, col, tcol = rgba(0, 0, 0)) {
        this.spaces.push({
            name: n,
            weight: w,
            colour: col,
            textColor: tcol
        })
    }
}
///(2 * Math.PI) * (weight  / total)

let w = new wee("Default")
w.addSpace("good", 1, rgba(0, 255, 0))
w.addSpace("Bad", 1, rgba(255, 0, 0))
w.addSpace("SpinAgain", 3, rgba(0, 0, 255))
let wp = 0
// console.log(w)
const t = w.total
let lastTime = new Date().getTime();
function animate() {
    ctx.fillStyle = rgba(0, 0, 0);
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    ctx.strokeStyle = rgba(0, 0, 0);
    // ctx.arc(10,10,20,20,30,false)
    let offset = 0
    const blop = w.weightSize
    // console.log(offset,t)
    for (let i = 0; offset < t; i++) {
        // console.log("ple")
        const cur = w.spaces[i]
        const o = (offset / t * (2 * Math.PI)) + wp
        const l = o + (cur.weight / t * (2 * Math.PI))
        ctx.fillStyle = cur.colour;
        wheelPart(150, 60, 30, o, l)

        offset += cur.weight
    }

    if (mouse.inCanvas) {
        ctx.fillStyle = rgba(255, 255, 255);
        ctx.fillRect(mouse.x - 5, mouse.y - 5, 10, 10);
    };
    const nowTime = new Date().getTime();

    wp += tick * (nowTime / lastTime) / 100

    if (tick > 0) {console.log(tick)}

    if (tick > 60) {
        tick *= 0.997
    } else if (tick > 40) {
        tick *= 0.995
    } else if (tick > 20) {
        tick *= 0.99
    // } else if (tick > 0.001) {
    //     tick *= 0.975
    } else if (tick > 0.01) {
        tick *= 0.975
    } else { tick = 0 }
    lastTime = nowTime;
    requestAnimationFrame(animate)
}
animate()