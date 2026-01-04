// js/profile.js
import { card } from "./cardpf.js";

const token = localStorage.getItem("token");
if (!token) location.href = "../auth/login.html";

const baseURL = "http://blogs.csm.linkpc.net/api/v1";

const nameEl = document.getElementById("name");
const lastNameEl = document.getElementById("lastName");
const avatarEl = document.getElementById("avatar");
const articleList = document.getElementById("articleList");

/* ---------- Helpers ---------- */
const stripHTML = html => html.replace(/<[^>]*>?/gm, '');

/* ---------- Load Profile ---------- */
async function loadProfile() {
    try {
        const res = await fetch(`${baseURL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.data) {
            nameEl.textContent = data.data.firstName || "";
            lastNameEl.textContent = data.data.lastName || "";
            avatarEl.src = data.data.avatar || "https://via.placeholder.com/80";
        }
    } catch (err) {
        console.error("Profile error:", err);
    }
}

/* ---------- Load Articles ---------- */
async function loadArticles() {
    try {
        const res = await fetch(`${baseURL}/articles/own?_page=1&_per_page=100&sortBy=createdAt&sortDir=desc`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const articles = Array.isArray(data.data) ? data.data : data.data?.items || [];

        if (!articles.length) {
            articleList.innerHTML = "<p class='text-center text-muted'>No articles yet</p>";
            return;
        }

        articleList.innerHTML = "";

        articles.forEach(a => {
            articleList.insertAdjacentHTML("beforeend", 
                card(
                    avatarEl.src,
                    nameEl.textContent,
                    lastNameEl.textContent,
                    a.createdAt,
                    a.title,
                    stripHTML(a.content),
                    a.thumbnail,
                    a.category?.name,
                    a.id
                )
            );
        });

        // Edit/Delete events
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.onclick = () => location.href = `update.html?id=${btn.dataset.id}`;
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = async () => {
                const id = btn.dataset.id;
                if (confirm("Are you sure you want to delete this article?")) {
                    try {
                        await fetch(`${baseURL}/articles/${id}`, {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        loadArticles();
                    } catch {
                        alert("Failed to delete article");
                    }
                }
            };
        });

    } catch (err) {
        console.error("Articles error:", err);
    }
}

/* ---------- Initialize ---------- */
loadProfile();
loadArticles();
