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
        },
        {
            title: 'Step-04 Big Cards Container',
            directory: 'step-04',
            template: 'step-04',
            style: 'step-04',
            description: 'Implementing big Cards Container',
        },
        {
            title: 'Step-05 Smal Card',
            directory: 'step-05',
            template: 'step-05',
            style: 'step-05',
            description: 'Implementing small Cards',
        },
        {
            title: 'Step-06 Smal Cards Container',
            directory: 'step-06',
            template: 'step-06',
            style: 'step-06',
            description: 'Implementing small card container',
        },
    ]
}

module.exports = { getModules } 
