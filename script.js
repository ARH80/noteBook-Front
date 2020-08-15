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
        sidebarItems[i].addEventListener('click', function() {
            console.log("CLICKED")
            closeSidebar()
        })
    }
}

var paletteIconButton = document.getElementsByClassName("iconButton")[1]
var noteBackgroundColor = null
paletteIconButton.addEventListener('click',(e) => {
    e.preventDefault()
    var picker = new Picker(paletteIconButton)
    picker.onDone = function(color) {
        noteBackgroundColor = color.hex
    }
})

var notesContainer = document.getElementsByClassName("notes")[0]
function addNote(title, body, backColor, noteId) {
    var noteCard = document.createElement('div')
    var buttonDiv = document.createElement('div')
    buttonDiv.className = 'cardButtonContainer'


    var titleNode = document.createElement('h4')
    var titleNodeText = document.createTextNode(title)
    titleNode.appendChild(titleNodeText)

    var bodyNode = document.createElement('p')
    var bodyNodeText = document.createTextNode(body)
    bodyNode.appendChild(bodyNodeText)

    var archeiveIconButton = document.createElement('button')
    archeiveIconButton.className = 'iconButton'
    var archieveIcon = document.createElement('i')
    archieveIcon.className = 'material-icons'
    var archieveText = document.createTextNode('archive')
    archieveIcon.appendChild(archieveText)
    archeiveIconButton.appendChild(archieveIcon)

    var binIconButton = document.createElement('button')
    binIconButton.className = 'iconButton'
    var binIcon = document.createElement('i')
    binIcon.className = 'material-icons'
    var binText = document.createTextNode('delete')
    binIcon.appendChild(binText)
    binIconButton.appendChild(binIcon)

    archeiveIconButton.addEventListener('click',(e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/notes/${noteId}`, {
            method : 'DELETE'
        })
        .then((res) => console.log("deleted from main notes successfuly."))
        .catch((err) => console.log("faild deleting note from main notes."))

        fetch('http://localhost:3000/archive', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify ({
                title : title,
                text : body,
                color : backColor
            })
        })
        .then((res) => console.log("posted to archive successfuly"))
        .catch((err) => console.log("posting is not successful"))
    })

    binIconButton.addEventListener('click',(e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/notes/${noteId}`, {
        method : 'DELETE'})
        .then((res) => console.log("success"))
        .catch((err) => console.log("failed"))

        fetch('http://localhost:3000/bin/', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                title : title,
                text : body,
                color : backColor
            })
        })
        .then((res) => console.log("posted to bin successfuly"))
        .catch((err) => console.log("posting is not successful"))
    })

    noteCard.addEventListener('mouseover',(e) => {
        e.preventDefault()
        buttonDiv.style.display = 'flex'
    })
    
    noteCard.addEventListener('mouseleave',(e) => {
        e.preventDefault()
        buttonDiv.style.display = 'none'
    })

    noteCard.append(titleNode)
    noteCard.appendChild(bodyNode)
    buttonDiv.appendChild(archeiveIconButton)
    buttonDiv.appendChild(binIconButton)
    noteCard.appendChild(buttonDiv)
    noteCard.style.backgroundColor = backColor
    notesContainer.insertBefore(noteCard, notesContainer.firstChild)
}



var noteBodyInput = document.getElementById("noteBodyInput")
var noteTitleInput = document.getElementById("noteTitleInput")
function submitForm(e) {
    e.preventDefault()
    if(noteTitleInput.value !== "" || noteBodyInput.value !== "") {
        addNote(noteTitleInput.value,noteBodyInput.value,noteBackgroundColor)
        postNotes(noteTitleInput.value,noteBodyInput.value,noteBackgroundColor)
        noteTitleInput.value = ""
        noteBodyInput.value = ""
        noteBackgroundColor = null
    }
}
function getNotes() {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText)
            var notes = JSON.parse(xhttp.responseText)
            for(note of notes) {
                addNote(note.title,note.text,note.color,note.id)
            }
        }
    }
    xhttp.open("GET", "http://localhost:3000/notes", true)
    xhttp.send()
}

getNotes()

function postNotes(noteTitle, noteBody, noteBackColor) {
    var xhttp = new XMLHttpRequest()
    xhttp.open("POST", "http://localhost:3000/notes", true)
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8")
    var data = {
        title : noteTitle,
        text : noteBody,
        color : noteBackColor
    }
    xhttp.send(JSON.stringify(data))
}