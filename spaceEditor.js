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

function wheelPart(cx,cy,r,sa,ea) {
    
    ctx.beginPath()
ctx.moveTo(cx,cy)
    ctx.arc(cx, cy, r, sa, ea, false);
        // ctx.arc(20, 20, 30, 0, 2 * Math.PI);
// ctx.fillRect(cx,cy,cx+r,cy+r)
    ctx.lineTo(cx,cy)
    ctx.fill();ctx.stroke()
    ctx.closePath()
}

let mx = 0
let my = 0

document.addEventListener('mousemove', function(event) {
    mx = event.offsetX
    my = event.offsetY
})

function animate () {
    ctx.fillStyle = rgba(0,0,0);
ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);


ctx.fillStyle = rgba(255,0,0);
ctx.strokeStyle = rgba(255,0,0);
// ctx.arc(10,10,20,20,30,false)
wheelPart(150,60,30,0,2 * Math.PI)
// ctx.fillStyle = rgba(255,255,255);
// ctx.fillRect(mx-5,my-5, 10, 10);
requestAnimationFrame(animate)
}
animate()