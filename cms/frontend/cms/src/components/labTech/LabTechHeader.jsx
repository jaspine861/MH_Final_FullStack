import "./LabTechHeader.css";
import { useNavigate } from "react-router-dom";

import hospitalLogo from "../../assets/hospital_logo.png";
import profilePic from "../../assets/profilePic.png";

function LabTechHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="lab-tech-header">

            {/* Left side */}
            <div className="lab-tech-header-left">

                <img
                    src={hospitalLogo}
                    alt="Hospital Logo"
                    className="lab-tech-hospital-logo"
                />

                <h2>Kims</h2>

            </div>

            {/* Right side */}
            <div className="lab-tech-header-right">

                {/* Logout */}
                <button
                    className="lab-tech-logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <div className="lab-tech-header-divider"></div>

                {/* Profile */}
                <img
                    src={profilePic}
                    alt="Profile"
                    className="lab-tech-profile-pic"
                />

                <span className="lab-tech-user-name">
                    Lab Technician
                </span>

            </div>

        </header>
    );
}

export default LabTechHeader;
