
export const LOGOUT = new MutationObserver((mutationsList, observer) => {
   const logOut = document.querySelector('.logout');
   const TOKEN = localStorage.getItem('token');
   const BASE_URL = "http://blogs.csm.linkpc.net/api/v1";
   logOut.onclick = () => {
      fetch(`${BASE_URL}/auth/logout`, {
         method: 'DELETE',
         headers: {
            'Authorization': `Bearer ${TOKEN}`
         }
      })
      .then(res => res.json())
      .then(res => {
         if (!res.result) {
            throw new Error(`${res.message}`)
         } else {
            location.href = '../../auth/login.html'
            localStorage.clear();
            sessionStorage.clear();
         }
      }).catch(error => {
         console.log(error.message);
      })
   }
   observer.disconnect(); // Stop observing once found
})
