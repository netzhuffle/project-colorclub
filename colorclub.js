/* from http://stackoverflow.com/a/21682946 */
function elementToHash(element) {
    var text = element.textContent;
    var hash = 0;
    for (var i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash & hash; // convert to 32bit int
}

/* from http://stackoverflow.com/a/19303725 */
function rand(hash, max, i) {
    var x = Math.sin(hash + i) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
}

function colorizeElement(element) {
    var hash = elementToHash(element);
    var red = rand(hash, 255, 0);
    var green = rand(hash, 255, 1);
    var blue = rand(hash, 255, 2);
    element.style.color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}

function colorizeElementDark(element, hours) {
    if (hours >= 14) {
        var hash = elementToHash(element);
        var hue = rand(hash, 360, 3);
        var saturation = 100;
        var luminance = rand(hash, 60, 4);
        element.style.color = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)';
    }
}

function replaceHTML(element, hours) {
    if (hours >= 16) {
        var html = element.innerHTML;
        html = html.replace(/(?![^<]*>) und /g, ' und <span style="color: #ee44ff; font-family: Bonbon, cursive; font-size: 1.4em;">ein Einhorn</span> und ');
        html = html.replace(/ und <span [^>]*>ein Einhorn<\/span> und ein Einhorn und <span [^>]*>ein Einhorn<\/span> und /g, ' und <span style="color: #ee44ff; font-family: Bonbon, cursive; font-size: 1.4em;">ein Einhorn</span> und ');
        html = html.replace(/Schülerin/g, 'Gnomin');
        html = html.replace(/Schüler/g, 'Gnome');
        html = html.replace(/schülerin/g, 'gnomin');
        html = html.replace(/schüler/g, 'gnome');
        html = html.replace(/Lehrer/g, 'Li-La-Lehrer');
        html = html.replace(/Gryffindor/g, 'Löwchen');
        html = html.replace(/Hufflepuff/g, 'Dächschen');
        html = html.replace(/Slytherin/g, 'Schlängchen');
        html = html.replace(/Ravenclaw/g, 'Räbchen');
        if (hours >= 18) {
            html = html.replace(/Quidditch/g, 'Besendings');
            html = html.replace(/Mitarbeiter/g, 'Superhelden');
            html = html.replace(/Schnatz/g, 'Schmatz');
            html = html.replace(/Potter/g, 'Podder');
            html = html.replace(/Newt/g, 'Niut');
            html = html.replace(/alles/g, 'everything');
            html = html.replace(/Alles/g, 'Everything');
            html = html.replace(/(?![^<]*>)ph/g, 'pf');
            html = html.replace(/Ph/g, 'Pf');
            html = html.replace(/sunny/gi, 'stirbsonnig1');
            html = html.replace(/Nina/gi, 'diecheesy2');
        }
        if (hours >= 20) {
            html = html.replace(/(?![^<]*>)t/g, 'd');
            html = html.replace(/T/g, 'D');
            html = html.replace(/ß/g, ':ß:');
            html = html.replace(/(?![^<]*>)ss/g, 'ß');
            html = html.replace(/:ß:/g, 'ss');
            html = html.replace(/(?![^<]*>)(der|die|das)/g, 'the');
            html = html.replace(/(Der|Die|Das)/g, 'The');
        }
        element.innerHTML = html;
    }
}

function specializeElement(element, hours) {
    var hash = elementToHash(element);
    var factor = (hours - 12) / 2;
    var fontNumber = rand(hash, 400, 5);
    if (fontNumber < factor) {
        element.style.fontFamily = "'Bonbon', cursive";
    } else if (fontNumber < 6 + factor) {
        element.style.fontFamily = "'Jim Nightshade', cursive";
    } else if (fontNumber < 12 + factor) {
        element.style.fontFamily = "'Space Mono', monospace";
    } else if (fontNumber < 18 + factor) {
        element.style.fontFamily = "'Nova Oval', cursive";
    } else if (fontNumber < 24 + factor) {
        element.style.fontFamily = "'Indie Flower', cursive";
    } else if (fontNumber < 30 + factor) {
        element.style.fontFamily = "'VT323', monospace";
    } else if (fontNumber < 36 + factor) {
        element.style.fontFamily = "'Covered By Your Grace', cursive";
    } else if (fontNumber < 42 + factor) {
        element.style.fontFamily = "'Audiowide', cursive";
    } else if (fontNumber < 48 + factor) {
        element.style.fontFamily = "'Vidaloka', serif";
    } else if (fontNumber < 56 + factor) {
        element.style.fontFamily = "'Rock Salt', cursive";
    }
    if (rand(hash, 100, 6) < factor) {
        element.style.transform = 'rotate(180deg)';
    }
    if (rand(hash, 100, 7) < factor) {
        element.style.transform = 'scaleX(-1)';
    }
}

function animateImage(element) {
        var avatar = element.src.match(/avatar-(\d+)\.(jpg|gif|png)/)[1];
        var quer = avatar < 10 ? avatar : avatar % 9;
        var animate = true;
        var pos = 0;
        var x = 0;
        var y = 0;
        var z = 0;

        switch(quer){
            case 0:
            case 3:
                x = 1;
            case 1:
            case 6:
                y = 1;
                break;
            case 4:
            case 9:
                z = 1;
                break;
            case 7:
                x = 1; 
                y = 1;
                break;
            case 2:
                x = 1;
                z = 1;
                break;
            case 5:
                y = 1;
                z = 1;
                break;
            case 8:
                x = 1;
                y = 1;
                z = 1;
                break;
            default:
                animate = false;
        }
        var id = animate ? setInterval(function () {
            if (pos == 359) {
                pos = 0;
            } else {
                pos++;
                element.style.transform = 'rotate3d(' + x + ',' + y + ',' + z + ',' + pos + 'deg)';
            }
        }, rand(quer, 100, 0)) : '';
}

function locationtrigger() {
  var input = document.querySelector('textarea');
  return input === null;
}

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

document.querySelectorAll('a[href^="profile.php"], a[href^="profile.php"] font').forEach(function (element) {
    colorizeElement(element)
});

var date = new Date();
var hours = date.getHours();

if (hours >= 12 && locationtrigger()) {
    document.querySelectorAll('td[class="normalfont"][align="left"]').forEach(function (post) {
        colorizeElementDark(post, hours);
    });
    
    document.querySelectorAll('.tablecat_fc td[align="left"] span.normalfont b, .smallfont, .tablea, .tableb').forEach(function (element) {
       specializeElement(element, hours);
       replaceHTML(element, hours);
    });

    if (hours >= 22) {
        document.querySelectorAll('img[src^="images/avatars/avatar-"]').forEach(function (avatar) {
            animateImage(avatar, hours);
        });
    }
}
