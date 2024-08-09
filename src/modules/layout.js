const menuCircle = document.getElementById('menu-circle')

menuCircle.addEventListener('click', () => {
    console.log('clicked')
})

menuCircle.addEventListener('dragstart', 
    (event) => {
        console.log('drag start')
    }
)

menuCircle.addEventListener('dragover', 
    (event) => {
        console.log('drag over')
        event.preventDefault()
        //menuCircle.style.top = event.pageY
        //menuCircle.left = event.pageX
    }
)
