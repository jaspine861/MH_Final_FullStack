import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";

import hospitalLogo from "../../assets/hospital_logo.png";
import profilePic from "../../assets/profilePic.png";

function AdminHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="admin-header">

            {/* Left side */}
            <div className="admin-header-left">

                <img
                    src={hospitalLogo}
                    alt="Hospital Logo"
                    className="admin-hospital-logo"
                />

                <h2>Kims</h2>

            </div>

            {/* Right side */}
            <div className="admin-header-right">

                {/* Logout */}
                <button
                    className="admin-logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

                <div className="admin-header-divider"></div>

                {/* Profile */}
                <img
                    src={profilePic}
                    alt="Profile"
                    className="admin-profile-pic"
                />

                <span className="admin-user-name">
                    Admin
                </span>

            </div>

        </header>
    );
}

export default AdminHeader;

