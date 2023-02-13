import React, { useState } from "react";
import { Portal } from 'react-portal';
import SkillsList from "./SkillsList";
import ModalGyro from "./Modal/ModalGyro";
import ModalMouse from "./Modal/ModalMouse";

const SkillsItems = () => {
    const [modal, setModal] = useState(false);
    const [isShown, setIsShown] = useState("");
    const [mouseOrGyro, setMouseOrGyro] = useState("");
    const toggleModal = () => {
        setModal(!modal);
    }
    if(modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <>
            <ul className="skillsList">
                {SkillsList.map((skill) => {
                    const toggleShown = () => {
                        if (isShown == ("")) {
                            setIsShown(skill.slug);
                        } else {
                            setIsShown("");
                        }
                    }
                    let image = "/images/Skills/" + skill.slug +"-0400x0225.webp"
                    let experience = new Date().getFullYear() - skill.firstUse;
                    let altText = skill.name + " " + experience + "+ Years Experience";

                    let whichModal = JSON.stringify(skill.slug);
                    function modalClick() {
                        // feature detect
                        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                          DeviceOrientationEvent.requestPermission()
                            .then(permissionState => {
                              if (permissionState === 'granted') {
                                setMouseOrGyro(<ModalGyro whichModal={ whichModal } />);
                              } else {
                                setMouseOrGyro(<ModalMouse whichModal={ whichModal } />);
                              }
                            })
                            .catch(console.error);
                        } else {
                            // handle regular non iOS 13+ devices
                                window.addEventListener('deviceorientation', function(e) {
                                    if (e.gamma === null) {
                                        setMouseOrGyro(<ModalMouse whichModal={ whichModal } />);
                                    } else {
                                        setMouseOrGyro(<ModalGyro whichModal={ whichModal } />);
                                    }
                                });
                        }
                    }
                    return (
                        <>
                            <li className="skillsItems" onClick={ toggleShown } key={skill.id}>
                                <div className="" onClick={ modalClick }>
                                    <img 
                                        src= { image }
                                        onClick={ toggleModal }
                                        className="smallCard" 
                                        alt={ altText } 
                                    />
                                </div>
                                {modal && (
                                    <>
                                        {isShown == skill.slug && (
                                            <Portal>
                                                <div
                                                    className={ skill.slug + " skillsModal" }
                                                    onClick={ toggleModal }
                                                > 
                                                    { mouseOrGyro }
                                                </div>
                                            </Portal>
                                        )}
                                    </>
                                )}
                            </li>
                        </>
                    )
                })}
            </ul>
        </>
    );
}

export default SkillsItems;