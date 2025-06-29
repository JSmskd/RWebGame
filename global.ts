function file(name:string) {
    var u = `${window.location.href}`.split("/")
    u.pop()
    u.push(name)
    return u.join("/")
}
function rgba(r, g, b, a = 255) {
    return `rgba(${r},${g},${b},${a})`
}
//JSON Right Bracket Removed
function JSONRBR(obj:object) {
    var a = JSON.stringify(obj)
    a.slice(a.length-1)// pop()
    return a
}

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
class sp {
    name:string
weight:number
colour: string
textColor: string

}
class wee {
    name:string
    spaces:Array<sp>
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


function truncate(x) {
    const to = 100
    return Math.trunc(x * to) / to
}