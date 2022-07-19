console.log("hello world nav.js");

// var options = {
//     root: document.getElementById('navbar-top'),
//     rootMargin: '0px',
//     threshold: 1.0
// }

// var callback = (entries, observer) => {
//     console.log("ok nav");
//     entries.forEach(entry => {
//         console.log(entry.boundingClientRect);
//         console.log(entry.intersectionRatio);
//         console.log(entry.intersectionRect);
//         console.log(entry.isIntersecting);
//         console.log(entry.rootBounds);
//         console.log(entry.target);
//         console.log(entry.time);
//       });
// }

// var observer = new IntersectionObserver(callback, options);

let navbar = document.getElementById('navbar-top')
let natHome = document.getElementById('nat-home')

var numSteps = 20.0;

window.onload = () => {
    createObserver(natHome);
}

function createObserver(element) {
    var observer;
    var options = {
        root: null,
        rootMargin: "0px",
        threshold: buildThresholdList()
    };
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(element);
}

function buildThresholdList() {
    var thresholds = [];
    for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps;
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

        if (entry.target.id == "nat-home" && !entry.isIntersecting) {
            document.body.removeChild(natHome)
            navbar.classList.toggle('active')
        }
    });
}