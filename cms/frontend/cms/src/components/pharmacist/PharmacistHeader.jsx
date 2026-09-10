import "./PharmacistHeader.css";
import { useNavigate } from "react-router-dom";

import hospitalLogo from "../../assets/hospital_logo.png";
import profilePic from "../../assets/profilePic.png";

function PharmacistHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="pharmacist-header">

            {/* Left side */}
            <div className="pharmacist-header-left">

                <img
                    src={hospitalLogo}
                    alt="Hospital Logo"
                    className="pharmacist-hospital-logo"
                />

                <h2>Kims</h2>

            </div>

            {/* Right side */}
            <div className="pharmacist-header-right">

                {/* Logout */}
                <button
                    className="pharmacist-logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <div className="pharmacist-header-divider"></div>

                {/* Profile */}
                <img
                    src={profilePic}
                    alt="Profile"
                    className="pharmacist-profile-pic"
                />

                <span className="pharmacist-user-name">
                    Pharmacist
                </span>

            </div>

        </header>
    );
}

export default PharmacistHeader;