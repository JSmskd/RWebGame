const canvas = document.getElementById("canvas")
let tick = 0
let moves = 0

// function

// console.log(u);
let nw = window.open(
    file("players.html"),
    "popupWindow",
    "width=800,height=600,scrollbars=yes,resizable=yes"
);

console.log(nw.document)

const ctx = canvas.getContext("2d");
ctx.fillstyle

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
let mouse = {
    inCanvas:false,
    x:0,
    y:0,
    left: false,
    middle: false,
    right: false
}
function mmmm(button, setTo) {
    // let temp = button
    switch (button) {
    case 0:mouse.left=setTo;break;
    case 2:mouse.right=setTo;break;
    case 1:mouse.middle=setTo;break;
    default:break;}
    console.log(button,setTo,mouse)
}
Math.trunc()

window.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});
document.addEventListener('mousemove', function (event) {
    mouse.x = event.offsetX
    mouse.y = event.offsetY
})
document.addEventListener('mousedown', function (event) {
    event.preventDefault();
    mmmm(event.button, true)
})
document.addEventListener('mouseup', function (event) {
    event.preventDefault();
    mmmm(event.button, false)
})
document.addEventListener("click", function (e) {
    console.log(e); // logs `true`
});

function animate() {
    ctx.fillStyle = rgba(0, 0, 0);
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);


    ctx.fillStyle = rgba(255, 0, 0);
    ctx.strokeStyle = rgba(255, 0, 0);
    // ctx.arc(10,10,20,20,30,false)
    wheelPart(150, 60, 30, 0, 2 * Math.PI)
    ctx.fillStyle = rgba(255, 255, 255);
    ctx.fillRect(mouse.x - 5, mouse.y - 5, 10, 10);
    requestAnimationFrame(animate)
}
animate()