import { card, navBar } from './component.js';
import { LOGOUT } from './logout.js';
import { observer } from './tooltip.js';

let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token')

if ((!isLogin || isLogin == null) || (!TOKEN || TOKEN == null)) {
   location.href = '../auth/login.html'
   localStorage.clear();
}

document.querySelector('header').innerHTML = navBar('', '', '../index.html', '../article/category/create_category.html', '../profile/profile.html', true);

//* loading
const loading = document.querySelector('.loader');

function showLoading() {
   loading.style.display = "block";
}

function hideLoading() {
   loading.style.display = "none";
}

//* for infinite scroll
let page = 1;
let isLoading = false;

window.addEventListener("scroll", () => {
   if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      fetchAll();
   }
});

const profile = document.getElementById('avatar');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const content = document.querySelector(".content");

const creatorID = sessionStorage.getItem('creatorID');
const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";


if (creatorID === localStorage.getItem('userID')) {
   location.href = '../profile/profile.html';
}

fetch(`${BASE_URL}/articles/${sessionStorage.getItem('contentID')}`, {
   method: 'GET',
   headers: { 'Authorization': `Bearer ${TOKEN}` }
})
.then(res => res.json())
.then(res => {
   const data = res.data.creator;
   profile.src = data.avatar;
   firstName.innerText = data.firstName
   lastName.innerText = data.lastName
   if (isLoading) return;
   isLoading = true;
   showLoading();
   getCreatorArticle(data.avatar, data.firstName, data.lastName);
})

function getCreatorArticle(profile, firstName, lastName) {

   fetch(`${BASE_URL}/articles/by/${creatorID}?search=&_page=${page}&_per_page=10&sortBy=createdAt&sortDir=asc`, {
      method: 'GET'
   })
   .then(res => res.json())
   .then(res => {
      res.data.items.forEach(element => {
         content.innerHTML += card(
            profile,
            firstName,
            lastName,
            element.createdAt,
            element.title,
            element.content,
            element.thumbnail,
            element.category ? element.category.name : '',
            element.id,
            creatorID
         )
      })
      page++;
      hideLoading()
      isLoading = false;
   })
}


// ? tool tip function
observer.observe(document.body, { childList: true, subtree: true });

// ? logout function
LOGOUT.observe(document.body, { childList: true, subtree: true });

const deleteItems = new MutationObserver((mutationsList, observer) => {
   const deleteItem = document.querySelectorAll('.delete');
   deleteItem.forEach(element => {
      element.onclick = () => {
         if (confirm("Are you sure you want to delete this article?")) {
            fetch(`${BASE_URL}/articles/${element.id}`, {
               method: "DELETE",
               headers: { Authorization: `Bearer ${TOKEN}` }
            })
               .then(() => {
                  fetchAll();
                  window.location.reload();
               })
               .catch(() => alert("Failed to delete article"));
         }
      }
   })
   observer.disconnect();
});
deleteItems.observe(document.body, { childList: true, subtree: true });