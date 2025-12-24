let form_login = document.querySelector('#form_login')
let email = document.querySelector('#email')
let pws = document.querySelector('#pws')

form_login.onsubmit = () => {
    event.preventDefault()
    const baseUrl = "http://blogs.csm.linkpc.net/api/v1/auth/login"

    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: pws.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.result) {
            localStorage.setItem("token", res.data.token)
            location.href = "../index.html"
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