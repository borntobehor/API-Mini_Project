import { card, moreButton, navBar } from "../js/component.js";
import { observer } from "../js/tooltip.js";
import { LOGOUT } from "../js/logout.js";

document.querySelector("header").innerHTML = navBar(
   "",
   "",
   "../index.html",
   "../article/category/create_category.html",
   "profile.html",
   true
);

let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token')

if ((!isLogin || isLogin == null) || (!TOKEN || TOKEN == null)) {
   location.href = '../auth/login.html'
   localStorage.clear();
}

const baseURL = "http://blogs.csm.linkpc.net/api/v1";

let id = document.getElementById("id");
let email = document.getElementById("email");
let nameEl = document.getElementById("name");
let lastNameEl = document.getElementById("lastName");
let avatarEl = document.getElementById("avatar");
const articleList = document.getElementById("articleList");
let avatar = "";

const stripHTML = (html) => html.replace(/<[^>]*>?/gm, "");

function loadProfile() {
   fetch(`${baseURL}/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
   })
      .then((res) => res.json())
      .then((data) => {
         console.log(data.data.avatar);
         if (data.data) {
            nameEl.textContent = data.data.firstName || "";
            lastNameEl.textContent = data.data.lastName || "";
            avatarEl.src = data.data.avatar;
            id.textContent += data.data.id;
            email.textContent += data.data.email;

            sessionStorage.setItem("avatar", avatarEl.src);
            sessionStorage.setItem("fName", nameEl.textContent);
            sessionStorage.setItem("lName", lastNameEl.textContent);
         }
      })
      .catch((err) => console.error("Profile error:", err));
}

function loadArticles() {
   fetch(
      `${baseURL}/articles/own?_page=1&_per_page=100&sortBy=createdAt&sortDir=desc`,
      {
         headers: { Authorization: `Bearer ${token}` },
      }
   )
      .then((res) => res.json())
      .then((data) => {
         const articles = Array.isArray(data.data)
            ? data.data
            : data.data?.items || [];
         if (!articles.length) {
            articleList.innerHTML =
               "<p class='text-center text-muted'>No articles yet</p>";
            return;
         }

         articleList.innerHTML = "";

         articles.forEach((a) => {
            articleList.insertAdjacentHTML(
               "beforeend",
               card(
                  sessionStorage.getItem("avatar"),
                  sessionStorage.getItem("fName"),
                  sessionStorage.getItem("lName"),
                  a.createdAt,
                  a.title,
                  stripHTML(a.content),
                  a.thumbnail,
                  a.category?.name,
                  a.id
               )
            );
         });
         data.data.items.forEach((element) => {
            const moreBtn = document.querySelectorAll(`#card-${element.id}`);
            moreBtn.forEach((more) => {
               more.innerHTML = moreButton(element.id);
               const deleteItem = document.querySelectorAll(".delete");
               deleteItem.forEach((element) => {
                  element.onclick = () => {
                     if (
                        confirm("Are you sure you want to delete this article?")
                     ) {
                        fetch(`${baseURL}/articles/${element.id}`, {
                           method: "DELETE",
                           headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                 "token"
                              )}`,
                           },
                        })
                           .then(() => {
                              loadArticles();
                              window.location.reload();
                           })
                           .catch(() => alert("Failed to delete article"));
                     }
                  };
               });
            });
         });
         document.querySelectorAll(".edit-btn").forEach((btn) => {
            btn.onclick = () =>
               (location.href = `update.html?id=${btn.dataset.id}`);
         });

         document.querySelectorAll(".delete-btn").forEach((btn) => {
            btn.onclick = () => {
               const id = btn.dataset.id;
               if (confirm("Are you sure you want to delete this article?")) {
                  fetch(`${baseURL}/articles/${id}`, {
                     method: "DELETE",
                     headers: { Authorization: `Bearer ${token}` },
                  })
                     .then(() => loadArticles())
                     .catch(() => alert("Failed to delete article"));
               }
            };
         });
      })
      .catch((err) => console.error("Articles error:", err));
}

loadProfile();
loadArticles();

observer.observe(document.body, { childList: true, subtree: true });
LOGOUT.observe(document.body, { childList: true, subtree: true });