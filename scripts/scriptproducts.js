function start() {
    fetchJSON()
}

var scroll_pos = 0;

/* Brand Filters */
var bandai_filter = false;
var tamiya_filter = false;
var minigt_filter = false;

document.addEventListener("DOMContentLoaded", async function(){
    let bgClass = document.querySelectorAll('.bg-col-dark-gray');
    
    bgClass.forEach(elem => {
        elem.style.backgroundColor = '#191a16';
        elem.classList.add("transition");
    });

    // Wait for JSON to finish fetching
    while(productList["bandai"] === undefined) {
        await sleep(1);
    }
    getProducts();

    
    /* ---- Search ----- */

    document.querySelector("#content-search").addEventListener("input", function() {
        let search = document.querySelector("#content-search").value;
        let content = document.querySelector(".product-content"); 
        let flexItem = document.querySelector(".product-card");   
    
        if(search === "") return getProducts();

        let columns = Math.floor(content.offsetWidth / flexItem.offsetWidth);
        
        let contentHtml =  mapToHTML(getProductBySubstr(search), "");
        contentHtml =  pseudoProduct(columns, contentHtml);

        content.innerHTML = contentHtml
    
    });
});

window.addEventListener("scroll", (e) => {
    // console.log(document.documentElement.scrollTop)
    /* --- Content ---*/
    if(document.documentElement.scrollTop > 60 && scroll_pos == 0) {
        document.querySelector(".content").style.marginTop = "0vh";
        document.querySelector(".video-div h1").style.marginTop = "-40vh";
        document.querySelector("nav").style.backgroundColor = "#181815";
        document.querySelector(".video-div video").style.width = "140vw";

        sleep(400).then(() => {
            document.querySelector(".search-wrapper").style.marginTop = "calc(15vh - 2px)";
            let bgClass = document.querySelectorAll('.bg-col-dark-gray');
    
            bgClass.forEach(elem => {
                elem.style.backgroundColor = '#272726';
            });
        })
        scroll_pos = 1;
    }
    else if(document.documentElement.scrollTop <= 60) {
        scroll_pos = 0;
        document.querySelector("nav").style.backgroundColor = "#191a1600";
        document.querySelector(".video-div video").style.width = "100vw";
        document.querySelector(".content").style.marginTop = "120vh";
        document.querySelector(".video-div h1").style.marginTop = "0vh";

        document.querySelector(".search-wrapper").style.marginTop = "0vh";
        let bgClass = document.querySelectorAll('.bg-col-dark-gray');

        bgClass.forEach(elem => {
            elem.style.backgroundColor = '#191a16';
        });
    }
});

function getProducts() {
    let content = document.querySelector(".product-content");
    content.innerHTML = ' ';

    let bandai = bandai_filter;
    let tamiya = tamiya_filter;
    let minigt = minigt_filter;

    if(!bandai && !tamiya && !minigt) {
        bandai = true;
        tamiya = true;
        minigt = true;
    }

    let contentHtml = '';

    if(bandai) {
        contentHtml = mapToHTML(productList["bandai"]["gundam"], contentHtml)
        contentHtml = mapToHTML(productList["bandai"]["pokemon"], contentHtml)
    }
    if(tamiya) {
        contentHtml = mapToHTML(productList["tamiya"]["rc-car"], contentHtml)
        contentHtml = mapToHTML(productList["tamiya"]["track"], contentHtml)
    }
    if(minigt) {
        contentHtml = mapToHTML(productList["mini-gt"]["miniature-car"], contentHtml)
        contentHtml = mapToHTML(productList["mini-gt"]["display"], contentHtml)
    }
    
    content.innerHTML = contentHtml;

    // Calculate the number of columns in one row
    let flexItem = document.querySelector(".product-card");    
    let columns = Math.floor(content.offsetWidth / flexItem.offsetWidth);

    contentHtml = pseudoProduct(columns, contentHtml);

    content.innerHTML = contentHtml;
}

function mapToHTML(arr, stringHtml) {

    arr.forEach((product) => {
        stringHtml = stringHtml +
        "<div class=\"product-card mb-5\" onclick=\"gotoDetails(" + product.id + ")\">" +
            "<img alt=\""+ product.name +"\" src=\"" + product.image +"\">" +
            "<p class=\"font-h fs-xs mb-0\">" + product.name + "</p>" +
            "<p class=\"font-p fs-xs\">" + rupiah(product.price) + "</p>" +
        "</div>"
    });

    return stringHtml;
}

function pseudoProduct(amount, stringHtml) {

    for(let i = 0; i < amount; i ++) {
        stringHtml = stringHtml +
        "<div class=\"product-card mb-5 pseudo-product\">" +
        "</div>"
    }

    return stringHtml;
}

function changeProducts(args) {
    if(args === 'bandai') bandai_filter = !bandai_filter;
    if(args === 'tamiya') tamiya_filter = !tamiya_filter;
    if(args === 'minigt') minigt_filter = !minigt_filter;
    productButtonStyle();
    getProducts();
}

function productButtonStyle() {
    if(bandai_filter) {
        document.querySelector(".bandai-btn").style.backgroundColor = "#313130";
    } else {
        document.querySelector(".bandai-btn").style.backgroundColor = "transparent";
    }

    if(tamiya_filter) {
        document.querySelector(".tamiya-btn").style.backgroundColor = "#313130";
    } else {
        document.querySelector(".tamiya-btn").style.backgroundColor = "transparent";
    }

    if(minigt_filter) {
        document.querySelector(".minigt-btn").style.backgroundColor = "#313130";
    } else {
        document.querySelector(".minigt-btn").style.backgroundColor = "transparent";
    }
}


