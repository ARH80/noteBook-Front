var noteBodyInput = document.getElementById("noteBodyInput")
var noteTitleInput = document.getElementById("noteTitleInput")
var formFooter = document.getElementsByClassName("footer")[0]

noteBodyInput.addEventListener('focus',(e) => {
    noteTitleInput.style.display = 'block'
    formFooter.style.display = 'flex'
})