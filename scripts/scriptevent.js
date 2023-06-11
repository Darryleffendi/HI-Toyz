document.addEventListener("scroll", (e) => {
    let scroll = document.documentElement.scrollTop;
    // console.log(scroll)

    if(scroll > 60) {
        document.querySelector("nav").style.backgroundColor = "#181815ea";
        document.querySelector("nav").style.backdropFilter = "blur(5px)";
        document.querySelector(".discount-cards").style.marginTop = "0vh";
    }
    else if(scroll <= 60) {
        document.querySelector("nav").style.backgroundColor = "#191a1600";
        document.querySelector("nav").style.backdropFilter = "none";
        document.querySelector(".discount-cards").style.marginTop = "15vh";
    }
});

function redeemCode() {
    document.querySelector(".invalid-discount").style.display = "block";
}