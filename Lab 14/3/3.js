const DIR = document.getElementById("dir-container");

DIR.addEventListener("mousedown", function(event) {
    event.preventDefault();
});

DIR.addEventListener("dblclick", function(event) {
    event.preventDefault();
})

DIR.addEventListener("click", function(event) {
    let target = event.target;

    function unselectAll() {
        let elems = DIR.getElementsByClassName("dir-elem");
        for (let elem of elems) {
            elem.classList.remove("selected");
        }
    }

    if (!target.classList.contains("dir-elem")) {
        unselectAll();
    }
    else {
        if (!(event.ctrlKey || event.metaKey))
            unselectAll();
        target.classList.add("selected");
    }
});