// let navbarTop = document.getElementById('navbarTop')
let burger = document.getElementById('toggleBurger')
let navbarLinks = document.getElementById('navbarLinks')
let langages = document.getElementById('langages')
let langagesMob = document.getElementById('langagesMob')
let scrollToTop = document.getElementById('scrollToTop')
let navbarTop = document.getElementById('navbar-top')

burger.onclick = () => {
    burger.classList.toggle('active')
    navbarLinks.classList.toggle('active')
}

langages.onclick = () => {
    langages.classList.toggle('active')
}

langagesMob.onclick = () => {
    langagesMob.classList.toggle('active')
}

scrollToTop.onclick = () => {
    document.body.scrollIntoView()
    setTimeout(() => {
        scrollToTop.classList.remove('active');
    }, 1000)
}

var lastScrollTop = 0;

window.onscroll = () => {

    navbarTop.classList.toggle('sticky', window.scrollY > 50)

    var st = window.pageYOffset || document.documentElement.scrollTop;
    
    if (st > lastScrollTop) {
        scrollToTop.classList.remove('active');
        if(window.pageYOffset >= 500){
            navbarTop.classList.remove('active')
        }
        else{
            navbarTop.classList.add('active')
        }
    } else {
        if (window.pageYOffset >= 250) {
            scrollToTop.classList.add('active');
        }
        else {
            scrollToTop.classList.remove('active');
        }
        navbarTop.classList.add('active')
    }
    lastScrollTop = st <= 0 ? 0 : st;
    scrollToTop.style.transform = `rotate(${window.pageYOffset / 2}deg)`
};