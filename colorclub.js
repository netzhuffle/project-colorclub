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

document.querySelectorAll('a[href^="profile.php"]').forEach(link => {
	let color = stringToColor(link.textContent);
	link.style.color = color;
});
