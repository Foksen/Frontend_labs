const NOTS_CONTENT = document.getElementById('nots-content');
const NOTS_BTN = document.getElementById('nots-btn');
const NOTS_LIST = document.getElementById('nots-list');
const CREATE_NOT_BTN = document.getElementById('create-not-btn');


function showElem(elem, delay, display) {
    elem.style.opacity = 0;
    elem.style.transition = `opacity ${delay}ms`;
    setTimeout(() => {
        elem.style.opacity = 1;
    }, 10);
    elem.style.display = display || 'block';
}

function hideElem(elem, delay) {
    elem.style.opacity = 1;
    elem.style.transition = `opacity ${delay}ms`;
    setTimeout(() => {
        elem.style.opacity = 0;
    }, 10);
    setTimeout(() => {
        elem.style.display = 'none';
    }, delay);
}


function updateNotsCount(val) {
    NOTS_BTN.setAttribute('nots-count', val ?? NOTS_LIST.childElementCount);
};
updateNotsCount();

var totalNotsCount = 0;
function initNotification() {
    let elem = document.createElement('li');
    elem.classList.add('nots-li');
    let text = document.createElement('div');
    text.textContent = `Уведомление ${++totalNotsCount}`;
    text.classList.add('nots-li-text');
    elem.append(text);
    let close = document.createElement('li');
    close.textContent = 'x';
    close.classList.add('nots-li-close');
    elem.append(close);
    return elem;
}

function addNotification(elem) {
    NOTS_LIST.prepend(elem);
    updateNotsCount();
}

function createNotification() {
    addNotification(initNotification());
    updateNotsCount();
}


NOTS_BTN.onclick = function() {
    hideElem(NOTS_BTN, 300);
    showElem(NOTS_CONTENT, 300);
}

var timeoutLeave;
NOTS_CONTENT.onmouseleave = function() {
    timeoutLeave = setTimeout(() => {
        hideElem(NOTS_CONTENT, 300);
        showElem(NOTS_BTN, 300);
    }, 1000);
}

NOTS_CONTENT.onmouseenter = function() {
    clearTimeout(timeoutLeave);
}

CREATE_NOT_BTN.onclick = function() {
    createNotification();
}