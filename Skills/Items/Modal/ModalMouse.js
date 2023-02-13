import React, {Component} from "react";
import PropTypes from 'prop-types';
import { boxWidth, boxHeight, halfBW, halfBH, boxLeft, boxTop } from '../_vars';


class ModalHTML extends Component {
    static get propTypes() { 
        return {
            children: PropTypes.any,
            skill: PropTypes.string,
            style: PropTypes.string,
            styleb: PropTypes.string,
            options: PropTypes.string,
            handleMouseEnter: PropTypes.string,
            handleMouseLeave: PropTypes.string,
            handleMouseMove: PropTypes.string,
            whichModal: PropTypes.string
        }; 
    }

    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: boxWidth,
                height: boxHeight,
                position: 'absolute',
                top: 'calc(50% - ' + halfBH + 'px)',
                left: 'calc(50% - ' + halfBW + 'px)',
            },
            styleb: {
                width: boxWidth,
                height: boxHeight,
                borderRadius: (boxWidth * 0.05) + 'px',
                easing: 'ease-in-out',
                backgroundImage: 'linear-gradient(125deg,#f09 30%,#fc8b00,#ff0,#00ff8a,#00cfff,#cc4cfa 70%)',
            }
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
            reset: true
        }

        this.width = null;
        this.height = null;
        this.left = null;
        this.top = null;
        this.transitionTimeout = null;
        this.updateCall = null;
        this.element = null;
        this.settings = {
            ...defaultSettings,
            ...this.props.options,
        }
        this.reverse = this.settings.reverse ? -1 : 1;

        this.handleMouseEnter = this.handleMouseEnter.bind(this, this.props.handleMouseEnter);
        this.handleMouseMove = this.handleMouseMove.bind(this, this.props.handleMouseMove);
        this.handleMouseLeave = this.handleMouseLeave.bind(this, this.props.handleMouseLeave);
    }

    componentDidMount() {
        this.element = React.createRef();
    }

    componentWillUnmount() {
        clearTimeout(this.transitionTimeout);
        cancelAnimationFrame(this.UpdateCall);
    }

    handleMouseEnter(cb = () => { }, e) {
        this.updateElementPosition();
        this.setState(prevState => ({
            style: {
                ...prevState.style,
            },
            styleb: {
                ...prevState.styleb,
            }
        }));
        this.setTransition();
        return cb(e);
    }

    reset() {
        window.requestAnimationFrame(() => {
            this.setState(prevState => ({
                style: {
                    ...prevState.style,
                    transform: `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
                },
                styleb: {
                    ...prevState.styleb,
                }
            }))
        })
    }

    handleMouseMove(cb = () => { }, e) {
        e.persist();

        if (this.updateCall !== null) {
            window.cancelAnimationFrame(this.updateCall); 
        }

        this.event = e;
        this.updateCall = requestAnimationFrame(this.update.bind(this, e));

        return cb(e);
    }

    setTransition() {
        clearTimeout(this.transitionTimeout);
        
        this.setState(prevState => ({
            style: {
                ...prevState.style,
                transition: `${this.settings.speed}ms ${this.settings.easing}`,
            },
            styleb: {
                ...prevState.styleb,
            }
        }))

        this.transitionTimeout = setTimeout(() => {
            this.setState(prevState => ({
                style: {
                    ...prevState.style,
                    transition: '',
                },
                styleb: {
                    ...prevState.styleb,
                }
            }))
        }, this.settings.speed)
    }

    handleMouseLeave(cb = () => { }, e) {
        this.setTransition();

        if (this.settings.reset) {
            this.reset();
        }
        return cb(e);
    }
    getValues(e) {
        const x = (e.nativeEvent.clientX - boxLeft) / boxWidth;
        const y = (e.nativeEvent.clientY - boxTop) / boxHeight;
        const _x = Math.min(Math.max(x, 0), 1);
        const _y = Math.min(Math.max(y, 0), 1);

        const tiltX = (this.reverse * (this.settings.max / 2 - _x * this.settings.max)).toFixed(2);
        const tiltY = (this.reverse * (_y * this.settings.max - this.settings.max / 2)).toFixed(2);

        const percentageX = _x * 100;
        const percentageY = _y * 100;

        return {
            tiltX,
            tiltY,
            percentageX,
            percentageY,
        }
    }
    
    updateElementPosition() {
        const rect = this.element.getBoundingClientRect();
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = rect.left;
        this.top = rect.top;
    }

    update(e) {
        let values = this.getValues(e);

        this.setState(prevState => ({
            style: {
                ...prevState.style,
                transform: `perspective(${this.settings.perspective}px)
                    rotateX(${this.settings.axis === 'x' ? 0 : values.tiltY}deg)
                    rotateY(${this.settings.axis === 'y' ? 0 : values.tiltX}deg)
                    scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`,
            },
            styleb: {
                ...prevState.styleb,
                backgroundImage: `linear-gradient(${Math.abs(values.tiltY * 10)}deg, #a62c2b 30%, #da680f, #fdcc0d 50%, #296e01, #32527b, #4b0082, #5b0a91 70%)`,
            }
        }))
        this.updateCall = null;
    }

    render() {
        const style = {
            ...this.props.style,
            ...this.state.style
        }

        const specularStyle = {
            ...this.props.styleb,
            ...this.state.styleb
        }
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
        
        let slug = JSON.parse(this.props.whichModal);
        console.log("slug: " + slug);
        let skillImg = "/images/Skills/" + slug + "-" + imgWidth + "x" + imgHeight + ".webp";
        let backImg = "/images/Skills/back-" + imgWidth + "x" + imgHeight + ".webp";

        return (
            <>
                <span className="close" >&times;</span>
                <div 
                    className="cardFlip" 
                    id="cardContainer"
                    style={style}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseMove={this.handleMouseMove}
                    onMouseLeave={this.handleMouseLeave}
                    ref={this.myRef}
                >
                    {this.props.children}
                    <div 
                        className="cardFront shader" 
                        id="cardInner"
                    >
                        <img 
                            src={skillImg} 
                            className="modal-content" 
                            alt={this.props.skill}
                        />
                        <div className="shader__layer specular" style={specularStyle} >
                            <div className="shader__layer mask"  />
                        </div>
                    </div>
                    <div className="cardBack">
                        <img 
                            src={backImg} 
                            className="modal-contentBG" 
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default ModalHTML