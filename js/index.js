import { card } from './card.js';

const content = document.querySelector(".content");

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
         showLoading()
         content.innerHTML += card(element.creator.avatar, element.creator.firstName, element.creator.lastName, element.createdAt, element.title, element.content, element.thumbnail, element.category ? element.category.name : '', element.creator.id);
      });
      page ++;
      hideLoading()
      isLoading = false;
   });
}

fetchAll();