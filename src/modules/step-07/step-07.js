let theme = 'dark';

const radioButtons = this.shadowRoot.querySelectorAll('input[name="theme"]')

radioButtons.forEach(
    (radioButton) => {
        radioButton.addEventListener('change', (event) => {
            toggleThem()
        })
    }
)


const toggleThem = () => {
    if (theme === 'dark') {
        console.log('changing to light')
        theme = 'light'
    } else {
        console.log('changing to dark')
        theme = 'dark'
    }
}

const afterLoad = () => {
    console.log('From setup method')
}


