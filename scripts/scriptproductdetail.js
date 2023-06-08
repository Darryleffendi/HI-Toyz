var product = {};

async function start() {

    // Wait for JSON to finish fetching
    while(productList["bandai"] === undefined) {
        await sleep(1);
    }

    product = getProductByID(localStorage.getItem("ProductID"));

    document.querySelector(".product-name").innerHTML = product.name;
    document.querySelector(".product-brand").innerHTML = product.brand;
    document.querySelector(".product-category").innerHTML = getProductCategory(product.id);
    document.querySelector(".product-price").innerHTML = rupiah(product.price);
    document.querySelector(".product-description").innerHTML = product.description;
    document.querySelector(".product-head").innerHTML = 
        "<p class=\"font-p inline\">"+ product.brand +" / </p> <p class=\"font-p fc-white inline\">"+ getProductCategory(product.id) +"</p>"
    document.querySelector(".sold-div").innerHTML = numToK(product.sold) + ' purchases';
    document.querySelector(".img-btn1").src = product.image;
    document.querySelector(".img-btn2").src = product.image2;
    selectImage(1);
    getRating(product.rating, ".rate-div")
}

var imageSelected = 1;

function selectImage(imgId) {
    if(imgId == 1) {
        document.querySelector(".product-img").src = product.image;
        document.querySelector(".img-btn1").style.border = "1.5px solid #e45926a3";  
        document.querySelector(".img-btn2").style.border = "none";  
    }
    else if(imgId == 2) {
        document.querySelector(".product-img").src = product.image2;
        document.querySelector(".img-btn2").style.border = "1.5px solid #e45926a3";
        document.querySelector(".img-btn1").style.border = "none";  
    }
}