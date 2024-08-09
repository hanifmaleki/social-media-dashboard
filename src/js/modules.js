function getModules() {
    return [
        {
            title: 'Home',
            directory: 'home',
            template: 'index.pug',
            style: 'style.scss',
            isHome: true,
        },
        {
            title: 'Module-01',
            directory: 'module-01',
            template: 'index.pug',
            style: 'style.scss',
        }
    ]
}

module.exports = { getModules }
