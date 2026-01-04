import { card, moreButton, navBar } from './component.js';
import { LOGOUT } from './logout.js';
import { observer } from './tooltip.js';

document.querySelector('header').innerHTML = navBar('active', '', '#', 'article/category/create_category.html', 'profile/profile.html');
const content = document.querySelector(".content");

let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token')

if (( !isLogin || isLogin == null ) || ( !TOKEN || TOKEN == null )) {
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
            element.id
         )
      });
      page ++;
      hideLoading()
      isLoading = false;
   })
}

fetchAll();

const ownEndpoint = '/articles/own?search=&_page=1&_per_page=100&sortBy=createdAt&sortDir=asc';

// ? tool tip function
observer.observe(document.body, { childList: true, subtree: true });
LOGOUT.observe(document.body, { childList: true, subtree: true });

//* more button if it own it will show the three dot button on the top right of the content
// const more = new MutationObserver((mutationsList, observer) => {
//    const moreBtn = document.querySelectorAll('.more');
//    moreBtn.forEach(moreElement => {
//       fetch(`${BASE_URL}${ownEndpoint}`, {
//          method: 'GET',
//          headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//          }
//       })
//       .then(res => res.json())
//       .then(res => {
//          res.data.items.forEach(element => {
//             if(element.id == moreElement.id) {
//                moreElement.innerHTML = moreButton()
//                return;
//             }
//          })
//       })
//    })
// })
// more.observe(document.body, { childList: true, subtree: true });
