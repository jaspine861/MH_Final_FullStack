import "./PharmacistWelcomeCard.css";
import welcomeCardImage from "../../assets/welcome_card_img.png";

function PharmacistWelcomeCard() {
    return (
        <div className="pharmacist-welcome-card">

            <div className="pharmacist-welcome-text">
                <h2>Hello, Pharmacist</h2>
                <p>Welcome to your dashboard</p>
            </div>

            <div className="pharmacist-welcome-image">
                <img
                    src={welcomeCardImage}
                    alt="Pharmacist"
                />
            </div>

        </div>
    );
}

export default PharmacistWelcomeCard;