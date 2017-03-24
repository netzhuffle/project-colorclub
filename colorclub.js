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

function colorizeElement(element) {
    let color = stringToColor(element.textContent);
    element.style.color = color;
}

document.querySelectorAll('a[href^="profile.php"], a[href^="profile.php"] font').forEach(colorizeElement);

document.querySelectorAll('td[class="normalfont"][align="left"]').forEach(post => {
    colorizeElement(post);
    let postHTML = post.innerHTML;
    postHTML = postHTML.replace(/ und /g, ' und <span style="color: pink;">ein Einhorn</span> und ');
    postHTML = postHTML.replace(/Schülerin/g, 'Gnomin');
    postHTML = postHTML.replace(/Schüler/g, 'Gnome');
    postHTML = postHTML.replace(/Lehrer/g, 'Li-La-Lehrer');
    postHTML = postHTML.replace(/Gryffindor/g, 'Löwchen');
    postHTML = postHTML.replace(/Hufflepuff/g, 'Dächschen');
    postHTML = postHTML.replace(/Slytherin/g, 'Schlängchen');
    postHTML = postHTML.replace(/Ravenclaw/g, 'Räbchen');
    postHTML = postHTML.replace(/Quidditch/g, 'Besendings');
    postHTML = postHTML.replace(/Schnatz/g, 'Schmatz');
    postHTML = postHTML.replace(/Potter/g, 'Podder');
    postHTML = postHTML.replace(/Newt/g, 'Niut');
    postHTML = postHTML.replace(/alles/gi, 'everything');
    postHTML = postHTML.replace(/(der|die|das)/gi, 'the');
    post.innerHTML = postHTML;
});
