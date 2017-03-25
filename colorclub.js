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
    return Math.floor((x - Math.floor(x)) * Number.MAX_SAFE_INTEGER);
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

function replaceHTML(element) {
    let html = element.innerHTML;
    html = html.replace(/ und /g, ' und <span style="color: #ee44ff; font-family: Bonbon, cursive; font-size: 1.4em;">ein Einhorn</span> und ');
    html = html.replace(/Schülerin/g, 'Gnomin');
    html = html.replace(/Schüler/g, 'Gnome');
    html = html.replace(/Lehrer/g, 'Li-La-Lehrer');
    html = html.replace(/Gryffindor/g, 'Löwchen');
    html = html.replace(/Hufflepuff/g, 'Dächschen');
    html = html.replace(/Slytherin/g, 'Schlängchen');
    html = html.replace(/Ravenclaw/g, 'Räbchen');
    html = html.replace(/Quidditch/g, 'Besendings');
    html = html.replace(/Schnatz/g, 'Schmatz');
    html = html.replace(/alles/gi, 'everything');
    html = html.replace(/(der|die|das)/gi, 'the');
    html = html.replace(/Potter/g, 'Podder');
    html = html.replace(/Newt/g, 'Niut');
    element.innerHTML = html;
}

function specializeElement(element, cachedHash) {
    let hash = cachedHash || elementToHash(element);
    let fontNumber = rand(hash, 5) % 50;
    if (fontNumber === 0) {
        element.style.fontFamily = "'Bonbon', cursive";
    } else if (fontNumber === 1) {
        element.style.fontFamily = "'Jim Nightshade', cursive";
    } else if (fontNumber === 2) {
        element.style.fontFamily = "'Space Mono', monospace";
    } else if (fontNumber === 3) {
        element.style.fontFamily = "'Nova Oval', cursive";
    } else if (fontNumber === 4) {
        element.style.fontFamily = "Indie Flower', cursive";
    }
    if (rand(hash, 6) % 20 === 0) {
        element.style.transform = 'rotate(180deg)';
    }
    if (rand(hash, 7) % 20 === 0) {
        element.style.transform = 'scaleX(-1)';
    }
}

document.querySelectorAll('a[href^="profile.php"], a[href^="profile.php"] font').forEach(element => {
    colorizeElement(element)
});

document.querySelectorAll('a[href^="board.php"], a[href^="thread.php"], td[align="left"] > span.smallfont b, .tablecat_fc td[align="left"] span.normalfont b').forEach(element => {
    replaceHTML(element)
});

document.querySelectorAll('td[class="normalfont"][align="left"]').forEach(post => {
    let hash = elementToHash(post);
    colorizeElementDark(post, hash);
    specializeElement(post, hash);
    replaceHTML(post);
});
