
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const boxWidth = 800;
const boxHeight = (9 / 16) * boxWidth;
const halfBW = (boxWidth / 2);
const halfBH = (boxHeight / 2);
const boxLeft = (vw / 2) - halfBW;
const boxTop = (vh / 2) - halfBH;


let imgWidth;
let imgHeight;
switch (true) {
    case (vw > 3000):
        imgWidth = "3200";
        imgHeight = "1800";
    break;
    case (vw > 1500):
        imgWidth = "1600";
        imgHeight = "0900";
    break;
    default:
        imgWidth = "0800";
        imgHeight = "0450";
}  


export { vw, vh, boxWidth, boxHeight, halfBW, halfBH, boxLeft, boxTop, imgWidth, imgHeight };