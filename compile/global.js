function file(name) {
    var u = "".concat(window.location.href).split("/");
    u.pop();
    u.push(name);
    return u.join("/");
}
function rgba(r, g, b, a) {
    if (a === void 0) { a = 255; }
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}
//JSON Right Bracket Removed
function JSONRBR(obj) {
    var a = JSON.stringify(obj);
    a.slice(a.length - 1); // pop()
    return a;
}
var sp = /** @class */ (function () {
    function sp() {
    }
    return sp;
}());
var wee = /** @class */ (function () {
    function wee(n) {
        this.name = n;
        this.spaces = [];
    }
    Object.defineProperty(wee.prototype, "total", {
        get: function () {
            var put = 0;
            for (var i = 0; i < this.spaces.length; i++) {
                put += this.spaces[i].weight;
            }
            ;
            // console.log(this.spaces.length)
            return put;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(wee.prototype, "weightSize", {
        get: function () {
            var t = this.total;
            if (t > 0) {
                return (2 * Math.PI) * (1 / t);
            }
            else {
                return (0);
            }
        },
        enumerable: false,
        configurable: true
    });
    wee.prototype.addSpace = function (n, w, col, tcol) {
        if (tcol === void 0) { tcol = rgba(0, 0, 0); }
        this.spaces.push({
            name: n,
            weight: w,
            colour: col,
            textColor: tcol
        });
    };
    return wee;
}());
function JStruncate(x) {
    var to = 100;
    return Math.trunc(x * to) / to;
}
