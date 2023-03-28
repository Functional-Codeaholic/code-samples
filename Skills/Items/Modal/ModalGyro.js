import React from "react";
import { imgHeight, imgWidth } from '../_vars';

const imgDir = '/wp-content/themes/functional-codeaholic/assets/images/skills-cards/';

const ModalCSS = (whichSkill) => {
    let count = 0;
    const updRate = 10;
    const tiltLimit = 45;

    function updateNow() {
        return count++ % updRate === 0;
    }

    window.addEventListener("deviceorientation", function(e) {
        if (updateNow()) {
            let positionY = Math.round(e.gamma);
            let positionX = Math.round(e.beta);
            if (Math.abs(positionY) > tiltLimit) {
                if (positionY > tiltLimit) {
                    positionY = tiltLimit;
                } else {
                    positionY = -tiltLimit;
                }
            }
            if (Math.abs(positionX) > tiltLimit) {
                if (positionX > tiltLimit) {
                    positionX = tiltLimit;
                } else {
                    positionX = -tiltLimit;
                }
            }
            positionY = positionY * -1;
            let bgDeg = Math.abs(positionY) * 10;
            document.getElementById("cardContainer").style.transform = "perspective(1000px) rotateX(" + positionX + "deg) rotateY(" + positionY + "deg)";
            document.getElementById("specular").style.backgroundImage =  "linear-gradient(" + bgDeg + "deg, #a62c2b 30%, #da680f, #fdcc0d 50%, #296e01, #32527b, #4b0082, #5b0a91 70%)";
            document.getElementById("specular").style.height = "53.4375vw";
            document.getElementById("specular").style.width = "95vw";
            document.getElementById("specular").style.left = "2.5vw";
            document.getElementById("specular").style.opacity = "0.75";
            document.getElementById("mask").style.backgroundColor = "#fff";
            document.getElementById("mask").style.opacity = "0.25";
            document.getElementById("mask").style.mixBlendMode = "color-burn";
            document.getElementById("cardBack").style.left = "2.5vw";
        }
    });
    
    let slug = JSON.parse(whichSkill.whichSkill);
    let skillImg = imgDir + slug + "-" + imgWidth + "x" + imgHeight + ".webp";
    let backImg = imgDir + "back-" + imgWidth + "x" + imgHeight + ".webp";

   
    return (
        <>
            <span className="close">&times;</span>
            <div 
                className="cardFlip"
                id="cardContainer"
            >
                <div 
                    className="cardFront shader" 
                    id="cardInner"
                >                 
                    <img 
                        src={skillImg} 
                        className="modal-content" 
                        alt={ slug }
                    />
                    <div className="shader__layer specular" id="specular" >
                        <div className="shader__layer mask" id="mask"  />
                    </div>
                </div>
                <div className="cardBack" id="cardBack">
                    <img 
                        src={backImg} 
                        className="modal-contentBG" 
                        alt={ slug }
                    />
                </div>
            </div>
        </>
      );
}
 
export default ModalCSS;