const canvas = document.getElementById("canvas"); const ctx = canvas.getContext("2d");

let tick = 0
let moves = 0
var spinning = true
//min? 0.009766958990053518
//ticks before land
// function tbl() {
//     let aba = 0.009522785015302179 * (1 / 0.997) * (1 / 0.997)// * (1 / 0.997)
//     let going = true
//     let put = 100 - 0.05620956675037 - 1.48369074 + 0.10954057280734687
//         while (going) {
//         if (aba <= 0.01) {
//             aba *= 1 / 0.975
//         } else if (aba <= 20) {
//             aba *= 1 / 0.99
//         } else if (aba <= 40) {
//             aba *= 1 / 0.995
//         } else /*if (aba <= 60)*/ {
//             aba *= 1 / 0.997
//         }
//         put += aba
//         // console.log(aba,put)
//          if (aba >= 100) { going = false }
//     }
//     console.log(put)
//     return put
// }
//const mpm = -0.6882637137780405// tbl()

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


///(2 * Math.PI) * (weight  / total)

let w = new wee("Default")
w.addSpace("good", 1, rgba(0, 255, 0))
w.addSpace("Bad", 1, rgba(255, 0, 0))
w.addSpace("SpinAgain", 3, rgba(0, 0, 255))

let wp = 0
let rigData = {
    total: NaN, // Total Weight
    offset: NaN,// how much weight before
    index: NaN, // what index
    weight: NaN, // weight
    percent: NaN
}

function mpm() {
    var eq = 0
    if ((rigData.percent == NaN || rigData.weight == NaN || rigData.offset == NaN || w.total == NaN) == false) {
        eq = rigData.percent * rigData.weight + rigData.offset
        eq /= w.total
        eq *= 2 * Math.PI
    }
    eq += 0.6882637137780405
    eq *= -1
    return eq
}

const slider = document.getElementById("plea");
function oc() {
    let v = slider.value
    v = isNaN(v) ? 0 : v
    v /= 10
    var equation = v
    rigData.percent = v

    equation /= 100
    document.getElementById("p").innerText = `${v}`
    equation *= rigData.weight
    document.getElementById("w").innerText = `${rigData.weight}`
    equation += rigData.offset
    document.getElementById("o").innerText = `${rigData.offset}`
    document.getElementById("t").innerText = `${rigData.total}`
    // console.log(equation)


    document.getElementById("wtf").innerText = `${truncate(equation)}/${w.total}`
    equation /= w.total
    document.getElementById("turn").innerText = `${truncate(equation)}`
    document.getElementById("radian").innerText = `${truncate(equation * 2 * Math.PI)}`
    document.getElementById("degree").innerText = `${truncate(equation * 360)}`

    //°
}
oc(); // Display the initial slider value
slider.oninput = oc// Update the slider value as the user drags the handle
function slected(rt, ro, ri, rw) {
    rigData.total = rt;
    rigData.offset = ro;
    rigData.index = ri;
    rigData.weight = rw;
    oc()
}
function upd(hard = false) {
    var menu = document.getElementById("space")
    menu.innerHTML = ""
    const to = w.total
    let off = 0

    var c = []
    for (let i = 0; i < w.spaces.length; i++) {
        // name: n, weight: w, colour: col, textColor: tcol

        var curent = w.spaces[i]
        var opt = document.createElement("option")
        opt.value = i
        opt.innerText = `${curent.name} | ${curent.weight}`

        opt.setAttribute("onclick", `slected(${to}, ${off}, ${i}, ${curent.weight})`)
        if (i == 0) { slected(to, off, i, curent.weight) }
        menu.appendChild(opt)
        off += curent.weight
    }
    // oc()
}






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
        wheelPart(150, 80, 60, o, l)

        offset += cur.weight
    }

    if (mouse.inCanvas) {
        ctx.fillStyle = rgba(255, 255, 255);
        ctx.fillRect(mouse.x - 5, mouse.y - 5, 10, 10);
    };
    const nowTime = new Date().getTime();

    wp += tick * (nowTime / lastTime) / 100
    wp %= 2 * Math.PI
    // console.log(wp)
    // if (tick > 0) { console.log(tick) }

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
    } else { tick = 0; spinning = false }
    lastTime = nowTime;
    requestAnimationFrame(animate)
}
animate()