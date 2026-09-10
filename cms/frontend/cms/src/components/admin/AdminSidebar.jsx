
// import { NavLink } from "react-router-dom";
// import "./AdminSidebar.css";

// import dashboardIcon from "../../assets/dashboard.png";
// import patientsIcon from "../../assets/online-booking.png";

// function AdminSidebar() {
//     return (
//         <aside className="admin-sidebar">

//             <nav className="admin-sidebar-menu">

//                 <NavLink
//                     to="/admin/dashboard"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "admin-menu-item active"
//                             : "admin-menu-item"
//                     }
//                 >
//                     <img src={dashboardIcon} alt="" />
//                     <span>Dashboard</span>
//                 </NavLink>

//                 <NavLink
//                     to="/admin/staff"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "admin-menu-item active"
//                             : "admin-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Staff List</span>
//                 </NavLink>

//                 <NavLink
//                     to="/admin/doctors"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "admin-menu-item active"
//                             : "admin-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Doctor List</span>
//                 </NavLink>

//                 <NavLink
//                     to="/admin/medicines"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "admin-menu-item active"
//                             : "admin-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Medicine List</span>
//                 </NavLink>
//           {/* /admin/tests */}
//             <NavLink
//                     to="/admin/tests"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "admin-menu-item active"
//                             : "admin-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Lab Test List</span>
//                 </NavLink>
                
//                  <NavLink
//                     to="/admin/departmentList"
//                     className={({ isActive }) =>
//                         isActive
//                             ? "admin-menu-item active"
//                             : "admin-menu-item"
//                     }
//                 >
//                     <img src={patientsIcon} alt="" />
//                     <span>Department List</span>
//                 </NavLink>
//             </nav>

//         </aside>
//     );
// }

// export default AdminSidebar;

import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

import dashboardIcon from "../../assets/dashboard.png";
import patientsIcon from "../../assets/online-booking.png";
import doctoricon from "../../assets/doctor_icon.png";
import labicon from "../../assets/hospital-bed-icon.png";
import medicineicon from "../../assets/medicineicon.png";
import departmenticon from "../../assets/departmenticon.png";
import stafficon from "../../assets/stafficon.png";

function AdminSidebar() {
    return (
        <aside className="admin-sidebar">

            <nav className="admin-sidebar-menu">

                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={dashboardIcon} alt="" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/staff"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={stafficon} alt="" />
                    <span>Staff List</span>
                </NavLink>

                <NavLink
                    to="/admin/doctors"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={doctoricon} alt="" />
                    <span>Doctor List</span>
                </NavLink>

                <NavLink
                    to="/admin/medicines"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={medicineicon} alt="" />
                    <span>Medicine List</span>
                </NavLink>
          {/* /admin/tests */}
            <NavLink
                    to="/admin/tests"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={labicon} alt="" />
                    <span>Lab Test List</span>
                </NavLink>
                
                 <NavLink
                    to="/admin/departmentList"
                    className={({ isActive }) =>
                        isActive
                            ? "admin-menu-item active"
                            : "admin-menu-item"
                    }
                >
                    <img src={departmenticon} alt="" />
                    <span>Department List</span>
                </NavLink>
            </nav>

        </aside>
    );
}

export default AdminSidebar;