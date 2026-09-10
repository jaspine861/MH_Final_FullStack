
// import "./AdminWelcomeCard.css";
// import welcomeCardImage from "../../assets/welcome_card_img.png";

// function AdminWelcomeCard() {
//     return (
//         <div className="admin-welcome-card">

//             <div className="admin-welcome-text">
//                 <h2>Hello, Admin</h2>
//                 <p>Welcome to your dashboard</p>
//             </div>

//             <div className="admin-welcome-image">
//                 <img
//                     src={welcomeCardImage}
//                     alt="Admin"
//                 />
//             </div>

//         </div>
//     );
// }

// export default AdminWelcomeCard;

import "./AdminWelcomeCard.css";
import welcomeCardImage from "../../assets/welcomeimage.png";

function AdminWelcomeCard() {
    return (
        <div className="admin-welcome-card">

            <div className="admin-welcome-text">
                <h2>Hello, Admin</h2>
                <p>Welcome to your dashboard</p>
            </div>

            <div className="admin-welcome-image">
                <img
                    src={welcomeCardImage}
                    alt="Admin"
                />
            </div>

        </div>
    );
}

export default AdminWelcomeCard;