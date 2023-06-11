/* ========= Product Handler ========= */

var productList = {};

fetchJSON();

function fetchJSON() {
    fetch("scripts/product.json")
    .then(response => response.json())
    .then(json => {
        productList = json;
    })
}

function getProductByID(id) {
    let searchList = [];
    let found = undefined;

    if(id >= 0 && id <= 14) {
        if(id < 9) searchList = productList["bandai"]["gundam"]
        else searchList = productList["bandai"]["pokemon"]
    }
    else if(id >= 15 && id <= 21) {
        if(id < 20) searchList = productList["tamiya"]["rc-car"]
        else searchList = productList["tamiya"]["track"]
    }
    else if(id >= 22 && id <= 28) {
        if(id < 27) searchList = productList["mini-gt"]["miniature-car"]
        else searchList = productList["mini-gt"]["display"]
    }

    searchList.forEach(elem => {
        if(elem["id"] == id) {
            found = elem;
            return; // Break from forEach
        }
    });

    return found;
}

function idExists(id, prodlist) {
    if(prodlist === null || prodlist === undefined) return

    for(let i = 0; i < prodlist.length; i ++) {
        if(prodlist[i]["id"] == id) return true;
    }
    return false;
}

function getProductByName(name) {
    for(let i = 0; i < 29; i ++) {
        let product = getProductByID(i);

        if(product["name"] == name) return product;
    }
    return false;
}

function getProductBySubstr(name) {
    let searchedList = [];

    for(let i = 0; i < 29; i ++) {
        let product = getProductByID(i);

        if(product["name"].toLowerCase().includes(name.toLowerCase())) searchedList.push(product);
    }
    return searchedList;
}

function getProductCategory(id) {
    if(id >= 0 && id <= 14) {
        if(id < 9) return "Gundam"
        return "Pokemon"
    }
    else if(id >= 15 && id <= 21) {
        if(id < 20) return "RC-Car"
        return "Track"
    }
    else if(id >= 22 && id <= 28) {
        if(id < 27) return "Miniature Car"
        else return "Display"
    }
}

function gotoDetails(id) {
    
    if(id == -1) return;

    localStorage.setItem("ProductID", id);
    window.location.href="productDetail.html";
}

function getRating(rating, className) {
    let rateDiv = document.querySelector(className);
    let i = 0

    for(; i < Math.round(rating); i ++) {
        rateDiv.innerHTML = rateDiv.innerHTML +
        "<img src=\"./assets/rate_active.png\" class=\"star-rate\">"
    }

    for(; i < 5; i ++) {
        rateDiv.innerHTML = rateDiv.innerHTML +
        "<img src=\"./assets/rate.png\" class=\"star-rate\">"
    }
}

/* ========= Account Handler ========= */

var accountList = [{
    "username": undefined,
    "password": undefined,
    "email": "google mail",
    "cart": []
}];


let fetched = localStorage.getItem("accountList");
if(fetched !== null) {
    accountList = JSON.parse(fetched);
} else {
    localStorage.setItem("accountList", JSON.stringify(accountList));
}

function findUsername(username) {
    for(let i = 0; i < accountList.length; i ++) {
        if(accountList[i].username === username) {
            return accountList[i];
        }
    }
    return null;
}

function addAccount(username, password, email) {
    accountList.push({
        "username": username,
        "password": password,
        "email": email,
        "cart": []
    });
    localStorage.setItem("accountList", JSON.stringify(accountList));
}

/* ========= Misc Functions ========= */

function sleep(miliseconds) {
    sleepVal = new Promise((resolve) => {
        setTimeout(resolve, miliseconds)
    });
    return sleepVal;
}

function rupiah(amount) {
    return "Rp."+amount.toLocaleString()
}

function numToK(amount) {
    amount = parseFloat(amount / 1000).toFixed(1)
    return amount + 'k'
}

function isAlphanumeric(a) {
    let upper = false;
    let lower = false;
    let num = false;

    for(let i = 0; i < a.length; i ++) {
        if(a.charCodeAt(i) > 64 && a.charCodeAt(i) < 91) {
            upper = true;
        }
        else if(a.charCodeAt(i) > 96 && a.charCodeAt(i) < 123) {
            lower = true;
        }   
        else if(a.charCodeAt(i) > 47 && a.charCodeAt(i) < 58) {
            num = true;
        }
    }
    if(upper && lower && num) {
        return true
    }
    return false
}

/* ============== Signin Overlay =============== */

var overlayShown = 0;

function showOverlay(args) {
    
    if(args == 'open') {
        document.querySelector(".overlay-div").style.display = "flex";
        document.querySelector(".login-div").style.display = "flex";
        sleep(10).then(() => {
            document.querySelector(".overlay-div").style.opacity = "1";
            document.querySelector(".login-div").style.opacity = "1";
            document.querySelector(".login-div").style.marginTop = "0vh";
            document.getElementById("success_login").style.display = "none"
            document.getElementById("error_login").style.display = "block"
            overlayShown = 1;
        })
    }
    else if(args == 'close') {
        document.querySelector(".login-div").style.marginTop = "120vh";
        document.querySelector(".overlay-div").style.opacity = "0";
        overlayShown = 0;
        sleep(400).then(() => {
            document.querySelector(".overlay-div").style.display = "none";
        });
    }
}

function changeOverlay(args) {
    localStorage.setItem("previousPage", args);

    window.location.href="register.html";
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error_login");

    if(username.length == 0 || password.length == 0) {
        error.innerHTML = "Please fill in all the fields";
        return;
    }

    let user = findUsername(username)

    if(user === null) {
        error.innerHTML = "Username does not exist";
        return;
    }
    if(user.password !== password) {
        error.innerHTML = "Incorrect password";
        return;
    }

    error.style.display = "none";
    document.getElementById("success_login").style.display = "block"

    sleep(300).then(() => {
        showOverlay('close');
    })
}

/* =========== KEYPRESS HANDLER =========== */
window.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        if(overlayShown == 1) {
            login();
        }
        else if(overlayShown == 2) {
            signUp();
        }
    }
    else if(e.key === "Escape") {
        if(overlayShown == 1 || overlayShown == 2) {
            showOverlay('close');
        }
    }
});