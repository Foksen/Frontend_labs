function animate({timing, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;

        if (timeFraction > 1)
            timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1)
            requestAnimationFrame(animate);
    });
}

function linear(timeFraction) {
    return timeFraction;
}

function parabola(timeFraction) {
    return 4 * timeFraction * (1 - timeFraction);
}

document.addEventListener("click", function(event) {
    let target = event.target;
    let link = target.closest(".link-sn");

    if (!link || !link.contains(target))
        return;

    event.preventDefault();

    icon = link.getElementsByClassName("link-sn-icon")[0];

    animate({
        timing: parabola,
        draw: function(progress) {
            link.style.transform = `scale(${1 + 0.2 * progress})`;
        },
        duration: 400
    });

    animate({
        timing: parabola,
        draw: function(progress) {
            icon.style.transform = `scale(${1 - 0.5 * progress})`;
        },
        duration: 800
    });

    animate({
        timing: linear,
        draw: function(progress) {
            icon.style.rotate = `${progress * 360}deg`;
        },
        duration: 800
    });
});