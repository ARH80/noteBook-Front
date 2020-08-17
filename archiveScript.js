function getArchivedNotes() {
    fetch('http://localhost:3000/archive')
    .then((response) => response.json())
    .then(function(datas) {
        for(data of datas) {
            addNote(data.title, data.text, data.color, data.id)
        }
    })
}

var notesContainer = document.getElementsByClassName("archivedNotes")[0]

function addNote(title, body, backColor, noteId) {
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
    
    notesContainer.insertBefore(noteCard, notesContainer.firstChild)
    
    
}

function handleCardArchiveButton(title, body, backColor, noteId, archeiveIconButton) {
    archeiveIconButton.addEventListener('click',(e) => {
        let parentCard = archeiveIconButton.parentNode.parentNode.parentNode.className
        e.preventDefault()
        if(parentCard === "notes") {
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
        } else {
            fetch(`http://localhost:3000/pinned/${noteId}`, {
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
        }
        
    })
}

function handleCardBinButton(title, body, backColor, noteId, binIconButton) {
    binIconButton.addEventListener('click',(e) => {
        let parentCard = binIconButton.parentNode.parentNode.parentNode.className
        e.preventDefault()
        if(parentCard === "notes") {
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
        } else {
            fetch(`http://localhost:3000/pinned/${noteId}`, {
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
        }
        
        
    })

}

function handleCardPinButton(title, body, backColor, noteId, pinIconButton) {
    
    pinIconButton.addEventListener('click',(e) => {
        let parentCard = pinIconButton.parentNode.parentNode.parentNode.className
        console.log(parentCard)
        e.preventDefault()
        
        if(parentCard === "notes") {
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
        } else {
            fetch(`http://localhost:3000/pinned/${noteId}`, {
            method : 'DELETE'})
            .then((res) => console.log("success"))
            .catch((err) => console.log("failed"))

            fetch('http://localhost:3000/notes/', {
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
        }
        
    })
}

getArchivedNotes()