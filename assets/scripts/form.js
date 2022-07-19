console.log("hello world formContact.js");

let btnFooter = document.getElementById('contactBtn')
let formFooter = document.getElementById('form-footer')
let letter = document.querySelector('#contactBtn div.letter-image')
let closeFormBtn = document.getElementsByClassName('closeForm')

btnFooter.onclick = () => {
    letter.classList.toggle('active')
    setTimeout(() => {
        formFooter.classList.toggle('active')
        if(formFooter.classList.contains('active')){
            formFooter.scrollIntoView(true)
        }
    }, 500)
}

for (const btn of closeFormBtn) {
    btn.onclick = (e) => {
        e.preventDefault()
        let parentId = e.target.parentNode.parentNode.id;
        let formConcerned = document.getElementById(parentId)
        formConcerned.classList.toggle('active')
        if(formConcerned.classList.contains('active')){
            formConcerned.scrollIntoView(true)
        }
        if (parentId == "form-footer") {
            letter.classList.toggle('active')
        }
    }
}
