import "./Header.css";
import { useNavigate } from "react-router-dom";

import hospitalLogo from "../../assets/hospital_logo.png";
import profilePic from "../../assets/profilePic.png";

function Header() {

    const navigate = useNavigate();

    const doctorName =
        localStorage.getItem("userName") || "Doctor";

    const handleLogout = () => {

        localStorage.removeItem("doctorId");
        localStorage.removeItem("doctorName");

        navigate("/");
    };

    return (
        <header className="header">

            {/* Left side */}
            <div className="header-left">

                <img
                    src={hospitalLogo}
                    alt="Hospital Logo"
                    className="hospital-logo"
                />

                <h2>Kims</h2>

            </div>


            {/* Right side */}
            <div className="header-right">

                {/* Logout */}
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <div className="header-divider"></div>


                {/* Profile */}
                <img
                    src={profilePic}
                    alt="Profile"
                    className="profile-pic"
                />

                <span className="user-name">
                    Dr. {doctorName}
                </span>

            </div>

        </header>
    );
}

export default Header;