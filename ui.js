var noteBodyInput = document.getElementById("noteBodyInput")
var noteTitleInput = document.getElementById("noteTitleInput")
var formFooter = document.getElementsByClassName("footer")[0]

noteBodyInput.addEventListener('focus',(e) => {
    noteTitleInput.style.display = 'block'
    formFooter.style.display = 'flex'
})

function openSidebar() {
    var sidebar = document.getElementsByClassName("sidebar")[0]
    sidebar.style.width = "200px"
}

function closeSidebar() {
    var sidebar = document.getElementsByClassName("sidebar")[0]
    sidebar.style.width = "0"
}

var sidebarItems = document.getElementsByClassName("sidebarItem")

for (let i = 0; i < sidebarItems.length; i++) {
    if(screen.width <= 600) {
        console.log(sidebarItems[i])
        sidebarItems[i].addEventListener('click',(e) => {
            e.preventDefault()
            closeSidebar()
        })
    }
}