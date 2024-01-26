// Write your code here

const a = document.querySelector(".clickable");

a.addEventListener("click", ()=>{
    a.classList.add("clicked");
    setTimeout(() =>{
        a.classList.remove("clicked")}, 1000);
});