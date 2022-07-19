console.log("hello world formContact.js");

let btnFooter = document.getElementById('contactBtn')
let formFooter = document.getElementById('form-footer')
let letter = document.querySelector('#contactBtn div.letter-image')
let closeFormBtn = document.getElementsByClassName('closeForm')

btnFooter.onclick = () => {
    letter.classList.toggle('active')
    setTimeout(() => {
        formFooter.classList.toggle('active')
    }, 500)
}

for (const btn of closeFormBtn) {
    btn.onclick = (e) => {
        e.preventDefault()
        let parentId = e.target.parentNode.parentNode.id;
        let formConcerned = document.getElementById(parentId)
        formConcerned.classList.toggle('active')
        if (parentId == "form-footer") {
            letter.classList.toggle('active')
        }
    }
}
