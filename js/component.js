const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";

//* for date format
const options12h = {
   weekday: "short",
   day: "numeric",
   month: "short",
   year: "numeric",
   hour: "numeric",
   minute: "2-digit",
   hour12: true,
};

//* card for content
export const card = (
   avatar,
   firstName,
   lastName,
   date,
   title,
   description,
   thumbnail,
   category,
   id,
   isOwnedByUser
) => {
   const format = new Date(date);
   const formatDate = new Intl.DateTimeFormat("en-US", options12h).format(
      format
   );

   return `
      <div class="col-12 detail">
         <div class="mb-3 d-flex justify-content-between align-items-center bg-body py-2 pe-2 rounded-pill">
            <div class="d-flex align-items-center" style="width: fit-content;">
               <div class="btn-group">
                  <button type="button" class="btn shadow-none border-0" data-bs-toggle="dropdown" aria-expanded="false">
                     <img class="rounded-circle object-fit-cover border" src="${avatar}" style="width: 50px; height: 50px;">
                  </button>
                  <div class="dropdown-menu">
                     <img class="object-fit-cover rounded-3" src="${avatar}" style="width: 200px; height: 200px;">
                  </div>
               </div>
               <div class="">
                  <h5 class="fw-bold"><a href="" class="link-body-emphasis link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">${firstName} ${lastName}</a></h5>
                  <span class="fw-normal text-body-tertiary" style="font-size: 14px">${(date = formatDate)}</span>
               </div>
            </div>
            <div class="more" id="card-${id}">
            </div>
         </div>
         
         <div 
            class="card w-100 rounded-5 p-2 shadow-sm target"
            onclick="
               location.href = 'article/detail.html';
               sessionStorage.setItem('contentID', ${id});
            "
            style="cursor: pointer;"
         >
            <div id="tooltip">Click to read more</div>
            <div class="card-header bg-transparent border-0 mt-2 mb-0 pb-0">
               <span class="badge text-bg-primary rounded-pill mb-4 ">${category}</span>
               <h4 class="card-title lh-base">${title}</h4>
            </div>
            <div class="card-body pt-0">
               <div class="card-text mt-0 mb-4 lh-lg" style="overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">${description}</div>
               <img class="card-img object-fit-cover rounded-4 border" src="${thumbnail}" alt="${title}" style="width: 100%; min-height: 300px; max-height: 500px;">
            </div>
         </div>
      </div>
   `;
};

//* header
export const navBar = (
   homeActive,
   categoryActive,
   homeLocation,
   categoryLocation,
   profileLocation,
   isHome = false
) => {
   return `
      <nav class="navbar bg-body navbar-expand-lg py-4 py-lg-0">
         <div class="container">
            <a class="navbar-brand" href="#">Offcanvas navbar</a>
            <div class="offcanvas offcanvas-end m-4 rounded-4" tabindex="-1" id="offcanvasNavbar"
               aria-labelledby="offcanvasNavbarLabel">
               <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                     Offcanvas
                  </h5>
                  <button type="button" class="btn-close rounded-circle" data-bs-dismiss="offcanvas"
                     aria-label="Close"></button>
               </div>
               <div class="offcanvas-body">
                  <ul class="navbar-nav justify-content-center flex-grow-1 pe-3 gap-3">
                     <li class="nav-item">
                        <a class="nav-link ${homeActive}" aria-current="page" href="${homeLocation}">Home</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link ${categoryActive}" href="${categoryLocation}">Category</a>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="d-flex align-items-center gap-3">
               ${isHome ? `
                  <a class="btn btn-outline-primary rounded-4" href="../../../../article/create_article.html">
                     <i class="fa-solid fa-plus"></i>
                     &nbsp; Create Article
                  </a>
                  ` : ``}
               <div class="dropdown">
                  <a class="btn btn-primary text-black text-nowrap rounded-4" href="#" role="button" data-bs-toggle="dropdown"
                     aria-expanded="false">
                     Profile
                     <i class="fa-regular fa-user"></i>
                  </a>
                  <ul class="dropdown-menu text-primary">
                     <li>
                        <a class="dropdown-item btn" href="${profileLocation}">
                           <i class="fa-regular fa-user"></i>
                           &nbsp; View Profile
                        </a>
                     </li>
                     <li>
                     <!-- 
                        <a class="dropdown-item btn text-danger fw-medium" href="#">
                           <i class="fa-solid fa-arrow-right-from-bracket"></i>
                           &nbsp; Logout
                        </a>
                     -->
                        <button class="dropdown-item btn text-danger fw-medium logout">
                           <i class="fa-solid fa-arrow-right-from-bracket"></i>
                           &nbsp; Logout
                        </button>
                     </li>
                  </ul>
               </div>
               <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
               </button>
            </div>
         </div>
      </nav>
   
   `;
}

//* card detail
export const cardDetail = (
   avatar,
   firstName,
   lastName,
   date,
   title,
   description,
   thumbnail,
   category,
   id,
) => {
   const format = new Date(date);
   const formatDate = new Intl.DateTimeFormat("en-US", options12h).format(
      format
   );
   return `
      <div class="mb-3 d-flex justify-content-between align-items-center bg-body py-2 pe-2 rounded-pill">
         <div class="d-flex align-items-center" style="width: fit-content;">
            <div class="btn-group">
               <button type="button" class="btn shadow-none border-0" data-bs-toggle="dropdown" aria-expanded="false">
                  <img class="rounded-circle object-fit-cover border" src="${avatar}" style="width: 50px; height: 50px;">
               </button>
               <div class="dropdown-menu">
                  <img class="object-fit-cover rounded-3" src="${avatar}" style="width: 200px; height: 200px;">
               </div>
            </div>
            <div class="">
               <h5 class="fw-bold"><a href="" class="link-body-emphasis link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">${firstName} ${lastName}</a></h5>
               <span class="fw-normal text-body-tertiary" style="font-size: 14px">${(date = formatDate)}</span>
            </div>
         </div>
         <div class='more' id='card-${id}'>
         </div>
      </div>
      <div class="card w-100 bg-transparent border-0">
         <div class="card-header bg-transparent border-0 mt-2 mb-0">
            <span class="badge text-bg-primary rounded-pill mb-4 ">${category}</span>
            <h4 class="card-title lh-base">${title}</h4>
         </div>
         <div class="card-body">
            <p class="card-text mb-4 lh-lg">
               ${description}
            </p>
            <img class="card-img object-fit-cover rounded-4 border" src="${thumbnail}" alt="${title}" style="width: 100%;">
         </div>
      </div>
   `;
}

//* more button
export const moreButton = (id) => {

   return `
      <div class="btn-group">
         <button type="button" class="btn rounded-pill" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis"></i>
         </button>
         <ul class="dropdown-menu">
            <li>
               <button class="dropdown-item" onclick="location.href='../profile/update.html?id=${id}'" id="${id}"><i class="fa-regular fa-pen-to-square"></i>&nbsp;Edit</button>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
               <button class="dropdown-item text-danger delete" id="${id}" onclick="test(${id})"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</button>
            </li>
         </ul>
      </div>
   `;
}