const CONTENTS = document.getElementById("contents");

CONTENTS.addEventListener("click", function (event) {
    let elemLink = event.target.closest("a");

    if (!elemLink)
        return;
    if (!elemLink.contains(event.target))
        return;

    let answer = confirm("Вы действительно хотите покинуть страницу?");
    if (!answer)
        event.preventDefault();
});