const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

const highlightLink = (e) => {
    const linkCoords =  e.target.getBoundingClientRect();
    const coords = {
        width:linkCoords.width,
        height:linkCoords.height,
        top:linkCoords.top + window.scrollY,
        left:linkCoords.left + window.scrollX
    };
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.position = "absolute";
    highlight.style.top = `${coords.top}px`;
    highlight.style.left = `${coords.left}px`;
};

triggers.forEach((link) => {
    link.addEventListener('mouseenter', highlightLink)
})