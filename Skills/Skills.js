import React, {useEffect, useRef, useState} from "react";
import './Skills.scss';
import SkillsItems from "./Items/SkillsItems";

const Skills = () => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    }
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        }
    }, [containerRef, options])

    return (
        <>
            <div ref={ containerRef } />
            <div className='container skillsContainer' id="Skills">
                {isVisible && <h1 className="skillsH1">Skills & Abilities</h1>}
                {/* Only render the h1 tag if isVisible is true */}
                {!isVisible && <div className="placeholder">Skills & Abilities</div>}
                {/* Only render the placeholder if isVisible is false */}
                <SkillsItems />
            </div>
        </>
     );
}
 
export default Skills;