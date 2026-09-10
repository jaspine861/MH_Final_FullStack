import { NavLink } from "react-router-dom";
import "./DoctorSidebar.css";

import dashboardIcon from "../../assets/dashboard.png";
import patientsIcon from "../../assets/online-booking.png";

function DoctorSidebar() {
    return (
        <aside className="doctor-sidebar">

            <nav className="doctor-sidebar-menu">

                <NavLink
                    to="/doctor/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "doctor-menu-item active"
                            : "doctor-menu-item"
                    }
                >
                    <img src={dashboardIcon} alt="" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/patients"
                    className={({ isActive }) =>
                        isActive
                            ? "doctor-menu-item active"
                            : "doctor-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Appointments</span>
                </NavLink>

                {/* <NavLink
                    to="/patients"
                    className={({ isActive }) =>
                        isActive
                            ? "doctor-menu-item active"
                            : "doctor-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Patients</span>
                </NavLink> */}

                {/* <NavLink
                    to="/patients"
                    className={({ isActive }) =>
                        isActive
                            ? "doctor-menu-item active"
                            : "doctor-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Billing</span>
                </NavLink> */}
            </nav>

        </aside>
    );
}

export default DoctorSidebar;