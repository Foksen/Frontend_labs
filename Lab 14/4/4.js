const SLIDER_BAR = document.getElementById("slider-bar");
const SLIDER_THUMB = document.getElementById("slider-thumb");

SLIDER_THUMB.addEventListener("mousedown", function(event) {
    let barLeft = SLIDER_BAR.getBoundingClientRect().left;
    let barWidth = SLIDER_BAR.offsetWidth;

    moveAt(event.pageX);

    function moveAt(pageX) {
        let percent = (pageX - barLeft) / barWidth;
        if (percent < 0) {
            SLIDER_THUMB.style.left = `0`;
            return;
        }
        if (percent > 1) {
            SLIDER_THUMB.style.left = `100%`;
            return;
        }
        SLIDER_THUMB.style.left = `${percent * 100}%`;
    }

    function onMouseMove(event) {
        moveAt(event.pageX);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function() {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
    }
});

SLIDER_THUMB.ondragstart = function() {
    return false;
};