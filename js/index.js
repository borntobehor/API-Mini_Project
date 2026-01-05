import { card, moreButton, navBar } from './component.js';
import { LOGOUT } from './logout.js';
import { observer } from './tooltip.js';

document.querySelector('header').innerHTML = navBar('active', '', '#', 'article/category/create_category.html', 'profile/profile.html', true);
const content = document.querySelector(".content");

let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token')

if ((!isLogin || isLogin == null) || (!TOKEN || TOKEN == null)) {
   location.href = '../auth/login.html'
   localStorage.removeItem('isLogin')
   localStorage.removeItem('token')
}

const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";

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

//* fetch all data
function fetchAll() {

   if (isLoading) return;
   isLoading = true;
   showLoading();

   fetch(`${BASE_URL}/articles?search=&_page=${page}&_per_page=10&sortBy=createdAt&sortDir=desc`, {
      method: "GET",
      headers: {
         'Authorization': `Bearer ${TOKEN}`
      }
   })
      .then((res) => res.json())
      .then((res) => {
         res.data.items.forEach((element) => {
            content.innerHTML += card(
               element.creator.avatar,
               element.creator.firstName,
               element.creator.lastName,
               element.createdAt,
               element.title,
               element.content,
               element.thumbnail,
               element.category ? element.category.name : '',
               element.id,
            )
            if ((element.creator.id == localStorage.getItem('userID'))) {
               const moreBtn = document.querySelectorAll(`#card-${element.id}`);
               // console.log(moreButton);
               moreBtn.forEach(more => {
                  more.innerHTML = moreButton(element.id);
               })
            }
         });
         page++;
         hideLoading()
         isLoading = false;
      })
}

fetchAll();

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
