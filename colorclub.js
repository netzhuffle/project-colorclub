/* from http://jsfiddle.net/sUK45/ */
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

document.querySelectorAll('a[href^="profile.php"], a[href^="profile.php"] font, td[style="width:100%"][class="normalfont"][align="left"]').forEach(element => {
    let color = stringToColor(element.textContent);
    element.style.color = color;
});
