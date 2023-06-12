var userErr = false;
var emailErr = false;
var passErr = false;
var confirmErr = false;

function signUp() {
    let username = document.getElementById("username_regis").value;
    let password = document.getElementById("password_regis").value;
    let confirm = document.getElementById("password_confirm").value;
    let email = document.getElementById("email_regis").value;
    let agree = document.getElementById("agree").checked;

    let errorIUsername = document.getElementById("error_username");
    let errorEmail = document.getElementById("error_email");
    let errorPassword = document.getElementById("error_password");
    let errorConfirm = document.getElementById("error_confirm");
    let error = document.getElementById("error_signup");

    if(username.length == 0 || password.length == 0 || confirm.length == 0 || email.length == 0) {
        error.innerHTML = "Please fill in all the fields";
        return;
    }

    if(userErr || emailErr || passErr || confirmErr) {
        return;
    }

    if(!agree) {
        error.innerHTML = "You must agree to the terms of service";
        return;
    }

    error.style.display = "none";
    document.getElementById("success_signup").style.display = "block"

    addAccount(username, password, email);
    window.location.href = localStorage.getItem("previousPage");
}

function userInput() {
    let username = document.getElementById("username_regis").value;
    let errorUsername = document.getElementById("error_username");

    if(username.length == 0) {
        errorUsername.innerHTML = '&nbsp;';
        userErr = false;
        return;
    }

    if(findUsername(username) !== null) {
        errorUsername.innerHTML = "Username already exists";
        userErr = true;
        return;
    }

    if(username.length < 4) {
        errorUsername.innerHTML = "Username must be atleast 4 characters";
        userErr = true;
        return;
    }

    errorUsername.innerHTML = '&nbsp;';
    userErr = false;
}

function emailInput() {
    let email = document.getElementById("email_regis").value;
    let errorEmail = document.getElementById("error_email");

    if(email.length == 0) {
        errorEmail.innerHTML = '&nbsp;';
        emailErr = false;
        return;
    }

    if(!isEmail(email)) {
        errorEmail.innerHTML = "Email must be valid";
        emailErr = true;
        return;
    }

    errorEmail.innerHTML = '&nbsp;';
    emailErr = false;
}

function passwordInput() {
    let password = document.getElementById("password_regis").value;
    let errorPassword = document.getElementById("error_password");

    if(password.length == 0) {
        errorPassword.innerHTML = '&nbsp;';
        passErr = false;
        return;
    }

    if(password.length < 6) {
        errorPassword.innerHTML = "Password must be at least 6 characters";
        passErr = true;
        return;
    }

    // Custom function in script.js
    if(!(isAlphanumeric(password))) {
        errorPassword.innerHTML = "Password must contain upper lower case and numbers";
        passErr = true;
        return;
    }

    errorPassword.innerHTML = '&nbsp;';
    passErr = false;
}

function confirmInput() {
    let password = document.getElementById("password_regis").value;
    let confirm = document.getElementById("password_confirm").value;
    let errorConfirm = document.getElementById("error_confirm");

    if(confirm.length == 0) {
        errorConfirm.innerHTML = '&nbsp;';
        confirmErr = false;
        return;
    }

    if(password !== confirm) {
        errorConfirm.innerHTML = "Passwords do not match";
        confirmErr = true;
        return;
    }

    errorConfirm.innerHTML = '&nbsp;';
    confirmErr = false;
}