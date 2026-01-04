
//* for date format
const options12h = {
   weekday: 'short',
   day: 'numeric',
   month: 'short',
   year: 'numeric',
   hour: 'numeric',
   minute: '2-digit',
   hour12: true
};

//* card for content
export const card = (avatar, firstName, lastName, date, title, description, thumbnail, category, id) => {
   const format = new Date(date)
   const formatDate = new Intl.DateTimeFormat('en-US', options12h).format(format);
   return `
      <div class="col-12" onclick="">
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
                  <span class="fw-normal text-body-tertiary" style="font-size: 14px">${date = formatDate}</span>
               </div>
            </div>
            <div>
               <button class="btn btn-sm rounded-pill">
                  <i class="fa-solid fa-ellipsis"></i>
               </button>
            </div>
         </div>
         <div class="card w-100 rounded-5 p-2 shadow-sm">
            <div class="card-header bg-transparent border-0 mt-2 mb-0">
               <span class="badge text-bg-primary rounded-pill mb-4 ">${category}</span>
               <h4 class="card-title lh-base">${title}</h4>
            </div>
            <div class="card-body">
               <p class="card-text mb-4" style="overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;">
                  ${description}
               </p>
               <img class="card-img object-fit-cover rounded-4 border" src="${thumbnail}" alt="${title}" style="width: 100%; min-height: 300px; max-height: 500px;">
            </div>
         </div>
      </div>
   `
}
