function file(name) {
    var u = `${window.location.href}`.split("/")
    u.pop()
    u.push(name)
    return u.join("/")
}
function rgba(r,g,b,a=255) {
    return `rgba(${r},${g},${b},${a})`
}