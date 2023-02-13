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
            <div className="" ref={ containerRef } />
            <div className='container skillsContainer' id="Skills">
                { isVisible ? (
                    <h1 className="skillsH1">Skills & Abilities</h1>
                ) : (
                    <div className="placeholder">Skills & Abilities</div>
                ) }
                <SkillsItems />
            </div>
        </>
     );
}
 
export default Skills;