"use strict"

const BTN_REG = document.getElementById("btn-reg");
const BTN_AUTH = document.getElementById("btn-auth");
const BTN_LIKE = document.getElementById("btn-like");
const BTN_DRAW = document.getElementById("btn-draw");

function registration() {
    let answer = prompt("Желаете пройти регистрацию на сайте?");
    if (answer == "Да") {
        alert("Круто!");
    } else {
        alert("Попробуй ещё раз");
    }
}

function authorizationLogin() {
    let login = prompt("Ваш логин");
    if (login == "Админ") {
        authorizationPassword();
    }
    else if (login == null || login == "") {
        alert("Отменено");
    } 
    else {
        alert("Я вас не знаю");
    }
}

function authorizationPassword() {
    let password = prompt("Ваш пароль", "");
    if (password == "Я главный") {
        alert("Здравствуйте!");
    } 
    else if (password == null || password == "") {
        alert("Отменено");
    } 
    else {
        alert("Неверный пароль");
    }
}

var isSiteLiked = false;
function switchLike() {
    isSiteLiked = !isSiteLiked;
    updateLikeBtn();
}

function updateLikeBtn() {
    if (isSiteLiked) {
        BTN_LIKE.classList.add("liked");
        BTN_LIKE.textContent = "❤️";
    }
    else {
        BTN_LIKE.classList.remove("liked");
        BTN_LIKE.textContent = "Классный сайт!";
    }
}

var isDrawEnabled = false;
function switchDraw() {
    isDrawEnabled = !isDrawEnabled;
    updateMouseEvent();
}

function updateMouseEvent() {
    if (isDrawEnabled) {
        document.onmousemove = draw;
    }
    else {
        document.onmousemove = null;
    }
}

function draw(event) {
    if (isDrawEnabled) {
        let x = event.clientX;
        let y = event.clientY;
        let elem = document.createElement("div");
        elem.className = "draw-elem";
        elem.style.top = (y - 18) + "px";
        elem.style.left = (x - 18) + "px";
        elem.textContent = "❤️";
        document.body.append(elem);
    }
}

BTN_REG.onclick = registration;
BTN_AUTH.onclick = authorizationLogin;
BTN_LIKE.onclick = switchLike;
BTN_DRAW.onclick = switchDraw;

