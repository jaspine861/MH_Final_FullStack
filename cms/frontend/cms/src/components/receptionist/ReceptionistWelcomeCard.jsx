import "./ReceptionistWelcomeCard.css";
import welcomeCardImage from "../../assets/welcome_card_img.png";

function ReceptionistWelcomeCard() {
    return (
        <div className="receptionist-welcome-card">

            <div className="receptionist-welcome-text">
                <h2>Hello, Receptionist</h2>
                <p>Welcome to your dashboard</p>
            </div>

            <div className="receptionist-welcome-image">
                <img
                    src={welcomeCardImage}
                    alt="Receptionist"
                />
            </div>

        </div>
    );
}

export default ReceptionistWelcomeCard;