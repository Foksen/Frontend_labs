const CARDS_DESCS = document.getElementsByClassName("card-desc");
const MAX_LENGTH = 128;

function truncate(str, maxlength) {
    if (str.length <= maxlength) {
        return str;
    }
    return str.substr(0, maxlength - 3) + '...';
}

for (let i = 0; i < CARDS_DESCS.length; ++i) {
    CARDS_DESCS[i].textContent = truncate(CARDS_DESCS[i].textContent, MAX_LENGTH);
}