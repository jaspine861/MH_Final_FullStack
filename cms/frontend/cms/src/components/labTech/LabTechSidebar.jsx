// import { NavLink } from "react-router-dom";
// import "./LabTechSidebar.css";

// import dashboardIcon from "../../assets/dashboard.png";
// import patientsIcon from "../../assets/online-booking.png";

// function LabTechSidebar() {
//     return (
//         <aside className="lab-tech-sidebar">

//             <nav className="lab-tech-sidebar-menu">

//                 <NavLink
//                     to="/lab-tech/dashboard"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "lab-tech-menu-item active"
//                             : "lab-tech-menu-item"
//                     }
//                 >
//                     <img src={dashboardIcon} alt="" />
//                     <span>Dashboard</span>
//                 </NavLink>

//                 <NavLink
//                     to="/lab-tech/test-management"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "lab-tech-menu-item active"
//                             : "lab-tech-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Test management</span>
//                 </NavLink>

//                 <NavLink
//                     to="/lab-tech/patient-report"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "lab-tech-menu-item active"
//                             : "lab-tech-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Patient report</span>
//                 </NavLink>

//                 <NavLink
//                     to="/lab-tech/available-tests"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "lab-tech-menu-item active"
//                             : "lab-tech-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Available tests</span>
//                 </NavLink>

//             </nav>

//         </aside>
//     );
// }

// export default LabTechSidebar;
import { NavLink } from "react-router-dom";
import "./LabTechSidebar.css";

import dashboardIcon from "../../assets/dashboard.png";
import patientsIcon from "../../assets/online-booking.png";

import projectman from "../../assets/patient.png";
import availabletest from "../../assets/accessibility-testing.png"

function LabTechSidebar() {
    return (
        <aside className="lab-tech-sidebar">

            <nav className="lab-tech-sidebar-menu">

                <NavLink
                    to="/lab-tech/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "lab-tech-menu-item active"
                            : "lab-tech-menu-item"
                    }
                >
                    <img src={dashboardIcon} alt="" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/lab-tech/test-management"
                    className={({ isActive }) =>
                        isActive
                            ? "lab-tech-menu-item active"
                            : "lab-tech-menu-item"
                    }
                >
                    <img src={projectman} alt="" />
                    <span>Test management</span>
                </NavLink>

                <NavLink
                    to="/lab-tech/patient-report"
                    className={({ isActive }) =>
                        isActive
                            ? "lab-tech-menu-item active"
                            : "lab-tech-menu-item"
                    }
                >
                    <img src={patientsIcon} alt="" />
                    <span>Patient report</span>
                </NavLink>

                <NavLink
                    to="/lab-tech/available-tests"
                    className={({ isActive }) =>
                        isActive
                            ? "lab-tech-menu-item active"
                            : "lab-tech-menu-item"
                    }
                >
                    <img src={availabletest} alt="" />
                    <span>Available tests</span>
                </NavLink>

            </nav>

        </aside>
    );
}

export default LabTechSidebar;