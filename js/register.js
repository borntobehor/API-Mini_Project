
let form_register = document.querySelector('#form_register')
let fname = document.querySelector('#fname')
let lname = document.querySelector('#lname')
let email = document.querySelector('#email')
let pws = document.querySelector('#pws')
let cpws = document.querySelector('#cpws')
let result = document.querySelector('#result')
let fname_err= document.querySelector('#fn')
let lname_err= document.querySelector('#ln')
let email_err= document.querySelector('#em')
let pws_err= document.querySelector('#ps')
let cpws_err= document.querySelector('#cps')
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

form_register.onsubmit = () => {
    event.preventDefault()
    if (fname.value === ""){
        fname_err.classList.remove("d-none")
        fname_err.innerHTML = "First name is required"
    }
    
    if (!lname.value){
        lname_err.classList.remove('d-none')
        lname_err.innerHTML = "Last name is required"
    }

    if (!email.value){
        email_err.classList.remove('d-none')
        email_err.innerHTML = "Email is required"
    }

    if (!pws.value){
        pws_err.classList.remove('d-none')
        pws_err.innerHTML= "Password is required"
    }

    if (!cpws.value){
        cpws_err.classList.remove('d-none')
        cpws_err.innerHTML= "Confrim Password is required"
    }
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
