function start() {
    fetchJSON()
    parallax_ref = document.querySelectorAll(".parallax-layer");
    document.querySelector("nav").style.opacity = "0%";
    parallaxMove({
        'clientX' : window.innerWidth / 2,
        'clientY' : window.innerHeight / 2
    });
}

/* =========== Parallax Scripts =========== */

var parallax_ref;
var parallax_enable = 1;
var scroll_pos = 0;

window.addEventListener("mousemove", (e) => {
    if(parallax_enable == 1) parallaxMove(e);    
});

function parallaxMove(e) {
    // Update x & y pos
    let xPos = e.clientX - window.innerWidth / 2; 
    let yPos = e.clientY - window.innerHeight / 2;
    
    // Change every parallax layer pos
    parallax_ref.forEach((ref) => {
        ref.style.transform = `translateX(calc(-100% + ${xPos * ref.dataset.speedx}px)) translateY(calc(-100% + ${yPos * ref.dataset.speedy}px))`;
    });
}

/* =========== SCROLL HANDLER =========== */

var prev_scroll = 0;

window.addEventListener("scroll", (e) => {
    let scroll_top = document.documentElement.scrollTop;
    let timeline_top = document.querySelector(".timeline-div").offsetTop
    // console.log(scroll_top + " ==  " + scroll_pos)

    /* --- Content ---*/
    if(scroll_top > 60 && scroll_pos == 0) {
        document.querySelector(".home-content").style.marginTop = "0vh";
        scroll_pos = 1;
        sleep(200).then(() => {
            document.querySelector(".product-div").style.marginTop = "0vh";
            document.querySelector(".product-div").style.opacity = "100%";
            sleep(200).then(() => {
                document.querySelector("nav").style.opacity = "100%";
            })
        })
    } 
    else if(scroll_top <= 60) {
        scroll_pos = 0;
        document.querySelector(".home-content").style.marginTop = "120vh";
        document.querySelector("nav").style.opacity = "0%";
        document.querySelector(".product-div").style.marginTop = "10vh";
        document.querySelector(".product-div").style.opacity = "0%";
        getFeatured("hide");
    } 
    
    /* --- Parallax ---*/
    if(scroll_top > 350) {
        document.querySelector(".parallax").style.display = "none";
        parallax_enable = 0;
    } 
    else {
        document.querySelector(".parallax").style.display = "block";
        parallax_enable = 1;
    }
    
    /* --- Featured ---*/
    if(scroll_top > 750 && scroll_pos == 1) {
        scroll_pos = 2;
        getFeatured("show_only");
    } else if(scroll_pos == 2 && document.querySelector(".featured-slider").innerHTML.length == 0) {
        getFeatured("show_only");
    } else if(scroll_top <= 750 && scroll_pos == 2) {
        scroll_pos = 1
    }

    
    /* --- Timeline --- */
    if(scroll_top >= 1200 && scroll_pos == 2) {
        scroll_pos = 3
        document.querySelector(".timeline-div").style.opacity = "100%";
        document.querySelector(".timeline").style.transform = "none";
    } else if(scroll_top < 1200 && scroll_pos > 2) {
        scroll_pos = 2
        document.querySelector(".timeline-div").style.opacity = "0%";
        document.querySelector(".timeline").style.transform = "none";
    }

    if(scroll_top >= timeline_top && scroll_pos == 3) {
        scroll_pos = 4;
        
        document.querySelector(".timeline-div").style.position = "fixed";
        document.querySelector(".timeline-div").style.left = "0vw";
        document.querySelector(".timeline-div").style.top = "0vh";
    } 
    else if(scroll_top > 1900 && scroll_top < 4000 && scroll_pos == 4) {
        // Get timeline element
        let timeline = document.querySelector(".timeline")
        let timelineX = 0;

        // Get translateX style property
        let timeline_style = window.getComputedStyle(timeline)
        let matrix = timeline_style.transform || timeline_style.webkitTransform || timeline_style.mozTransform
        
        if(matrix === 'none') {
            timelineX = 0;
        } else {
            let matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
            timelineX = matrixValues[4]
        }

        console.log(scroll_top + " ==  " + timelineX)

        
        // If scroll down
        if(scroll_top > prev_scroll) {
            if(timelineX >= -1700) timeline.style.transform = `translateX(calc(${timelineX}px - 0.3vw - 10px))`;
        }
        // If scroll up
        else {
            if (timelineX <= 0) timeline.style.transform = `translateX(calc(${timelineX}px + 0.3vw + 12px))`;
        }
    }
    else if(scroll_top <= 1700 && scroll_pos == 4) {
        scroll_pos = 3;
        document.querySelector(".timeline-div").style.position = "relative";
    }

    if(scroll_top >= 3280) {
        document.querySelector(".timeline-div").style.top = "-40vh";
    } else {
        document.querySelector(".timeline-div").style.top = "0";
    }

    prev_scroll = scroll_top;
})

/* =========== Featured Product Scripts =========== */

async function getFeatured(args) {

    let featured_ref = document.querySelector(".featured-slider");

    if(args == 'hide') {
        featured_ref.innerHTML = "";
        return;
    }

    // If there are previous FeatureItem, hide
    if(featured_ref.innerHTML.length > 0) {

        if(args == 'show_only') return;

        exitFeatured();
        await sleep(750);
    }

    let featureList = [];

    for(let i = 1; i <= 4; i ++) {
        
        // Prevent Duplicate Products
        let id;
        do {
            id = Math.floor(Math.random() * 29)
        } while(idExists(id, featureList))

        // Get product details, append to list
        let product = getProductByID(id)
        featureList.push(product);
        
        // Manipulate DOM
        featured_ref.innerHTML = featured_ref.innerHTML +
        "<div class=\"featured-item-" + i + " featured-item transition-2 wrap\" onclick=\"gotoDetails(" + id + ")\">" +
            "<div>" +
                "<img src=\""+ product.image +"\">" +
                "<h1 class=\"font-h fs-s mb-0\">" + product.name + "</h1>" +
                "<p class=\"font-p fs-xs m-0\">" + product.brand + "</p>" +
            "</div>" +
            "<p class=\"font-main fs-xs featured-price transition-2s\">" + rupiah(product.price) + "</p>" +
        "</div>"
    }

    // Animate Entrance
    sleep(10).then(() => {
        enterFeatured();
    })
}

async function exitFeatured() {

    // Hide feature price
    toggleFeaturePrice("0%");
    
    for(let i = 1; i <= 4; i ++) {
        // Animate exit one by one
        document.querySelector(".featured-item-" + i).style.marginTop = "-90vh";
        document.querySelector(".featured-item-" + i).style.opacity = "0%";
        await sleep(125);
    }
    await sleep(200);

    // Empty DOM sub-tree
    document.querySelector(".featured-slider").innerHTML = "";
}

async function enterFeatured() {

    for(let i = 1; i <= 4; i ++) {
        // Animate entrance one by one
        document.querySelector(".featured-item-" + i).style.marginTop = "0vh";
        document.querySelector(".featured-item-" + i).style.opacity = "100%";
        await sleep(125);
    }
    // Show feature price
    toggleFeaturePrice("100%");
}

function toggleFeaturePrice(opacity) {
    let price_ref = document.querySelectorAll(".featured-price");

    // Change the opacity of every price
    price_ref.forEach((elem) => {
        elem.style.opacity = opacity;
    })
}