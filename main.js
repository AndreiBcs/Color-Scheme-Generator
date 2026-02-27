const baseColor = document.getElementById('base-color');
const schmeType = document.getElementById('scheme-type');
const generateBtn = document.getElementById('generate-btn');
const colorContainer = document.getElementById('color-scheme');
const copiedMsg = document.getElementById('copied-message');

window.onload = () => {
    getColorScheme();
}

generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getColorScheme();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        getColorScheme();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains('color-box')) {
        navigator.clipboard.writeText(e.target.textContent)
            .then(() => {
                copiedMsg.style.opacity = '1';
                setTimeout(() => {
                    copiedMsg.style.opacity = '0';
                }, 2000);
            })
            .catch(err => console.error('Error copying to clipboard:', err));
    }
});


function getColorScheme() {
    const color = baseColor.value.substring(1);
    const scheme = schmeType.value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`)
        .then(response => response.json())
        .then(data => {
            colorContainer.innerHTML = '';
            data.colors.forEach(color => {
                const colorDiv = document.createElement('button');
                colorDiv.classList.add('color-box');
                colorDiv.style.backgroundColor = color.hex.value;
                colorDiv.textContent = color.hex.value;
                colorDiv.style.color = getContrastColor(color.hex.value);
                colorContainer.appendChild(colorDiv);
            });
        })
        .catch(error => console.error('Error fetching color scheme:', error));
}

function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}