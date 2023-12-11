const IMAGE = document.getElementById("image");
const TEXT_CONTAINER = document.getElementById("text-container");

window.addEventListener("scroll", function(event) {
    IMAGE.style.top = `-${window.scrollY * 1.5}px`;
});
