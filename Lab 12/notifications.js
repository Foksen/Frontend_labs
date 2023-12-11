const NOTS_CONTENT = document.getElementById('nots-content');
const NOTS_BTN = document.getElementById('nots-btn');
const NOTS_LIST = document.getElementById('nots-list');
const CREATE_NOT_BTN = document.getElementById('create-not-btn');

const START_DATE = new Date();

var intervalCache = new Map();
function intervalDecorator(func, timer) {
    if (intervalCache.has(func)) {
        clearInterval(intervalCache.get(func));
    }
    intervalCache.set(func, setInterval(func, timer));
}

var timeoutCache = new Map();
function timeoutDecorator(func, timer) {
    if (intervalCache.has(func)) {
        clearTimeout(intervalCache.get(func));
    }
    intervalCache.set(func, setTimeout(func, timer));
}

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

function initNotification() {
    let elem = document.createElement('li');
    let timeDelta = Math.round(((new Date()).getTime() - START_DATE.getTime()) / 1000);
    elem.textContent = `Прошло ${timeDelta} с`;
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

var timerHideContent;

intervalDecorator(createNotification, 3000);

NOTS_BTN.onclick = function() {
    hideElem(NOTS_BTN, 300);
    showElem(NOTS_CONTENT, 300);
    intervalDecorator(createNotification, 10000);
}

function hideContent() {
    hideElem(NOTS_CONTENT, 300);
    showElem(NOTS_BTN, 300);
    updateNotsCount(0);
    setTimeout(() => {
        NOTS_LIST.innerHTML = '';
    }, 300);
    intervalDecorator(createNotification, 3000);
}

NOTS_CONTENT.onmouseleave = function() {
    timeoutDecorator(hideContent, 1000);
}

NOTS_CONTENT.onmouseenter = function() {
    timeoutDecorator(hideContent, 999999);
}

CREATE_NOT_BTN.onclick = function() {
    let elem = initNotification();
    addNotification(elem);
    setTimeout(() => {
        elem.remove();
        updateNotsCount();
    }, 5000);
}