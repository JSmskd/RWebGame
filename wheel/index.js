const canvas = document.getElementById("canvas")
const menu = document.getElementById("space")
const slider = document.getElementById("plea")

const ctx = canvas.getContext("2d");

let tick = 0
let wp = 0
let slowingDown = true
let lastTime = new Date().getTime();

let w = new wee("Default")
w.addSpace("good", 1, rgba(0, 255, 0))
w.addSpace("Bad", 1, rgba(255, 0, 0))
w.addSpace("SpinAgain", 3, rgba(0, 0, 255))


let rigData = {
    total: NaN, // Total Weight
    offset: NaN,// how much weight before
    index: NaN, // what index
    weight: NaN, // weight
    percent: NaN
}
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

function mpm() {
    var eq = 0
    if ((rigData.percent == NaN || rigData.weight == NaN || rigData.offset == NaN || w.total == NaN) == false) {
        eq = rigData.percent / 100 * rigData.weight + rigData.offset
        eq /= w.total
        eq *= 2 * Math.PI
    }
    eq += 0.6882637137780405
    eq *= -1
    return eq
}

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
}

function randIt() {
    slider.value = `${Math.trunc(Math.random() * 1000)}`
}
function regRoll() {
    const r = Math.random() * w.total
    let o = 0
    let i = 0
    let c = w.spaces[i]
    var playin = true
    while (playin) {
        c = w.spaces[i]
        o += c.weight
        i += 1
        if (r <= o) {
            i -= 1
            c = w.spaces[i]
            o -= w.spaces[i].weight
            playin = false
        }
    }
    slider.value = `${truncate((r - o) / c.weight * 1000)}`
    let ch = menu.children
    for (let leo = 0; leo < ch.length; leo++) {
        if (ch[leo].getAttribute("value") === `${i}`) {
            ch[leo].setAttribute("selected", "")
            eval(ch[leo].getAttribute("onclick"))
        } else {
            ch[leo].removeAttribute("selected")
        }
    }
}

function spin() {
    tick=100
    slowingDown = false
}

function animate() {
    ctx.fillStyle = rgba(0, 0, 0);
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    ctx.strokeStyle = rgba(0, 0, 0);
    let offset = 0
    const blop = w.weightSize
    for (let i = 0; offset < w.total; i++) {
        const cur = w.spaces[i]
        const o = (offset / w.total * (2 * Math.PI)) + wp
        const l = o + (cur.weight / w.total * (2 * Math.PI))
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

    //area of ehhhh
    const aoe = 0.01
     
    if (slowingDown) {
        if (tick > 60) {
            tick *= 0.997
        } else if (tick > 40) {
            tick *= 0.995
        } else if (tick > 20) {
            tick *= 0.99
        } else if (tick > 0.01) {
            tick *= 0.975
        } else { tick = 0; spinning = false }
    } else if (mpm() - aoe < wp) {
        const r = Math.random()
        if (r > 0.95) {
            console.log(`you win ${r}`)
         wp = mpm()
         slowingDown = true
        } else {
            console.log("errnh")
        }
        }
    lastTime = nowTime;
    requestAnimationFrame(animate)
}
animate()