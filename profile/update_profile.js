const token = localStorage.getItem("token");
if (!token) location.href = "../auth/login.html";

const form = document.querySelector('#form_update');

form.onsubmit = (e) => {
    e.preventDefault();

    const baseURL = "http://blogs.csm.linkpc.net/api/v1";

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;

    fetch(baseURL + '/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email
        })
    })
    .then(res => res.json())
    .then(data => {

    })
    .catch(err => console.error(err));
}