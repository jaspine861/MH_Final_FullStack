// import AdminWelcomeCard from "../../components/admin/AdminWelcomeCard";
// import StatCard from "../../components/doctor/StatCard";

// import hospitalLogo from "../../assets/hospital-bed-icon.png";
// import doctor_icon from "../../assets/doctor_icon.png";
// import patient_icon from "../../assets/patient_icon.png";

// import "./AdminDashboard.css";

// function AdminDashboard() {
//     return (
//         <div>

//             <div className="admin-dashboard-top">

//                 <AdminWelcomeCard />

//                 <div className="admin-stats-container">

//                     <StatCard
//                         image={patient_icon}
//                         title="Total Patients"
//                         value="2,301"
//                     />

//                     <StatCard
//                         image={doctor_icon}
//                         title="Total Doctors"
//                         value="45"
//                     />

//                     <StatCard
//                         image={hospitalLogo}
//                         title="Total Staff"
//                         value="120"
//                     />

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default AdminDashboard;
import { useEffect, useState } from "react"; import AdminWelcomeCard from "../../components/admin/AdminWelcomeCard"; import StatCard from "../../components/doctor/StatCard"; import hospitalLogo from "../../assets/hospital-bed-icon.png"; import doctor_icon from "../../assets/doctor_icon.png"; import patient_icon from "../../assets/patient_icon.png"; import { getPatients } from "../../services/patientService"; import { getDoctors } from "../../services/doctorService"; import { getStaff } from "../../services/staffService"; import "./AdminDashboard.css"; function AdminDashboard() { const [patientCount, setPatientCount] = useState(0); const [doctorCount, setDoctorCount] = useState(0); const [staffCount, setStaffCount] = useState(0); const [loading, setLoading] = useState(true); useEffect(() => { const fetchDashboardData = async () => { try { const [ patients, doctors, staff ] = await Promise.all([ getPatients(), getDoctors(), getStaff() ]); console.log("PATIENTS:", patients); console.log("DOCTORS:", doctors); console.log("STAFF:", staff); setPatientCount( Array.isArray(patients) ? patients.length : 0 ); setDoctorCount( Array.isArray(doctors) ? doctors.length : 0 ); setStaffCount( Array.isArray(staff) ? staff.length : 0 ); } catch (error) { console.error( "Error loading dashboard data:", error.response?.data || error ); } finally { setLoading(false); } }; fetchDashboardData(); }, []); return ( <div> <div className="admin-dashboard-top"> <AdminWelcomeCard /> <div className="admin-stats-container"> <StatCard image={patient_icon} title="Total Patients" value={ loading ? "..." : patientCount } /> <StatCard image={doctor_icon} title="Total Doctors" value={ loading ? "..." : doctorCount } /> <StatCard image={hospitalLogo} title="Total Staff" value={ loading ? "..." : staffCount } /> </div> </div> </div> ); } export default AdminDashboard;
