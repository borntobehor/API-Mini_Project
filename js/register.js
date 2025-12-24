
let form_register = document.querySelector('#form_register')
let fname = document.querySelector('#fname')
let lname = document.querySelector('#lname')
let email = document.querySelector('#email')
let pws = document.querySelector('#pws')
let cpws = document.querySelector('#cpws')

form_register.onsubmit = () => {
    event.preventDefault()
    const baseUrl = "http://blogs.csm.linkpc.net/api/v1/auth/register"
    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: fname.value,
            lastName: lname.value,
            email: email.value,
            password: pws.value,
            confirmPassword: cpws.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.result) {
            location.href = "../auth/login.html"
        } else {
            res.message
        }
    })
}

function password_show_hide() {
    let x = document.getElementById("pws");
    let hide_eye = document.getElementById("hide_eye");
    let show_eye = document.getElementById("show_eye");

    if (x.type === "password") {
        x.type = "text";
        hide_eye.classList.add("d-none");
        show_eye.classList.remove("d-none");
    } else {
        x.type = "password";
        hide_eye.classList.remove("d-none");
        show_eye.classList.add("d-none");
    }
}
function password_show_hides() {
    let x = document.getElementById("cpws");
    let hide_eye = document.getElementById("hide_eyes");
    let show_eye = document.getElementById("show_eyes");

    if (x.type === "password") {
        x.type = "text";
        hide_eyes.classList.add("d-none");
        show_eyes.classList.remove("d-none");
    } else {
        x.type = "password";
        hide_eyes.classList.remove("d-none");
        show_eyes.classList.add("d-none");
    }
}
