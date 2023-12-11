"use strict"

class Good {
    constructor(id, name, imageSrc, price) {
        this.id = id;
        this.name = name;
        this.imageSrc = imageSrc;
        this.price = price;
    }
}

/* Shop */

const GOODS_LIST = [
    new Good(0, "Авианосец", "images/aircraft carrier.png", 1000000),
    new Good(1, "Яблоко", "images/apple.png", 109),
    new Good(2, "Ноутбук", "images/laptop.png", 142990),
    new Good(3, "Лемон", "images/lemon.png", 79),
    new Good(4, "Апельсинка", "images/orange.png", 99),
    new Good(5, "Груша", "images/pear.png", 69),
    new Good(6, "Телефон", "images/phone.png", 19990),
    new Good(7, "Планшет", "images/tablet.png", 29990),
    new Good(8, "Умные часы", "images/watch.png", 7990)
];
var selectedGoodsIndexes;

const INPUT_PRICE_MIN = document.getElementById("input-price-min");
const INPUT_PRICE_MAX = document.getElementById("input-price-max");
const SELECT_SORT = document.getElementById("select-sort");

function transformPrice(price) {
    let priceStr = price.toString();
    let newPrice = "";
    for (let i = 0; i < priceStr.length; ++i) {
        newPrice += priceStr[i];
        if ((priceStr.length - i) % 3 == 1 && i != priceStr.length - 1) {
            newPrice += ".";
        }
    }
    newPrice += " ₽";
    return newPrice;
}

function fillContainerWithGoods() {
    const PROD_CARDS_GRID = document.getElementById("prod-cards-grid");
    PROD_CARDS_GRID.replaceChildren();
    for (let goodIndex of selectedGoodsIndexes) {
        let prodCard = createProdCard(goodIndex);
        PROD_CARDS_GRID.append(prodCard);
    }
}

function createProdCard(goodIndex) {
    let card = document.createElement("article");
    card.className = "prod-card";

    let img = document.createElement("img");
    img.className = "prod-img";
    img.src = GOODS_LIST[goodIndex].imageSrc;
    img.alt = "Изображение товара";
    card.append(img);

    let name = document.createElement("h5");
    name.className = "prod-name";
    name.textContent = GOODS_LIST[goodIndex].name;
    card.append(name);

    let bottomContainer = document.createElement("div");
    bottomContainer.className = "prod-bottom-container";
    card.append(bottomContainer);

    let price = document.createElement("span");
    price.className = "prod-price";
    price.textContent = transformPrice(GOODS_LIST[goodIndex].price);
    bottomContainer.append(price);

    let button = document.createElement("button");
    button.className = "prod-button";
    button.textContent = "Купить";
    button.onclick = function() {
        basketGoodsIndexes.push(goodIndex);
        updateBasket();
    }
    bottomContainer.append(button);

    return card;
}

function goodPriceFilter(goodIndex, min, max) {
    if (GOODS_LIST[goodIndex].price >= min && GOODS_LIST[goodIndex].price <= max)
        return true;
    return false;
}

function filterSelected() {
    selectedGoodsIndexes = selectedGoodsIndexes.filter(function(item, index, array) {
        return goodPriceFilter(item, INPUT_PRICE_MIN.value, INPUT_PRICE_MAX.value);
    });
}

function compPriceUp(goodIndexA, goodIndexB) {
    if (GOODS_LIST[goodIndexA].price > GOODS_LIST[goodIndexB].price)
        return 1;
    if (GOODS_LIST[goodIndexA].price == GOODS_LIST[goodIndexB].price)
        return 0;
    return -1;
}

function compPriceDown(goodIndexA, goodIndexB) {
    if (GOODS_LIST[goodIndexA].price < GOODS_LIST[goodIndexB].price)
        return 1;
    if (GOODS_LIST[goodIndexA].price == GOODS_LIST[goodIndexB].price)
        return 0;
    return -1;
}

function sortSelected() {
    switch (SELECT_SORT.value) {
        case "up":
            selectedGoodsIndexes.sort(compPriceUp);
            break;
        case "down":
            selectedGoodsIndexes.sort(compPriceDown);
            break;
    }
}

function updateSelected() {
    selectedGoodsIndexes = Array.from(GOODS_LIST.keys());
    sortSelected();
    filterSelected();
    fillContainerWithGoods(selectedGoodsIndexes);
}

INPUT_PRICE_MIN.onchange = updateSelected;
INPUT_PRICE_MAX.onchange = updateSelected;
SELECT_SORT.onchange = updateSelected;

updateSelected();



/* Basket */

var basketGoodsIndexes = [];

const BASKET_SUM = document.getElementById("basket-sum");
const BASKET_BTN_CLEAR = document.getElementById("basket-btn-clear");
const BASKET_BTN_BUY = document.getElementById("basket-btn-buy");

function fillBasketWithGoods() {
    const BASKET_CONTAINER = document.getElementById("basket-container");
    BASKET_CONTAINER.replaceChildren();
    for (let i = 0; i < basketGoodsIndexes.length; ++i) {
        let boughtCard = createBoughtCard(basketGoodsIndexes[i], i);
        BASKET_CONTAINER.append(boughtCard);
    }
}

function createBoughtCard(goodIndex, posIndex) {
    let card = document.createElement("div");
    card.className = "bought-card";

    let img = document.createElement("img");
    img.className = "bought-img";
    img.src = GOODS_LIST[goodIndex].imageSrc;
    img.alt = "Изображение товара";
    card.append(img);

    let name = document.createElement("h5");
    name.className = "bought-name";
    name.textContent = GOODS_LIST[goodIndex].name;
    card.append(name);

    let price = document.createElement("span");
    price.className = "bought-price";
    price.textContent = transformPrice(GOODS_LIST[goodIndex].price);
    card.append(price);

    let button = document.createElement("button");
    button.className = "bought-button";
    button.onclick = function() {
        basketGoodsIndexes.splice(posIndex, 1);
        updateBasket();
    }
    card.append(button);

    let buttonIcon = document.createElement("img");
    buttonIcon.className = "bought-button-icon";
    buttonIcon.src = "images/icons/trash.svg";
    buttonIcon.alt = "Удалить";
    button.append(buttonIcon);

    return card;
}

function countBasketSum() {
    let sum = 0;
    for (let goodIndex of basketGoodsIndexes) {
        sum += GOODS_LIST[goodIndex].price;
    }
    return sum;
}

function updateBasketSum() {
    BASKET_SUM.textContent = "Итого: " + transformPrice(countBasketSum());
}

function updateBasket() {
    fillBasketWithGoods();
    updateBasketSum();
}

BASKET_BTN_CLEAR.onclick = function() {
    basketGoodsIndexes = [];
    updateBasket();
}

BASKET_BTN_BUY.onclick = function() {
    alert(`Вы купили барахла на ${transformPrice(countBasketSum())}`);
    BASKET_BTN_CLEAR.onclick();
}

updateBasket();