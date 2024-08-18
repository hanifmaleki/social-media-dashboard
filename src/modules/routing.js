url = new URL(window.location.href)
pathname = url.pathname

const routingDiv = document.getElementById('routing')

module = getModule()

routeToModule(module)

window.routeToModuleIndex = routeToModuleIndex


function getModule() {
    console.log(window.modules)
    var module = window.modules.find(module => pathname.includes(module.directory))

if (!module) {
        console.log('Could not find module')
        return modules[0]
    }

    return module
}

function routeToModuleIndex(moduleIndex) {
    console.log('routeToModuleIndex')
    routeToModule(window.modules[moduleIndex])
}

function routeToModule(module) {
    moduleElement = getRenderedModule(module)

    if (routingDiv.childElementCount > 0 && routingDiv.firstChild != moduleElement ) {
        routingDiv.replaceChild(moduleElement, routingDiv.firstChild)
    } else {
        routingDiv.appendChild(moduleElement)
    }
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

            Promise.all([
                fetch(module.directory + '/' + template + '.html')
                    .then(response => response.text())
                    .then(html => {
                        const template = document.createElement('template')
                        template.innerHTML = html
                        this.shadowRoot.appendChild(template.content.cloneNode(true))
                    }),
                fetch(`${module.directory}/${style}.css`)
                    .then(response => response.text())
                    .then(css => {
                        const styleElement = document.createElement('style')
                        styleElement.textContent = css
                        this.shadowRoot.appendChild(styleElement)
                    })
            ])
        }
    }
}
