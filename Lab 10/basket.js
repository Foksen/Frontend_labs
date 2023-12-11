const BTN_BASKET = document.querySelector('#btn-basket');
const BASKET_OUTPUT = document.querySelector('#basket-output');

function Accumulator(startValue) {
    this.value = startValue;
    this.read = function() {
        let add = prompt("Сколько добавить в корзину?", 0);
        let parsed = parseInt(add);
        this.value += isNaN(parsed) ? 0 : parsed;
    }
}

function updateOutput(acc) {
    BASKET_OUTPUT.textContent = acc.value + ' $';
}

var accumulator =  new Accumulator(100);
updateOutput(accumulator);

BTN_BASKET.onclick = function()  {
    accumulator.read();
    updateOutput(accumulator);
};;

