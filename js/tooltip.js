
/**
 * ? tool tip function
 * * when hover on content it will show message (Click to read more)
*/

export const observer = new MutationObserver((mutationsList, observer) => {

   const targetElement = document.querySelectorAll('.target');
   const tooltip = document.getElementById("tooltip");
   let showTimer = null;

   if (targetElement.length > 0) {

      targetElement.forEach(element => {
         element.addEventListener("mouseenter", () => {
            showTimer = setTimeout(() => {
               tooltip.style.opacity = "1";
            }, 2000)
         });
         
         element.addEventListener("mouseleave", () => {
            tooltip.style.opacity = "0";
            clearTimeout(showTimer);
         });
         
         element.addEventListener("mousemove", (e) => {
            tooltip.style.left = e.clientX + 12 + "px";
            tooltip.style.top = e.clientY + 12 + "px";
         });
      })
   }
   observer.disconnect(); // Stop observing once found
});