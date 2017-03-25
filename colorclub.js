/* from http://stackoverflow.com/a/21682946 */
function elementToHash(element) {
    let text = element.textContent;
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash & hash; // convert to 32bit int
}

/* from http://stackoverflow.com/a/19303725 */
function rand(hash, i) {
    let x = Math.sin(hash + i) * 10000;
    return (x - Math.floor(x)) * Number.MAX_SAFE_INTEGER;
}

function colorizeElement(element, cachedHash) {
    let hash = cachedHash || elementToHash(element);
    let red = rand(hash, 0) % 255;
    let green = rand(hash, 1) % 255;
    let blue = rand(hash, 2) % 255;
    element.style.color = `rgb(${red}, ${green}, ${blue})`;
}

function colorizeElementDark(element, cachedHash) {
    let hash = cachedHash || elementToHash(element);
    let hue = rand(hash, 3) % 360;
    let saturation = 100;
    let luminance = rand(hash, 4) % 60;
    element.style.color = `hsl(${hue}, ${saturation}%, ${luminance}%)`;
}

document.querySelectorAll('a[href^="profile.php"], a[href^="profile.php"] font').forEach(element => colorizeElement(element));

document.querySelectorAll('td[class="normalfont"][align="left"]').forEach(post => {
    let hash = elementToHash(post);
    colorizeElementDark(post, hash);
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
