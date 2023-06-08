function start() {
    
}

var prevScroll = 0;

document.addEventListener("scroll", (e) => {
    let scroll = document.documentElement.scrollTop;

    let parallax_ref = document.querySelectorAll(".parallax");

    parallax_ref.forEach(ref => {
        ref.style.transform = `translateY(${scroll * ref.dataset.speedy}px)`;
    });

    let header = document.querySelector(".parallax-h");
    let headeropacity = parseFloat(window.getComputedStyle(header, null).getPropertyValue('opacity'));

    console.log(headeropacity)
    // If scroll down
    if(scroll > prevScroll) {
        if(headeropacity > 0.2) header.style.opacity = (headeropacity - 0.01);
    }
    else {
        if(headeropacity < 1) header.style.opacity = (headeropacity + 0.01);
    }

    prevScroll = scroll
});

