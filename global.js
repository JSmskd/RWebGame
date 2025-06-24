function file(name) {
    var u = `${window.location.href}`.split("/")
    u.pop()
    u.push(name)
    return u.join("/")
}
function rgba(r,g,b,a=255) {
    return `rgba(${r},${g},${b},${a})`
}
//JSON Right Bracket Removed
function JSONRBR (obj) {
    var a = JSON.stringify(obj)
    a.pop()
    return a
}

class wheel {
    constructor(name) {
    this.name = name;
    this.spots = []
    }
}

class wheelSpot {
    constructor(name,colour, weight) {
    this.name = name;
    this.colour = colour
    this.modes = {
        base:weight
    }
    }
    addMode(key, value) {
        this.modes = JSON.parse(`${JSONRBR(this.modes)},"${key}":${value}}`)
    }
}

