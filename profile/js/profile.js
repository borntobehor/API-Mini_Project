import { card } from './card.js';

const content = document.querySelector(".content");
const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";
const loading = document.querySelector('.loader');

let page = 1;
let isLoading = false;
let profileId = null; // store logged-in user id

// Show / hide loading
function showLoading() { loading.style.display = "block"; }
function hideLoading() { loading.style.display = "none"; }

// Get token
const token = localStorage.getItem("token");
if (!token) location.href = "../auth/login.html";

// Fetch user profile to get ID
fetch(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(res => {
    profileId = res.data.id;
    fetchAll(); // start loading articles after profile loaded
})
.catch(err => console.error("Profile fetch error:", err));

// Infinite scroll
window.addEventListener("scroll", () => {
   if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
      fetchAll();
   }
});

function fetchAll() {
    if (!profileId || isLoading) return;

    isLoading = true;
    showLoading();

    fetch(`${BASE_URL}/articles?search=&_page=${page}&_per_page=10&sortBy=createdAt&sortDir=desc`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(res => {
        const items = res.data.items || [];
        // Filter only articles by the logged-in user
        const myArticles = items.filter(a => a.creator.id === profileId);

        if (myArticles.length === 0 && page === 1) {
            content.innerHTML = "<p class='text-center text-muted'>No articles yet</p>";
        }

        myArticles.forEach(element => {
            content.innerHTML += card(
                element.creator.avatar,
                element.creator.firstName,
                element.creator.lastName,
                element.createdAt,
                element.title,
                element.content,
                element.thumbnail,
                element.category ? element.category.name : '',
                element.creator.id
            );
        });

        page++;
        isLoading = false;
        hideLoading();
    })
    .catch(err => {
        console.error("Articles fetch error:", err);
        hideLoading();
        isLoading = false;
    });
}
