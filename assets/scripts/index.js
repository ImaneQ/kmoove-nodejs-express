import './form.js'
import './nav.js'
// manage starting page
var session = (sessionStorage.getItem('start')) == null ? false : sessionStorage.getItem('start')

let homeStarter = document.getElementById('nat-home')
let btnStart = document.getElementById('start-pass')
let navbarTop = document.getElementById('navbar-top')
let bands = document.getElementById('mat-bands')
let k = document.getElementById('mat-k')
let titlePrereq = document.getElementById('mat-prerequisite')
let benefices = document.getElementById('mat-benefices')
// let bandsColors = document.querySelectorAll('.band-color')

if (!session) {
    homeStarter.style.display = "block"
    homeStarter.style.visibility = "visible"
    sessionStorage.setItem('start', 'true');
    btnStart.onclick = () => {
        console.log('ok');
        diapo.scrollIntoView();
    }
    // nathan
    const pinkGrid = document.querySelector('.pinkGrid');
    const pinkGridRight = document.querySelector('.pinkGrid--Right');
    const pinkGridLeft = document.querySelector('.pinkGrid--Left');
    const homeAnim = document.querySelector('.home-anim');
    let rightLines = 10;
    const horyzontalLines = 12;

    for (let i = 0; i < rightLines; i++) {
        const rightLine = document.createElement('div');
        rightLine.classList.add(`lineRight`, `lineRight-${i + 1}`);
        pinkGridRight.appendChild(rightLine);
    }

    for (let i = rightLines; i > 0; i--) {
        const leftLine = document.createElement('div');
        leftLine.classList.add(`lineLeft`, `lineLeft-${i}`);
        pinkGridLeft.appendChild(leftLine);
    }

    for (let i = horyzontalLines; i > 0; i--) {
        const hLine = document.createElement('div');
        hLine.classList.add(`hLine`, `hLine-${i}`);
        pinkGrid.appendChild(hLine);
        if (i > 9) {
            hLine.style.background = '#f0086a';
        } else if (i > 6) {
            hLine.style.background =
                'linear-gradient(90deg, rgba(25,25,112,1) -10%, rgba(240,8,106,1) 50%, rgba(25,25,112,1) 110%)';
        } else {
            hLine.style.background = `linear-gradient(90deg, rgba(25,25,112,0.1) 0%, rgba(240,8,106,1) 50%, rgba(25,25,112,0.1) 100%)`
        }
    }
} else {
    homeStarter.style.display = "none"
    homeStarter.style.visibility = "hidden"
    document.body.removeChild(homeStarter)
}


// intersection observer
// console.log(`

// ${entry.target.id}

// `);
// console.log(`intersectionRatio == ${entry.intersectionRatio}`);
// console.log(`isIntersecting == ${entry.isIntersecting}`);
// console.log(`intersectionRect == ${entry.intersectionRect.y}`);
// console.log(`boundingClientRect == ${entry.boundingClientRect.y}`);
// console.log(`rootBounds == ${entry.rootBounds}`);

window.onload = () => {
    createObserver(homeStarter);
    createObserver(diapo);
    createObserver(bands);
    createObserver(k);
    createObserver(titlePrereq);
    // createObserver(benefices);
    // for (let band of bandsColors) {
    //     createObserver(band);
    // }
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
    for (var i = 1.0; i <= 50.0; i++) {
        var ratio = i / 50.0;
        thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
}

function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
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
            } else {
                document.getElementById('mat-bands').classList.remove('active')
            }
        }
        if (entry.target.id == "nat-home") {
            if (!entry.isIntersecting) {
                // console.log(entry.target.id + "2")
                let el = document.getElementById(entry.target.id)
                if (el) {
                    document.body.removeChild(el)
                    navbarTop.scrollIntoView()
                }
            }
        }
        if (entry.target.id == "mat-k") {
            if (entry.isIntersecting) {
                let midPage = window.scrollY + window.innerHeight / 2
                let midEl = window.scrollY + entry.boundingClientRect.top + entry.boundingClientRect.height / 2
                if (midEl < midPage) {
                    let ratio = midPage / midEl
                    ratio = ratio % 1
                    ratio = Math.round(ratio * 100)
                    let letterK = document.getElementById('letterK')
                    letterK.style.transform = `rotate(${ratio * 2}deg) translate(${ratio / 2}%, ${ratio / 4}%)`
                } else {
                    let letterK = document.getElementById('letterK')
                    letterK.style.transform = `rotate(0deg) translate(0%, 0%)`
                }
            }
        }
        if (entry.target.id == "mat-prerequisite") {
            if (entry.intersectionRatio > 0.55) {
                let title = document.getElementById('prerequisitesTitle')
                let prereq = document.getElementById('prerequisites')
                title.classList.add('active')
                setTimeout(() => {
                    prereq.classList.add('active')
                }, 500)
            }
        }
        // if (entry.target.classList.contains("band-color")) {
        //     if (entry.isIntersecting) {
        //         let el = document.getElementById(entry.target.id)
        //         el.classList.add('active')
        //         if(el.id == 5) {
        //             benefices.classList.add('active')
        //         }
        //     }
        //     else{
        //         let el = document.getElementById(entry.target.id)
        //         el.classList.remove('active')
        //     }
        // }
        // if (entry.target.id == "mat-benefices") {
        //     // if (entry.isIntersecting) {
        //         // console.log(entry.boundingClientRect.top);
        //         // if (entry.boundingClientRect.top <= 100) {
        //             // document.body.style.overflow = "hidden"
        //             // benefices.scrollIntoView()
        //             // setTimeout(() => {
        //             //     disableScroll()
        //             // }, 1000)
        //         // }
        //         // else{
        //             // document.body.style.overflow = "hidden"
        //             // enableScroll()
        //         // }
        //     // }
        // }
    });
}

// diapo

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

// disanble scroll

function disableScroll() {
    let scrollTop = window.pageYOffset;
    let scrollLeft = window.pageXOffset;
    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}