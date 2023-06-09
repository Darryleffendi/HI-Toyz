function start() {
    
}

var prevScroll = 0;
var translateY = 0;

document.addEventListener("scroll", (e) => {
    let scroll = document.documentElement.scrollTop;
    // console.log(scroll)

    let parallax_ref = document.querySelectorAll(".parallax");

    parallax_ref.forEach(ref => {
        ref.style.transform = `translateY(${scroll * ref.dataset.speedy}px)`;
    });

    let header = document.querySelector(".parallax-h");
    let headeropacity = parseFloat(window.getComputedStyle(header, null).getPropertyValue('opacity'));

    // If scroll down
    if(scroll > prevScroll) {
        if(headeropacity > 0.2) header.style.opacity = (headeropacity - 0.01);
    }
    else {
        if(headeropacity < 1) header.style.opacity = (headeropacity + 0.01);
    }

    if(scroll > 1100) {
        document.querySelector(".customer-div").style.marginTop = '-30vh';
        document.querySelector(".customer-img").style.marginTop = '-10vh';
        header.style.display = "none"

        if(scroll > prevScroll) {
            translateY = translateY + 0.5;
            customerImg = document.querySelectorAll(".customer-img");

            customerImg.forEach((elem) => {
                elem.style.transform = `translateY(${translateY}px)`
            })
        } else if(scroll < prevScroll && translateY >= 0) {
            translateY = translateY - 0.5;
            customerImg = document.querySelectorAll(".customer-img");

            customerImg.forEach((elem) => {
                elem.style.transform = `translateY(${translateY}px)`
            })
        }

    } else {
        document.querySelector(".customer-div").style.marginTop = '0';
        header.style.display = "block"
    }

    prevScroll = scroll
});

