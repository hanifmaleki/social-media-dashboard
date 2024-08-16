url = new URL(window.location.href)
pathname = url.pathname
console.log(`url is ${url}`)
console.log(`protocol is ${url.protocol}`)
console.log(`pathname is ${url.pathname}`)

const routingdiv = document.getElementById('routing')
console.log(routingdiv)
console.log(getModule())
routingdiv.innerHTML=`<p>${getModule()}<p>`


function getModule() {
    if (pathname.includes('step-02')) {
        return 'step-02/index.html'
    }
    if (pathname.includes('module-01')) {
        return 'module-01/index.html'
    }

    return 'home/index.html'
}


