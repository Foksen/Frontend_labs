const HEADINGS = document.getElementsByTagName("h1");

var scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

var space = scrollHeight - window.innerHeight;

var elemProgress = 100 / HEADINGS.length;

function calcOpacity(progress) {
    if (progress > 0.5)
        progress = 1 - progress;
    if (progress >= 0.3)
        return 1;
    return progress / 0.3;
}

window.addEventListener("scroll", function(event) {
    let progress = Math.round(window.scrollY / space * 100);

    let currentElemIndex = Math.floor(Math.abs(progress - 1) / elemProgress);

    let currentElemProgress = (progress % elemProgress) / elemProgress;

    for (let elem of HEADINGS) {
        elem.style.opacity = null;
    }
    HEADINGS[currentElemIndex].style.opacity = calcOpacity(currentElemProgress);
});