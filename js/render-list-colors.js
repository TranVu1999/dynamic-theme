const numberColors = 36;

var style = document.createElement('style');
style.innerHTML = ``;
resultClasses = '';
document.getElementsByTagName('head')[0].appendChild(style);
const fraction = 1 / (numberColors - 1);

function lightOrDark(color) {

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

      // If HEX --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

      r = color[1];
      g = color[2];
      b = color[3];
    }
    else {

      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'
      )
               );

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }

    // HSP equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

      return true;
    }
    return false;
}

var h2r = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};

var r2h = function(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
};

// Interpolates two [r,g,b] colors and returns an [r,g,b] of the result
var _interpolateColor = function(color1, color2, factor) {
    if (arguments.length < 3) { factor = 0.5; }
    var result = color1.slice();

    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
    }
    return result;
};


function createColors(prefix, originalColor) {
    for(let idx = 0; idx < numberColors; idx++) {
        const icol = _interpolateColor(originalColor, [255, 255, 255], fraction * idx);
        const hcol = r2h(icol);

        resultClasses += `
            .bg-${prefix}-${idx} {
                background-color: ${hcol};
                color: ${lightOrDark(hcol) ? '#000000' : '#ffffff'}
            }
            .text-${prefix}-${idx} {
                color: ${hcol}!important;
            }

        `;
        style.innerHTML += `
            .bg-${prefix}-${idx} {
                background-color: ${hcol};
                color: ${lightOrDark(hcol) ? '#000000' : '#ffffff'}
            }
            .text-${prefix}-${idx} {
                color: ${hcol};
            }
        `;
    }

    localStorage.setItem('theme', resultClasses);
}

function renderListColorItems(prefix, idElement) {
    const containerElm = document.getElementById(idElement);

    if(containerElm) {
        for(let i = 0; i < numberColors; i++) {
            containerElm.innerHTML += `<div class="bg-${prefix}-${i} color-item">${prefix}-${i}</div>`;
        }
    }
}

const mainColor0Elm = document.getElementById('mainColor0');
const mainColor0 = h2r(mainColor0Elm.value);
createColors('color0', mainColor0, lightOrDark(mainColor0Elm.value));
mainColor0Elm.addEventListener('change', e => {
    createColors('color0', h2r(e.target.value), lightOrDark(e.target.value));
});

const mainColor1Elm = document.getElementById('mainColor1');
const mainColor1 = h2r(mainColor1Elm.value);
createColors('color1', mainColor1);
mainColor1Elm.addEventListener('change', e => {
    createColors('color1', h2r(e.target.value), lightOrDark(e.target.value));
});

const mainColor2Elm = document.getElementById('mainColor2');
const mainColor2 = h2r(mainColor2Elm.value);
createColors('color2', mainColor2);
mainColor2Elm.addEventListener('change', e => {
    createColors('color2', h2r(e.target.value), lightOrDark(e.target.value));
});

const mainColor3Elm = document.getElementById('mainColor3');
const mainColor3 = h2r(mainColor3Elm.value);
createColors('color3', mainColor3);
mainColor3Elm.addEventListener('change', e => {
    createColors('color3', h2r(e.target.value), lightOrDark(e.target.value));
});

const mainColor4Elm = document.getElementById('mainColor4');
const mainColor4 = h2r(mainColor4Elm.value);
createColors('color4', mainColor4);
mainColor4Elm.addEventListener('change', e => {
    createColors('color4', h2r(e.target.value), lightOrDark(e.target.value));
});

const mainColor5Elm = document.getElementById('mainColor5');
const mainColor5 = h2r(mainColor5Elm.value);
createColors('color5', mainColor5);
mainColor5Elm.addEventListener('change', e => {
    createColors('color5', h2r(e.target.value), lightOrDark(e.target.value));
});



renderListColorItems('color0', 'listColors0');
renderListColorItems('color1', 'listColors1');
renderListColorItems('color2', 'listColors2');
renderListColorItems('color3', 'listColors3');
renderListColorItems('color4', 'listColors4');
renderListColorItems('color5', 'listColors5');