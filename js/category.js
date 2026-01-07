import { navBar } from "./component.js";


let isLogin = localStorage.getItem('isLogin');
let TOKEN = localStorage.getItem('token')

if ((!isLogin || isLogin == null) || (!TOKEN || TOKEN == null)) {
   location.href = '../auth/login.html'
   localStorage.removeItem('isLogin')
   localStorage.removeItem('token')
}

document.querySelector('header').innerHTML = navBar('', 'active', '../../index.html', '#', '../../profile/profile.html', true);

const content = document.querySelector(".content");
const category = document.getElementById('category');
const categoryBtn = document.getElementById('categoryBtn');
const deleteBtn = document.getElementById('delete');
const toastLive = document.getElementById('liveToast');
const toast = document.querySelector('.toast');
const toastMessage = document.querySelector('.toast-message');
const search = document.getElementById('search');

const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";

//* loading
const loading = document.getElementById('loading');
const loader = document.querySelector('.loader');

function showLoading() {
   loader.style.display = "block";
}

function hideLoading() {
   loader.style.display = "none";
}

//* for infinite scroll
let currentPage = 1;
let perPage = 10;
let isLoading = false;
let hasMore = true;

window.addEventListener("scroll", () => {
   if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      fetchAll();
   }
});

//* toast success
function toastSuccess(name, message) {
   toast.classList.add('bg-success-subtle');
   toast.classList.add('border');
   toast.classList.add('border-success');
   toast.classList.add('text-success');
   toastMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i>&nbsp;Category ${!name ? '' : `"${name}"`} ${!message ? '' : `${message}`}`
}

//* toast fail
function toastFail(name, message) {
   toast.classList.add('bg-danger-subtle');
   toast.classList.add('border');
   toast.classList.add('border-danger');
   toast.classList.add('text-danger');
   toastMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>&nbsp;Category ${!name ? '' : `"${name}"`} ${!message ? '' : `${message}`}`
}

fetchAll();

if(categoryBtn || deleteBtn) {
   const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive)
   categoryBtn.addEventListener('click', () => {
      toastBootstrap.show()
   })
}

function fetchAll() {
   if (isLoading || !hasMore) return;
   isLoading = true;
   showLoading();

   fetch(`${BASE_URL}/categories?_page=${currentPage}&_per_page=${perPage}&sortBy=name&sortDir=ASC&search=${search ? search.value.trim('') : ''}`, {
      method: 'GET'
   })
   .then(res => res.json())
   .then(res => {
      const items = res. data.items;

      if (!items || items.length === 0) {
            hasMore = false;
            loading.classList.remove('d-none');
            loading.classList.remove('d-none');
            loading.innerHTML = '<i class="fa-solid fa-warning"></i> &nbsp; No more categories';
            hideLoading();
            isLoading = false;
            return;
      }
      items.forEach(element => {
         content.innerHTML += `
            <div class="col-12">
               <div class="card rounded-4">
                  <div class="card-body">
                     <div class="d-flex flex-wrap align-items-end justify-content-between">
                        <h5 class="card-title text-wrap">${element.name}</h5>
                        <div class="d-flex gap-3 justify-self-end ms-auto">
                           <button class="d-block btn border rounded-4 edit text-nowrap" id="${element.id}" onclick="editCategory(${element.id})" data-bs-toggle="modal"
                           data-bs-target="#createCategory" data-bs-dismiss="modal"><i class="fa-solid fa-pen-to-square"></i>&nbsp;Edit</button>
                           <button class="d-block btn btn-danger rounded-4 text-nowrap" onclick="deleteCategory(${element.id})" data-bs-toggle="modal" data-bs-target="#deleteCategory" data-bs-dismiss="modal"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         `
      });
      
      currentPage++;
      isLoading = false;
      hideLoading();
   })
   .catch(error => {
      console.error(error);
      isLoading = false;
      hideLoading();
   })
}

//* edit
function editCategory(id, ) {
   fetch(`${BASE_URL}/categories/${id}`, {
      method: 'GET',
   })
   .then(res => res.json())
   .then(res => {
      category.value = res.data.name;
      categoryBtn.innerText = 'Update Category'
   })
   categoryBtn.onclick = () => {
      fetch(`${BASE_URL}/categories/${id}`, {
         method: 'PUT',
         headers: {
            'Authorization' : `Bearer ${TOKEN}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ name: category.value })
      })
      .then(res => res.json())
      .then(res => {
         if (res.result) {
            content.innerHTML = ''
            currentPage = 1;
            fetchAll();
            toastSuccess('', 'updated successfully')
         }
         if (!res.result) {
            throw new Error('already exist')
         }
      })
      .catch(error => {
         toastFail(category.value, error.message)
      })
   }
}

//* create
function createCategory() {
   category.value = ''
   categoryBtn.onclick = () => {
      fetch(`${BASE_URL}/categories`, {
         method: 'POST',
         headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${TOKEN}`
         },
         body: JSON.stringify({ name: category.value })
      })
      .then(res => res.json())
      .then(res => {
         if (res.result) {
            content.innerHTML = ''
            currentPage = 1;
            fetchAll();
            toastSuccess(category.value, 'create successfully')
         }
         if (!res.result) {
            throw new Error(`already exist`)
         }
      })
      .catch(error => {
         toastFail(category.value, error.message)
      })
   }
}

//* delete
function deleteCategory(id) {
   fetch(`${BASE_URL}/categories/${id}`, {
      method: 'GET'
   })
   .then(res => res.json())
   .then(res => {
      document.querySelector('.delete-message').innerText = `Are you want to delete "${res.data.name}" category?`;
   })
   deleteBtn.onclick = () => {
      fetch(`${BASE_URL}/categories/${id}`, {
         method: 'DELETE',
         headers: {
            'Authorization': `Bearer ${TOKEN}`
         }
      })
      .then(res => res.json())
      .then(res => {
         if (res.result) {
            content.innerHTML = ''
            currentPage = 1;
            fetchAll();
            toastSuccess(res.data.name, 'delete successfully')
         }
         if (!res.result) {
            throw new Error('already deleted ')
         }
      })
      .catch(error => {
         toastFail(res.data.name, error.message)
      })
   }
}

search.addEventListener('keyup', (event) => {
   content.innerHTML = "";
   currentPage = 1;
   hasMore = true;
   fetchAll();
   if (!search.value) {
      fetchAll
   }
});

function searchBtn() {
   content.innerHTML = "";
   currentPage = 1;
   hasMore = true;
   fetchAll();
   if (!search.value) {
      fetchAll
   }
}

window.editCategory = editCategory
window.createCategory = createCategory
window.deleteCategory = deleteCategory
window.searchBtn = searchBtn