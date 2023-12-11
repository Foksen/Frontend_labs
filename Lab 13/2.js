const NOTS = document.getElementById("nots");

NOTS.addEventListener('click', function(event) {
    let target = event.target;
    if (!target.classList.contains('nots-li-close')) return;
    target.parentElement.remove();
    updateNotsCount();
});