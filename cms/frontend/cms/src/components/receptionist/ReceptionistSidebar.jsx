import { NavLink } from "react-router-dom";
import "./ReceptionistSidebar.css";

import dashboardIcon from "../../assets/dashboard.png";
import patientsIcon from "../../assets/online-booking.png";

function ReceptionistSidebar() {
    return (
        <aside className="receptionist-sidebar">

            <nav className="receptionist-sidebar-menu">

                <NavLink
                    to="/receptionist/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "receptionist-menu-item active"
                            : "receptionist-menu-item"
                    }
                >
                    <img src={dashboardIcon} alt="" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/patientList"
                    className={({ isActive }) =>
                        isActive
                            ? "receptionist-menu-item active"
                            : "receptionist-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Patient List</span>
                </NavLink>
                   <NavLink
                    to="/receptionist/appointments"
                    className={({ isActive }) =>
                        isActive
                            ? "receptionist-menu-item active"
                            : "receptionist-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Appointments</span>
                </NavLink>
            <NavLink
                    to="/receptionist/billing"
                    className={({ isActive }) =>
                        isActive
                            ? "receptionist-menu-item active"
                            : "receptionist-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Billing</span>
                </NavLink>
            </nav>

        </aside>
    );
}

export default ReceptionistSidebar;