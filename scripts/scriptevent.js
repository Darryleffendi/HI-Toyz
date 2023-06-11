function start() {
    switchCard();
}

setInterval(switchCard, 5000);

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
        document.querySelector(".discount-cards").style.marginTop = "25vh";
    }

    if(scroll >= 480) {
        document.querySelector(".slider-wrapper").style.marginTop = "0vh";
    } else {
        document.querySelector(".slider-wrapper").style.marginTop = "25vh";
    }
});

function redeemCode() {
    document.querySelector(".invalid-discount").style.display = "block";
}

var cardIndex = 0;

function switchCard() {

    let prevIndex = cardIndex;
    cardIndex += 1;

    if(cardIndex > 3) cardIndex = 1;

    let card = document.querySelector("#event-" + cardIndex);
    let btn = document.querySelector(".slider-btn-" + cardIndex);
    let allCard = document.querySelectorAll(".event-card");

    card.style.marginLeft = "80vw";
    card.style.display = "block";
    btn.style.backgroundColor = "#E45826";

    sleep(10).then(() => {
        allCard.forEach(element => {
            let margin = parseInt(element.style.marginLeft)

            if(margin === NaN) margin = 0;

            element.style.marginLeft = (margin - 80) + 'vw';
        });
    });

    if(prevIndex != 0) {
        
        let prevCard = document.querySelector("#event-" + prevIndex);
        let prevBtn = document.querySelector(".slider-btn-" + prevIndex);
        prevBtn.style.backgroundColor = "#3c3c3b";
        sleep(600).then(() => {
            prevCard.style.display = "none";
        })
    }
}