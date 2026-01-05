let form_login = document.querySelector('#form_login')
let email = document.querySelector('#email')
let pws = document.querySelector('#pws')
let result = document.querySelector('#result')
let email_err = document.querySelector('#em')
let pws_err = document.querySelector('#ps')
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token');

if (isLogin && (TOKEN != null || TOKEN)) {
   location.href = '../index.html'
}

form_login.onsubmit = () => {
    event.preventDefault()
    if (!email.value) {
        email_err.classList.remove('d-none')
        email_err.innerHTML = "Email is required"
    }

    if (!pws.value) {
        pws_err.classList.remove('d-none')
        pws_err.innerHTML = "Password is required"
    }

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
                localStorage.setItem('isLogin', true);
                localStorage.setItem('userID', res.data.user.id)
                location.href = "../index.html"
            } else {
                if (toastTrigger) {
                    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                    toastBootstrap.show()
                    result.innerHTML = res.message
                }
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