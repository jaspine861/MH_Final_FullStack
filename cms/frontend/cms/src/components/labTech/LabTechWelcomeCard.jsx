// import "./LabTechWelcomeCard.css";
// import welcomeCardImage from "../../assets/welcome_card_img.png";

// function LabTechWelcomeCard() {
//     return (
//         <div className="lab-tech-welcome-card">

//             <div className="lab-tech-welcome-text">
//                 <h2>Hello, Lab Technician</h2>
//                 <p>Welcome to your dashboard</p>
//             </div>

//             <div className="lab-tech-welcome-image">
//                 <img
//                     src={welcomeCardImage}
//                     alt="Lab Technician"
//                 />
//             </div>

//         </div>
//     );
// }

// export default LabTechWelcomeCard;

import "./LabTechWelcomeCard.css";
import welcomeCardImage from "../../assets/welcome_card_img.png";
import biotechnology from "../../assets/biotechnology.png"

function LabTechWelcomeCard() {
    return (
        <div className="lab-tech-welcome-card">

            <div className="lab-tech-welcome-text">
                <h2>Hello, Lab Technician</h2>
                <p>Welcome to your dashboard</p>
            </div>

            <div className="lab-tech-welcome-image">
                <img
                    src={biotechnology}
                    alt="Lab Technician"
                />
            </div>

        </div>
    );
}

export default LabTechWelcomeCard;
