// let btnFooter = document.getElementById('contactBtn')
let formFooter = document.getElementById('form-footer')
let letter = document.querySelector('#openFormFooter div.letter-image')
let closeFormBtn = document.getElementsByClassName('closeForm')

let forms = document.getElementsByClassName('form')
let formBtn = document.getElementsByClassName('formBtn')


for (const form of forms) {
    // console.log(form);
    form.submit = (e) => {
        e.preventDefault()
        console.log("okay okay on envoie");
    }
}
for (const btn of formBtn) {
    // console.log(btn);
    btn.onclick = (e) => {
        e.preventDefault()
        let id = btn.id;
        let form = id.slice(8).toLowerCase()
        if(form == "footer"){
                letter.classList.toggle('active')
                setTimeout(() => {
                    formFooter.classList.toggle('active')
                    if (formFooter.classList.contains('active')) {
                        setTimeout(() => {
                            formFooter.scrollIntoView()
                        }, 310)
                    }
                }, 500)
        } else{
            form = `form-${id.slice(8).toLowerCase()}`
            let formToDisplay = document.getElementById(form)
            setTimeout(() => {
                formToDisplay.classList.toggle('active')
                if (formToDisplay.classList.contains('active')) {
                    setTimeout(() => {
                        formToDisplay.scrollIntoView({ block: "start" })
                    }, 310)
                }
            }, 500)
        }

    }
}

for (const btn of closeFormBtn) {
    btn.onclick = (e) => {
        e.preventDefault()
        let parentId = e.target.parentNode.parentNode.id;
        let formConcerned = document.getElementById(parentId)
        formConcerned.classList.toggle('active')
        if (formConcerned.classList.contains('active')) {
            formConcerned.scrollIntoView(true)
        }
        if (parentId == "form-footer") {
            letter.classList.toggle('active')
        }
    }
}
