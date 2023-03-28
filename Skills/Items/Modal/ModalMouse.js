import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { boxWidth, boxHeight, halfBW, halfBH, boxLeft, boxTop } from '../_vars';

const imgDir = "/wp-content/themes/functional-codeaholic/assets/images/skills-cards/";

const defaultStyle = {
  width: boxWidth,
  height: boxHeight,
  position: 'absolute',
  top: `calc(50% - ${halfBH}px)`,
  left: `calc(50% - ${halfBW}px)`,
};

const defaultStyleb = {
  width: boxWidth,
  height: boxHeight,
  borderRadius: `${boxWidth * 0.05}px`,
  easing: 'ease-in-out',
  backgroundImage: 'linear-gradient(125deg,#f09 30%,#fc8b00,#ff0,#00ff8a,#00cfff,#cc4cfa 70%)',
};

const defaultSettings = {
  reverse: false,
  max: 50,
  perspective: 1000,
  easing: 'ease-in-out',
  scale: '1',
  speed: '1000',
  transition: true,
  axis: null,
  reset: true,
};

function ModalHTML(props) {
  const [style, setStyle] = useState(defaultStyle);
  const [styleb, setStyleb] = useState(defaultStyleb);
  const elementRef = useRef(null);

  let width = null;
  let height = null;
  let left = null;
  let top = null;
  let transitionTimeout = null;
  let updateCall = null;
  let element = null;

  const { options = {}, handleMouseEnter, handleMouseMove, handleMouseLeave, whichSkill } = props;
  const settings = { ...defaultSettings, ...options };
  const reverse = settings.reverse ? -1 : 1;

  const handleMouseEnterCallback = (cb = () => { }, e) => {
    updateElementPosition();
    setStyle({ ...style });
    setStyleb({ ...styleb });
    setTransition();
    return cb(e);
  };

  const reset = () => {
    window.requestAnimationFrame(() => {
      setStyle({
        ...style,
        transform: `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      });
      setStyleb({ ...styleb });
    });
  };

  const handleMouseMoveCallback = (cb = () => { }, e) => {
    e.persist();

    if (updateCall !== null) {
      window.cancelAnimationFrame(updateCall);
    }

    const values = getValues(e);
    updateCall = requestAnimationFrame(() => update(values, e));
    return cb(e);
  };

  const setTransition = () => {
    clearTimeout(transitionTimeout);

    setStyle({
      ...style,
      transition: `${settings.speed}ms ${settings.easing}`,
    });

    setStyleb({ ...styleb });

    transitionTimeout = setTimeout(() => {
      setStyle({ ...style, transition: '' });
      setStyleb({ ...styleb });
    }, settings.speed);
  };

  const handleMouseLeaveCallback = (cb = () => { }, e) => {
    setTransition();

    if (settings.reset) {
      reset();
    }
    return cb(e);
  };

  const getValues = (e) => {
        const x = (e.nativeEvent.clientX - boxLeft) / boxHeight;
        const y = (e.nativeEvent.clientY - boxTop) / boxWidth;
        const _x = Math.min(Math.max(x, 0), 1);
        const _y = Math.min(Math.max(y, 0), 1);
        const tiltX = (reverse * (settings.max / 2 - _x * settings.max)).toFixed(2);
        const tiltY = (reverse * (_y * settings.max - settings.max / 2)).toFixed(2);

        const percentageX = _x * 100;
        const percentageY = _y * 100;

        return {
            tiltX,
            tiltY,
            percentageX,
            percentageY,
        };
    };

    const updateElementPosition = () => {
        const rect = elementRef.current.getBoundingClientRect();
        width = elementRef.current.offsetWidth;
        height = elementRef.current.offsetHeight;
        left = rect.left;
        top = rect.top;
    };

    const update = (values, e) => {
        setStyle(prevState => ({
            ...prevState,
            transform: `perspective(${settings.perspective}px)
                rotateX(${settings.axis === 'x' ? 0 : values.tiltY}deg)
                rotateY(${settings.axis === 'y' ? 0 : values.tiltX}deg)
                scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`,
        }));

        setStyleb(prevState => ({
            ...prevState,
            backgroundImage: `linear-gradient(${Math.abs(values.tiltY * 10)}deg, #a62c2b 30%, #da680f, #fdcc0d 50%, #296e01, #32527b, #4b0082, #5b0a91 70%)`,
        }));
        updateCall = null;
    };

    let imgWidth;
    let imgHeight;
    switch (true) {
    case (boxWidth > 2399):
        imgWidth = "3200";
        imgHeight = "1800";
        break;
    case (boxWidth > 1199):
        imgWidth = "1600";
        imgHeight = "0900";
        break;
    default:
        imgWidth = "0800";
        imgHeight = "0450";
    }

    let slug = JSON.parse(whichSkill);
    let skillImg = imgDir + slug + "-" + imgWidth + "x" + imgHeight + ".webp";
    let backImg = imgDir + "back-" + imgWidth + "x" + imgHeight + ".webp";

    return (
    <>
        <span className="close" >&times;</span>
        <div
            className="cardFlip"
            id="cardContainer"
            style={style}
            onMouseEnter={handleMouseEnterCallback.bind(this, handleMouseEnter)}
            onMouseMove={handleMouseMoveCallback.bind(this, handleMouseMove)}
            onMouseLeave={handleMouseLeaveCallback.bind(this, handleMouseLeave)}
            ref={elementRef}
        >
            {props.children}
            <div
                className="cardFront shader"
                id="cardInner"
            >
                <img
                    src={skillImg}
                    className="modal-content"
                    alt={props.skill}
                />
                <div className="shader__layer specular" style={styleb} >
                    <div className="shader__layer mask" />
                </div>
            </div>
            <div className="cardBack">
                <img
                    src={backImg}
                    className="modal-contentBG"
                    alt={slug}
                />
            </div>
        </div>
    </>
    );
}

ModalHTML.propTypes = {
    children: PropTypes.any,
    skill: PropTypes.string,
    style: PropTypes.string,
    styleb: PropTypes.string,
    options: PropTypes.string,
    handleMouseEnter: PropTypes.string,
    handleMouseLeave: PropTypes.string,
    handleMouseMove: PropTypes.string,
    whichSkill: PropTypes.string
};

export default ModalHTML;