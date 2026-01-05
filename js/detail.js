import { navBar, cardDetail, moreButton } from './component.js';
// document.querySelector('header').innerHTML = navBar('active', '', '../index.html', '../article/category/create_category.html', '../profile/profile.html')

let isLogin = localStorage.getItem('isLogin');

if (!isLogin || isLogin == null) {
   location.href = '../auth/login.html'
}

//* content
const contentDetail = document.querySelector('.contentDetail');

const TOKEN = localStorage.getItem('token');

//* Base URL api
const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";

//* loading
const loading = document.querySelector('.loader');

function showLoading() {
   loading.style.display = "block";
}

function hideLoading() {
   loading.style.display = "none";
}

fetch(`${BASE_URL}/articles/${sessionStorage.getItem('contentID')}`, {
   method: "GET",
   headers: {
      "Authorization": `Bearer ${TOKEN}`
   }
})
.then(res => res.json())
.then(res => {
   showLoading();
   const content = res.data;
   if (!res.result) {
      throw new Error("The content available !")
   }
   contentDetail.innerHTML = cardDetail(
      content.creator.avatar,
      content.creator.firstName, 
      content.creator.lastName,
      content.createdAt, 
      content.title,
      content.content,
      content.thumbnail, 
      content.category ? content.category.name : '',
      content.id
   );

   if ((content.creator.id == localStorage.getItem('userID'))) {
      const moreBtn = document.querySelector(`#card-${content.id}`);
      // console.log(moreButton);
      moreBtn.innerHTML = moreButton(content.id);
   }

   hideLoading();
})
.catch(( error ) => {
   contentDetail.innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="height: 65vh;">
         <div class="bg-warning-subtle border border-warning px-5 py-3 rounded-4 text-warning">
            <i class="fa-solid fa-warning"></i>
            &nbsp;
            ${ error.message } 
         </div>
      </div>
   `;
   hideLoading();
})
