// manage starting page
var session = (sessionStorage.getItem('start')) == null ? false : sessionStorage.getItem('start')

let homeStarter = document.getElementById('nat-home')
let btnStart = document.getElementById('start-pass')
let navbarTop = document.getElementById('navbar-top')
let bands = document.getElementById('mat-bands')

if (!session) {
    sessionStorage.setItem('start', 'true');
    btnStart.onclick = () => {
        console.log('ok');
        diapo.scrollIntoView();
    }
} else {
    let el = document.getElementById("nat-home")
    document.body.removeChild(el)
}

// intersection observer

window.onload = () => {
    createObserver(homeStarter);
    createObserver(diapo);
    createObserver(bands);
}

function createObserver(element) {
    var observer;
    var options = {
        root: null,
        rootMargin: "-3px",
        threshold: buildThresholdList()
    };
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(element);
}

function buildThresholdList() {
    var thresholds = [];
    for (var i = 1.0; i <= 20.0; i++) {
        var ratio = i / 20.0;
        thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
        // console.log(`

        // ${entry.target.id}

        // `);
        // console.log(`intersectionRatio == ${entry.intersectionRatio}`);
        // console.log(`intersectionRect == ${entry.intersectionRect}`);
        // console.log(`boundingClientRect == ${entry.boundingClientRect}`);
        // console.log(`isIntersecting == ${entry.isIntersecting}`);
        // console.log(`rootBounds == ${entry.rootBounds}`);
        if (entry.target.id == "diapo") {
            if (entry.intersectionRatio > .5) {
                document.getElementById('diapo').classList.add('active')
                var check = 0
                for (const radio of radios) {
                    if (radio.checked) {
                        check++
                    }
                }
                if (check == 0) {
                    radios[0].click();
                    startDiapo()
                }
            }
            else {
                document.getElementById('diapo').classList.remove('active')
            }
        }
        if (entry.target.id == "mat-bands") {
            if (entry.intersectionRatio > .3) {
                document.getElementById('mat-bands').classList.add('active')
            }else{
                document.getElementById('mat-bands').classList.remove('active')
            }
        }
        if (entry.target.id == "nat-home") {
            if (!entry.isIntersecting) {
                // console.log(entry.target.id + "2")
                let el = document.getElementById(entry.target.id)
                if(el){
                    document.body.removeChild(el)
                    navbarTop.scrollIntoView()
                }
            }
        }
    });
}

var interval
function startDiapo() {
    clearInterval(interval)
    interval = setInterval(() => {
        for (const radio of radios) {
            if (radio.checked) {
                let i = radioName.indexOf(radio.classList[0]);
                // console.log(i);
                if (i + 1 == radios.length) {
                    i = 0
                } else {
                    i++
                }
                radios[i].click()
                break
            }
        }
    }, 12000);
}

// diapo

let diapo = document.getElementById('diapo')
var radios = document.getElementsByName('diapo');
let radioName = ["first", "second", "third"]

var diapoInterval

// radio button

for (const radio of radios) {
    radio.onchange = (e) => {
        let el = e.target.classList[0]
        let diapo = document.getElementById(el)

        for (const layout of radioName) {
            let el = document.getElementById(layout)
            el.classList.remove('active')
        }

        diapo.classList.add('active')
    }
}