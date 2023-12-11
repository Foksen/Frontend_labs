const cb = document.getElementById("cb");
const circle = document.getElementById("circle");

function fadeIn(elem, duration, display) {
    elem.style.opacity = 0;
    elem.style.transition = `opacity ${duration}ms`;
    setTimeout(() => {
        elem.style.opacity = 1;
    }, 10);
    elem.style.display = display || 'inline-block';
}

function fadeOut(elem, duration, display) {
    elem.style.opacity = 1;
    elem.style.transition = `opacity ${duration}ms`;
    setTimeout(() => {
        elem.style.opacity = 0;
    }, 10);
    setTimeout(() => {
        elem.style.display = display || 'inline-block';
    }, duration);
}

cb.onchange = function() {
    if (this.checked) {
        fadeIn(circle, 200);
    }
    else {
        fadeOut(circle, 200);
    }
}