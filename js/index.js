const content = document.querySelector(".content");

const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";

const formatDate = new Date().toLocaleString('en-GB', {
   // weekday: 'short',
   day: 'numeric',
   month: 'short', 
   year: 'numeric', 
   hour: 'numeric',
   minute: '2-digit',
   hour12: true
});

fetch(`${BASE_URL}/articles?search=&_page=1&_per_page=10`, {
   method: "GET",
})
   .then((res) => res.json())
   .then((res) => {
      res.data.items.forEach((element) => {
         content.innerHTML += `
            <div class="col-12">
               <div class="mb-3 d-flex justify-content-between align-items-center bg-body py-2 pe-2 rounded-pill">
                  <div class="d-flex align-items-center" style="width: fit-content;">
                     <div class="btn-group">
                        <button type="button" class="btn shadow-none border-0" data-bs-toggle="dropdown" aria-expanded="false">
                           <img class="rounded-circle object-fit-cover border" src="${element.creator.avatar}" style="width: 50px; height: 50px;">
                        </button>
                        <div class="dropdown-menu">
                           <img class="object-fit-cover rounded-3" src="${element.creator.avatar}" style="width: 200px; height: 200px;">
                        </div>
                     </div>
                     <div class="">
                        <h5 class="">${element.creator.firstName} ${element.creator.lastName}</h5>
                        <h5 class="fs-6 fw-medium text-body-tertiary">${element.createdAt = formatDate}</h5>
                     </div>
                  </div>
                  <div>
                     <button class="btn btn-lg btn-primary rounded-pill">
                        <i class="fa-solid fa-ellipsis"></i>
                     </button>
                  </div>
               </div>
               <div class="card w-100 rounded-5 p-2 shadow-sm">
                  <div class="card-header bg-transparent border-0">
                     <h4 class="card-title">${element.title}</h4>
                  </div>
                  <div class="card-body">
                     <p class="card-text" style="
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;"
                     >
                        ${element.content}
                     </p>
                     <img class="card-img object-fit-cover rounded-4" src="${element.thumbnail}" alt="${element.title}" style="width: 100%; min-height: 300px; max-height: 500px;">
                  </div>
               </div>
            </div>
         `;
      });
   });
