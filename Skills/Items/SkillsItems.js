import React, { useState } from "react";
import { Portal } from 'react-portal';
import SkillsList from "./SkillsList";
import ModalGyro from "./Modal/ModalGyro";
import ModalMouse from "./Modal/ModalMouse";

const imgDir = "/wp-content/themes/functional-codeaholic/assets/images/skills-cards/";

// detect if device has Gyroscopic positioning available
function isDeviceWithGyro() {
    let gyro = false;
    let permission = false;
    window.addEventListener('deviceorientation', function(e) {
        if (e.gamma !== null) {
            gyro = true;
        }
    });
// iOS 13+ devices require permission to use Gyro. Get permission if it is one of those devices.
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            permission = true;
          }
        })
        .catch(console.error);
    }
    return true;
}

// detect if device is likely a laptop based on OS of device.
function isLaptop() {
    const isDesktopOS = ['MacIntel', 'Win32', 'Win64', 'Linux i686', 'Linux x86_64'].includes(navigator.userAgentData.platform);

    return isDesktopOS;
}

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
                    let image = imgDir + skill.slug +"-0400x0225.webp"
                    let experience = new Date().getFullYear() - skill.firstUse;
                    let altText = skill.name + " " + experience + "+ Years Experience";

                    let whichSkill = JSON.stringify(skill.slug);
                    function modalClick() {
                        setMouseOrGyro(<ModalMouse whichSkill={ whichSkill } />);
                        if (!isLaptop() && isDeviceWithGyro()) {
                            setMouseOrGyro(<ModalGyro whichSkill={ whichSkill } />);
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
                                                    key={skill.id}
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