import { card, moreButton, navBar } from '../js/component.js';
import { LOGOUT } from '../js/logout.js';
import { observer } from '../js/tooltip.js';

let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token')

if ((!isLogin || isLogin == null) || (!TOKEN || TOKEN == null)) {
   location.href = '../auth/login.html'
   localStorage.clear();
}

const profile = document.getElementById('avatar');
const firstName = document.getElementsByClassName('firstName')[0];
const lastName = document.getElementsByClassName('lastName')[0];
const content = document.querySelector('.content');
const email = document.querySelector('.email')

document.querySelector('header').innerHTML = navBar('', '', '../index.html', '../article/category/create_category.html', '#', true);

//* loading
const loading = document.querySelector('.loader');

function showLoading() {
   loading.style.display = "block";
}

<<<<<<< HEAD
loadProfile();
loadArticles(); 
=======
function hideLoading() {
   loading.style.display = "none";
}

//* for infinite scroll
let page = 1;
let isLoading = false;

window.addEventListener("scroll", () => {
   if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      getProfile();
   }
});

const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";

getProfile();

function getProfile() {
   fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${TOKEN}`
      }
   })
   .then(res => res.json())
   .then(res => {
      const data = res.data;
      profile.src = data.avatar;
      firstName.innerText = data.firstName;
      lastName.innerText = data.lastName;
      email.innerText = data.email;
      getOwnArticle();
   })
   
}

function getOwnArticle() {
   
   if (isLoading) return;
   isLoading = true;
   showLoading();
   
   fetch(`${BASE_URL}/articles/own?search=&_page=${page}&_per_page=100&sortBy=createdAt&sortDir=asc`, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${TOKEN}`
      }
   })
   .then(res => res.json())
   .then(res => {
      res.data.items.forEach(element => {
         content.innerHTML += card(
            profile.src,
            firstName.innerText,
            lastName.innerText,
            element.createdAt,
            element.title,
            element.content,
            element.thumbnail,
            element.category ? element.category.name : '',
            element.id,
            localStorage.getItem('userID')
         );
         const moreBtn = document.querySelectorAll(`#card-${element.id}`);
         // console.log(moreButton);
         moreBtn.forEach(more => {
            more.innerHTML = moreButton(element.id);
         })
      })
      page++;
      hideLoading()
      isLoading = false;
   })
}

const saveChange = document.querySelector('.change')

saveChange.onclick = () => {
   const firstName = document.getElementById('firstName').value
   const lastName = document.getElementById('lastName').value
   const email = document.getElementById('email').value

   if(!firstName || !lastName || !email) {
      return;
   }
   fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: { 
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
         firstName,
         lastName,
         email
      })
   })
   .then(res => res.json())
   .then(() => {
      location.reload();
   })
   .catch(err => console.error(err));
}


document.getElementById('edit').onclick = () => {
   const formData = new FormData();
   let avatarFile = document.getElementById("avatar_up");
   formData.append("avatar", avatarFile.files[0]);
   fetch(`${BASE_URL}/profile/avatar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      body: formData
   })
      .then(res => res.json())
      .then(data => {
         location.reload();
      })
}

document.getElementById('delete').onclick = () => {
   fetch(`${BASE_URL}/profile/avatar`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
   })
      .then(res => res.json())
      .then(data => {
         location.reload();
      })
}

// ? tool tip function
observer.observe(document.body, { childList: true, subtree: true });

// ? logout function
LOGOUT.observe(document.body, { childList: true, subtree: true });

>>>>>>> 67c67118ff5e9ea272346aea0f52e087eaf69946
