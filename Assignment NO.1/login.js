const form = document.getElementById("loginForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");


togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }

});

// Login
form.addEventListener("submit", function (e) {

    e.preventDefault();

    popup.style.display = "flex";

});

// Close Popup
closePopup.addEventListener("click", function () {

    popup.style.display = "none";

   
    form.reset();

    // Hide password again
    password.type = "password";
    togglePassword.textContent = "Show";

});