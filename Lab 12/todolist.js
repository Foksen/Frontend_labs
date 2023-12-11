const TODO_BTN = document.getElementById("todo-btn");
const TODO_LIST = document.getElementById("todo-list");

function getTodo() {
    input = prompt("Введите дело (ESC / ничего - для отмены)");
    if (input != null && input != "") {
        addTodo(input);
        setTimeout(getTodo, 200);
    }
}

function addTodo(inner) {
    let elem = document.createElement('li');
    elem.textContent = inner;
    TODO_LIST.append(elem);
}

TODO_BTN.onclick = function () {
    getTodo();
    TODO_BTN.blur();
};