// DOM elements
let result = document.getElementById('result');
let search = document.getElementById('search');
let loading = document.getElementById('loading');
let scrollContainer = document.getElementById('scrollContainer');
let toastTrigger = document.getElementById('liveToastBtn');
let toastLiveExample = document.getElementById('liveToast');
let create = document.getElementById('create');
let toastcreate = document.getElementById('toastcreate');
let createtoastbtn = document.getElementById('createtoastbtn');
const toastLiveExample1 = document.getElementById('liveToast1');
let edittoastbtn = document.getElementById('edittoastbtn');
let edit = document.getElementById('edit');


// API settings
let base_url = "http://blogs.csm.linkpc.net/api/v1";
let currentPage = 1;
let perPage = 10;
let isLoading = false;
let hasMore = true;

// Fetch categories
function fetchCategories() {
    if (isLoading || !hasMore) return;

    isLoading = true;
    loading.style.display = "block";

    fetch(`${base_url}/categories?_page=${currentPage}&_per_page=${perPage}&sortBy=name&sortDir=ASC&search=${search.value}`)
        .then(res => res.json())
        .then(res => {
            const items = res.data.items;

            if (!items || items.length === 0) {
                hasMore = false;
                loading.innerText = "No more categories";
                isLoading = false;
                return;
            }
            items.forEach(element => {
                result.innerHTML += `
                    <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                        <span>${element.name}</span>
                        <div class="d-flex justify-content-end">
                            <button 
                                class="btn btn-sm btn-secondary me-2"
                                onclick="getId(${element.id})" data-bs-toggle="modal" data-bs-target="#staticBackdropEdit">
                                <i class="fa-solid fa-marker"></i>
                            </button>
                            <button 
                                class="btn btn-sm btn-danger"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getId(${element.id})">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            currentPage++;
            isLoading = false;
            loading.style.display = "none";
        })
        .catch(err => {
            console.error(err);
            isLoading = false;
            loading.style.display = "none";
        });
}

function getId(categoryId) {
    sessionStorage.setItem('categoryId', categoryId);
    fetch(`${base_url}/categories/${categoryId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk2OCwiaWF0IjoxNzY3MDgzOTg2LCJleHAiOjE3Njc2ODg3ODZ9.dw1xtH6-HGRYmVdHlPV4pBL0flOnTqlU2vsgi3j8IaM`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => {
            edit.value = res.data.name;
        })
        .catch(err => {
            console.error(err);
        }
        );
}
// Delete category
function deleteCategory() {
    // const token = localStorage.getItem('token');
    fetch(`${base_url}/categories/${sessionStorage.getItem('categoryId')}`, {
        method: "DELETE",
        headers: {
            // 'Authorization': `Bearer ${token}`
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk2OCwiaWF0IjoxNzY3MDgzOTg2LCJleHAiOjE3Njc2ODg3ODZ9.dw1xtH6-HGRYmVdHlPV4pBL0flOnTqlU2vsgi3j8IaM`
        }
    })
        .then(res => res.json())
        .then(res => {
            if (toastTrigger) {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                toa.innerHTML = "Category deleted successfully";
                // delete categories
                if (res.result) {
                    result.innerHTML = "";
                    currentPage = 1;
                    hasMore = true;
                    fetchCategories();
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
}

// Edit category
function editCategory() {
    fetch(`${base_url}/categories/${sessionStorage.getItem('categoryId')}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk2OCwiaWF0IjoxNzY3MDgzOTg2LCJleHAiOjE3Njc2ODg3ODZ9.dw1xtH6-HGRYmVdHlPV4pBL0flOnTqlU2vsgi3j8IaM`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: edit.value })
    })
        .then(res => res.json())
        .then(res => {
            if (edittoastbtn) {
                const toastBootstrap2 = bootstrap.Toast.getOrCreateInstance(toastLiveExample1)
                toastBootstrap2.show()
            }
            // edit categories
            if (res.result) {
                result.innerHTML = "";
                currentPage = 1;
                hasMore = true;
                fetchCategories();
                toastcreate.innerHTML = "Category Edited successfully";
                toastLiveExample1.classList.remove('text-danger');
                toastLiveExample1.classList.remove('bg-danger-subtle');
                toastLiveExample1.classList.remove('border-danger');
            }
            if(!res.result){
                toastcreate.innerHTML = "Category name already exists";
                toastLiveExample1.classList.add('text-danger');
                toastLiveExample1.classList.add('bg-danger-subtle');
                toastLiveExample1.classList.add('border-danger');
            }
        })
        .catch(err => {
            console.error(err);
        });
}
// Initial load
fetchCategories();

// Infinite scroll
scrollContainer.addEventListener('scroll', () => {
    if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 50
    ) {
        fetchCategories();
    }
});

// Search reset
search.addEventListener('input', () => {
    result.innerHTML = "";
    currentPage = 1;
    hasMore = true;
    fetchCategories();
});

// createCategory
function createCategory() {
    fetch(`${base_url}/categories`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk2OCwiaWF0IjoxNzY3MDgzOTg2LCJleHAiOjE3Njc2ODg3ODZ9.dw1xtH6-HGRYmVdHlPV4pBL0flOnTqlU2vsgi3j8IaM`
        },
        body: JSON.stringify({ name: create.value })
    })
        .then(res => res.json())
        .then(res => {
            if (toastcreate) {
                const toastBootstrap1 = bootstrap.Toast.getOrCreateInstance(toastLiveExample1)
                toastBootstrap1.show()
            }
            // create categories
            if (res.result) {
                result.innerHTML = "";
                create.value = "";
                currentPage = 1;
                hasMore = true;
                fetchCategories();
                toastcreate.innerHTML = "Category created successfully";
                toastLiveExample1.classList.remove('text-danger');
                toastLiveExample1.classList.remove('bg-danger-subtle');
                toastLiveExample1.classList.remove('border-danger');
            }
            if (!res.result) {
                toastcreate.innerHTML = "Category already created";
                toastLiveExample1.classList.add('text-danger');
                toastLiveExample1.classList.add('bg-danger-subtle');
                toastLiveExample1.classList.add('border-danger');
            }
            // create categories
            // result.innerHTML = `
            // <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            //             <span>${create.value}</span>
            //             <div class="d-flex justify-content-end">
            //                 <button 
            //                     class="btn btn-sm btn-secondary me-2"
            //                     onclick="editCategory(${res.id})">
            //                     <i class="fa-solid fa-marker"></i>
            //                 </button>
            //                 <button 
            //                     class="btn btn-sm btn-danger"
            //                     data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="getId(${res.id})">
            //                     <i class="fa-solid fa-trash-can"></i>
            //                 </button>
            //             </div>
            //         </div>
            // `
            // ;

        })
        .catch(err => {
            console.error(err);
            toastcreate.innerHTML = "Category already created";
        });
}