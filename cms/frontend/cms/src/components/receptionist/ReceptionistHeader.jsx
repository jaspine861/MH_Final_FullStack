import "./ReceptionistHeader.css";
import { useNavigate } from "react-router-dom";

import hospitalLogo from "../../assets/hospital_logo.png";
import profilePic from "../../assets/profilePic.png";

function ReceptionistHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="receptionist-header">

            {/* Left side */}
            <div className="receptionist-header-left">

                <img
                    src={hospitalLogo}
                    alt="Hospital Logo"
                    className="receptionist-hospital-logo"
                />

                <h2>Kims</h2>

            </div>

            {/* Right side */}
            <div className="receptionist-header-right">

                {/* Logout */}
                <button
                    className="receptionist-logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <div className="receptionist-header-divider"></div>

                {/* Profile */}
                <img
                    src={profilePic}
                    alt="Profile"
                    className="receptionist-profile-pic"
                />

                <span className="receptionist-user-name">
                    Receptionist
                </span>

            </div>

        </header>
    );
}

export default ReceptionistHeader;