const canvas = document.getElementById("canvas"); const ctx = canvas.getContext("2d");

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

// let nw = window.open(file("players/index.htm"), "popupWindow", "width=800, height=600, scrollbars=no,resizable=no"); console.log(nw.document)
let nw = window.open(file("wheel/"), "popupWindow", "width=800, height=600, scrollbars=no,resizable=no"); console.log(nw.document)


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

function animate() {
    ctx.fillStyle = rgba(0, 0, 0);
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    if (mouse.inCanvas) {
        ctx.fillStyle = rgba(255, 255, 255);
        ctx.fillRect(mouse.x - 5, mouse.y - 5, 10, 10);
    };
    requestAnimationFrame(animate)
}
animate()