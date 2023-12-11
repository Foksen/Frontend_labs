const GALLERY = document.getElementById("gallery");

GALLERY.addEventListener("image-change", function(event) {
    let selected = GALLERY.getElementsByClassName("gallery-selected-container")[0];
    let url = event.detail.url;
    selected.style.backgroundImage = `url("${url}")`;
});

GALLERY.addEventListener("click", function(event) {
    let target = event.target;
    if (event.target.className != "gallery-img")
        return;

    target.dispatchEvent(new CustomEvent("image-change", {
        detail: { url: target.getAttribute("src")},
        bubbles: true
    }));
});