const ELEMENT = document.getElementById("element");
const APPLE = document.getElementById("apple");

window.onresize = function() {
    ELEMENT.style.left = `${(document.body.clientWidth - ELEMENT.clientWidth) / 2}px`;
    APPLE.style.left = `${(document.body.clientWidth - APPLE.clientWidth) / 2}px`;

    ELEMENT.style.top = `${(window.innerHeight - ELEMENT.clientHeight) / 2}px`;
    APPLE.style.top = `${(window.innerHeight - APPLE.clientHeight) / 2}px`;
}

window.onresize();

document.addEventListener("click", function(event) {
    console.log(`${event.clientX} ; ${event.clientY}`);
});