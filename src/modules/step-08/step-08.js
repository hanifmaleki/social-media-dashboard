export class Step08 {
    constructor(shadowRoot) {
        this.shadowRoot = shadowRoot
        this.them = 'light'
    }

    init() {
        const radioButtons = this.shadowRoot.querySelectorAll('input[name="theme"]')

        radioButtons.forEach(
            (radioButton) => {
                radioButton.addEventListener('change', (event) => {
                    this.toggleThem()
                })
            })

        radioButtons.forEach(
            (radioButton) => {
                if (radioButton.id === this.them) {
                    radioButton.checked = true
                }
            }
        )
    }

    toggleThem() {
        const section = this.shadowRoot.querySelector('.component-body')
        if (this.theme === 'dark') {
            section.classList = ['component-body light']
            this.theme = 'light'
        } else {
            section.classList = ['component-body dark']
            this.theme = 'dark'
        }
    }
}
