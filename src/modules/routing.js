url = new URL(window.location.href)
pathname = url.pathname
state = history.state

const routingDiv = document.getElementById('routing')

module = getModule()

routeToModule(module)

window.routeToModuleIndex = routeToModuleIndex


function getModule() {
    var module = window.modules.find(module => pathname.includes(module.directory))

    if (!module) {
        return modules[0]
    }

    return module
}

function routeToModuleIndex(moduleIndex) {
    routeToModule(window.modules[moduleIndex])
}

function routeToModule(module) {
    moduleElement = getRenderedModule(module)

    if (routingDiv.childElementCount > 0 && routingDiv.firstChild != moduleElement ) {
        routingDiv.replaceChild(moduleElement, routingDiv.firstChild)
    } else {
        routingDiv.appendChild(moduleElement)
    }

    // newUrl = new URL(module.directory, url.origin)
    // console.log(newUrl)
    // history.pushState(state, module.title, newUrl)
}

function getRenderedModule(module) {
    if (!module.instance) {
        customElementName = module.directory + '-element'
        moduleClass = getModuleRenderClass(module)
        const ModuleClass = eval(moduleClass)
        customElements.define(customElementName, moduleClass)
        moduleElement = new ModuleClass()
        module.instance = moduleElement
    }

    return module.instance
}

function getModuleRenderClass(module) {
    const template = module.template ?? 'index'
    const style = module.style ?? 'style' 

    return class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
            let documentFragment = null
            const fetches = [
                fetch(module.directory + '/' + template + '.html')
                .then(response => response.text())
                .then(html => {
                    const template = document.createElement('div')
                    template.innerHTML = html
                    this.shadowRoot.appendChild(template)
                })
                .then(() => {
                    if (module.script) {
                        import(`./${module.directory}/${module.script.filename}.js`)
                            .then((cls) => {
                                const DynamicClass = cls[module.script.className]
                                const instance = new DynamicClass(this.shadowRoot)
                                instance.init()
                            })
                    }
                }),
                fetch(`${module.directory}/${style}.css`)
                .then(response => response.text())
                .then(css => {
                    const styleElement = document.createElement('style')
                    styleElement.textContent = css
                    this.shadowRoot.appendChild(styleElement)
                }),
            ]

            Promise.all(fetches)
        }

        connectedCallBack() {
            console.log('connetedCallback')
        }
    }
}
