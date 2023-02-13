# shimmering-skill-cards

INSTALLATION INSTRUCTIONS
  1- upload the directory named "Skills" to the "src" directory in your app
  2- upload the directory named "images" to the "public" directory in your app
  3- in "App.js" or whichever file you'd like the cards to appear in, 
      put "import Skills from './Skills/Skills';" in the top of the file, and
      "<Skills />" in the file where you'd like them to appear. You may have to 
      adjust the import location depending on where you are calling the module from.
  4- run npm i react-portal to install the portal
      
PURPOSE
  A creative way of demonstrating your skills on a portfolio website.

INSPIRATION/CREDITS
  I saw a project some time ago where the coder had created playing cards that shimmered.
  I believe he used an app to create them, and uploaded them to show. Unfortunately, I 
  don't recall where I saw them, or who the creator was, so I can't give direct credit at
  this time.
  However, I thought that would be a great way to showcase my React.js, and SASS skills, so
  I set about creating my own.
 
 npm react-portal was created by Vojtech Miksu, and all credit for it's use belongs to them.
  
CREATIVE PROCESS
  I couldn't find anything referencing this, or talking about how to do it, so I broke it up
  into several parts, figured out each part, and put it all together to achieve my end result.
  1- creating the cards and the watermark that shimmers
    - this was pretty simple, just using photoshop and some css/sass 
  2- bringing them forward when clicked into a modal
    - there were too many built-in options to justify creating this from scratch, so I used 
      existing npm project Portal
    - used a bit of sass wizardry to make the cards animate flipping over as they come to the
      front
  3- making watermark shimmer when card moves
    - made use of several layers of images stacked on top of one another using css positioning
  4- making cards move in response to device tilt
    - checked if gyro is present/available in the device. If so, used gyro. If not, used mouse.
    - checked if gyro permission is required. If so, it is requested. Primarily an iOS safeguard
    - used an event listener to check/watch the tilt of the device and update when it changes
    - changed tilt of card and layers based on device tilt
  5- making cards move in response to mouse location
    - used handleMouseEnter, handleMouseMove, & handleMouseLeave to watch mouse position, and 
      tilt the card in response to mouse position
   
