const BASKET_ZONE = document.getElementsByClassName("basket-zone")[0];

document.addEventListener("mousedown", function(event) {
    let target = event.target;
    let card = target.closest(".catalog-good-card");

    if (!card || !card.contains(target))
        return;

    let cardHeight = card.offsetHeight;
    let cardWidth = card.offsetWidth;
    let shiftX = event.clientX - card.getBoundingClientRect().left;
    let shiftY = event.clientY - card.getBoundingClientRect().top;

    card.style.height = cardHeight + 'px';
    card.style.width = cardWidth + 'px';
    card.style.position = "absolute";
    card.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        card.style.left = pageX - shiftX + 'px';
        card.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);
    card.onmouseup = function(event) {
        document.removeEventListener("mousemove", onMouseMove);

        card.style.display = "none";
        let below = document.elementFromPoint(event.clientX, event.clientY);
        if (below == BASKET_ZONE) {
            let price = card.getElementsByClassName("catalog-good-card-price-number")[0].innerHTML;
            let basketField = document.getElementsByClassName("basket-price-number")[0];
            basketField.innerHTML = Number(basketField.innerHTML) + Number(price);
        }

        card.style.height = null;
        card.style.width = null;
        card.style.position = null;
        card.style.zIndex = null;

        card.style.display = null;
        card.onmouseup = null;
    }

    /*function onMouseMove(event) {
        this.hidden = true;
        let below = document.elementFromPoint(event.clientX, event.clientY);
        this.hidden = false;

        if (below == BASKET_ZONE) {
            BASKET_ZONE.style.backgroundColor = "red";
        }
    }*/

    target.ondragstart = function() {
        return false;
    }
});