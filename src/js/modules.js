function getModules() {
    return [
        {
            title: 'Home',
            directory: 'home',
            template: 'index',
            style: 'style',
            description: 'Home Page',
            isHome: true,
        },
        {
            title: 'Step-01 Creating Files',
            directory: 'module-01',
            template: 'index',
            style: 'style',
            description: 'Copying texts and variables from the problem description files',
        },
        {
            title: 'Step-02',
            directory: 'step-02',
            template: 'index',
            style: 'style',
            description: 'Creating the top part of the page',
        },
        {
            title: 'Step-03 Big Cards',
            directory: 'step-03',
            template: 'step-03',
            style: 'step-03',
            description: 'Desin and implementing big Cards using Block Element Modifier',
        }
    ]
}

module.exports = { getModules } 
