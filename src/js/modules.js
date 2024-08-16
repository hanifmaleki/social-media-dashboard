function getModules() {
    return [
        {
            title: 'Home',
            directory: 'home',
            template: 'index.pug',
            style: 'style.scss',
            description: 'Home Page',
            isHome: true,
        },
        {
            title: 'Step-01 Creating Files',
            directory: 'module-01',
            template: 'index.pug',
            style: 'style.scss',
            description: 'Copying texts and variables from the problem description files',
        },
        {
            title: 'Step-02',
            directory: 'step-02',
            template: 'index.pug',
            style: 'style.scss',
            description: 'Creating the top part of the page',
        }
    ]
}

module.exports = { getModules }
