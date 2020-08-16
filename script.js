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

var paletteIconButton = document.getElementsByClassName("iconButton")[1]
var noteBackgroundColor = null
paletteIconButton.addEventListener('click',(e) => {
    e.preventDefault()
    var picker = new Picker(paletteIconButton)
    picker.onDone = function(color) {
        noteBackgroundColor = color.hex
    }
})

var notesContainer = document.getElementsByClassName("notes")[1]
var pinnedNotesContainer = document.getElementsByClassName("notes")[0]
var isSubmitPinned = false

function addNote(title, body, backColor, noteId, isPinned) {
    var noteCard = document.createElement('div')
    var buttonDiv = document.createElement('div')
    buttonDiv.className = 'cardButtonContainer'

    var archeiveIconButton = document.createElement('button')
    var binIconButton = document.createElement('button')
    var pinIconButton = document.createElement('button')

    var titleNode = document.createElement('h4')
    var titleNodeText = document.createTextNode(title)
    titleNode.appendChild(titleNodeText)

    var bodyNode = document.createElement('p')
    var bodyNodeText = document.createTextNode(body)
    bodyNode.appendChild(bodyNodeText)

    
    archeiveIconButton.className = 'iconButton'
    var archieveIcon = document.createElement('i')
    archieveIcon.className = 'material-icons'
    var archieveText = document.createTextNode('archive')
    archieveIcon.appendChild(archieveText)
    archeiveIconButton.appendChild(archieveIcon)

    pinIconButton.className = 'iconButton'
    var pinIcon = document.createElement('i')
    pinIcon.className = 'material-icons'
    var pinText = document.createTextNode('push_pin')
    pinIcon.appendChild(pinText)
    pinIconButton.appendChild(pinIcon)

    binIconButton.className = 'iconButton'
    var binIcon = document.createElement('i')
    binIcon.className = 'material-icons'
    var binText = document.createTextNode('delete')
    binIcon.appendChild(binText)
    binIconButton.appendChild(binIcon)

    handleCardArchiveButton(title, body, backColor, noteId, archeiveIconButton)
    handleCardBinButton(title, body, backColor, noteId, binIconButton)
    handleCardPinButton(title, body, backColor, noteId, pinIconButton)

    
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
    buttonDiv.appendChild(pinIconButton)
    buttonDiv.appendChild(archeiveIconButton)
    buttonDiv.appendChild(binIconButton)
    noteCard.appendChild(buttonDiv)
    noteCard.style.backgroundColor = backColor
    if(!isPinned) {
        notesContainer.insertBefore(noteCard, notesContainer.firstChild)
    } else {
        pinnedNotesContainer.insertBefore(noteCard, pinnedNotesContainer.firstChild)
    }
    
}

function handleCardArchiveButton(title, body, backColor, noteId, archeiveIconButton) {
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
}

function handleCardBinButton(title, body, backColor, noteId, binIconButton) {
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

}

function handleCardPinButton(title, body, backColor, noteId, pinIconButton) {
    
    pinIconButton.addEventListener('click',(e) => {
        let parentCard = pinIconButton.parentNode /////not sure....
        console.log(parentCard)
        e.preventDefault()
        fetch(`http://localhost:3000/notes/${noteId}`, {
        method : 'DELETE'})
        .then((res) => console.log("success"))
        .catch((err) => console.log("failed"))

        fetch('http://localhost:3000/pinned/', {
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
}



var noteBodyInput = document.getElementById("noteBodyInput")
var noteTitleInput = document.getElementById("noteTitleInput")

var pinButtonSubmit = document.getElementsByClassName("iconButton")[0]
pinButtonSubmit.addEventListener('click',(e) => {
    e.preventDefault()
    if(!isSubmitPinned) {
        isSubmitPinned = true
    } else {
        isSubmitPinned = false
    }
})
function submitForm(e) {
    e.preventDefault()
    if(noteTitleInput.value !== "" || noteBodyInput.value !== "") {
        addNote(noteTitleInput.value,noteBodyInput.value,noteBackgroundColor,isSubmitPinned)
        postNotes(noteTitleInput.value,noteBodyInput.value,noteBackgroundColor,isSubmitPinned)
        noteTitleInput.value = ""
        noteBodyInput.value = ""
        noteBackgroundColor = null
        isSubmitPinned = false
    }
}
function getNotes(isPinned) {
    if(!isPinned) {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var notes = JSON.parse(xhttp.responseText)
                for(note of notes) {
                    addNote(note.title,note.text,note.color,note.id,false)
                }
            }
        }
        xhttp.open("GET", "http://localhost:3000/notes", true)
        xhttp.send() 
    } else {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var notes = JSON.parse(xhttp.responseText)
                for(note of notes) {
                    addNote(note.title,note.text,note.color,note.id,true)
                }
            }
        }
        xhttp.open("GET", "http://localhost:3000/pinned", true)
        xhttp.send()
    }
    
}

getNotes(true)
getNotes(false)

function postNotes(noteTitle, noteBody, noteBackColor, isSubmitPinned) {
    if(!isSubmitPinned) {
        var xhttp = new XMLHttpRequest()
        xhttp.open("POST", "http://localhost:3000/notes", true)
        xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8")
        var data = {
            title : noteTitle,
            text : noteBody,
            color : noteBackColor
        }
        xhttp.send(JSON.stringify(data))
    } else {
        var xhttp = new XMLHttpRequest()
        xhttp.open("POST", "http://localhost:3000/pinned", true)
        xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8")
        var data = {
            title : noteTitle,
            text : noteBody,
            color : noteBackColor
        }
        xhttp.send(JSON.stringify(data))
    }
    
}