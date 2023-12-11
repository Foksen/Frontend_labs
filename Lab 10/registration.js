const ENGLISH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const CAPTCHA_IMAGE = document.querySelector('#captcha-image');
const CAPTCHA_INPUT = document.querySelector('#captcha-input');
const BTN_SUBMIT = document.querySelector("#reg-submit");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateWord() {
    let len = getRandomInt(4) + 5;
    let res = '';
    for (let i = 0; i < len; ++i) {
        let index = getRandomInt(ENGLISH_ALPHABET.length - 1);
        res += ENGLISH_ALPHABET[index];
    }
    return res;
}

function generateExpression() {
    let n1 = getRandomInt(15);
    let n2 = getRandomInt(15);
    return n1 + ' + ' + n2;
}

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

CAPTCHA_IMAGE.textContent = generateWord();
var isCaptchaOneFailed = false;
BTN_SUBMIT.onclick = function (e) {
    e.preventDefault();
    if (isEmpty(CAPTCHA_INPUT.value)) {
        alert("Введите капчу!");
        return;
    }

    if (!isCaptchaOneFailed) {
        if (CAPTCHA_INPUT.value == CAPTCHA_IMAGE.textContent) {
            alert("Всё правильно!!!");
        }
        else {
            alert("Попробуем другую...");
            CAPTCHA_IMAGE.textContent = generateExpression();
            CAPTCHA_INPUT.value = '';
            isCaptchaOneFailed = true;
        }
        return;
    }

    if (CAPTCHA_INPUT.value == eval(CAPTCHA_IMAGE.textContent)) {
        alert("Всё правильно!!!");
    }
    else {
        alert("Вы робот, уходите");
        BTN_SUBMIT.setAttribute('disabled', '');
    }
}
