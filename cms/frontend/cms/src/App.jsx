// import { Routes, Route } from "react-router-dom";
// import DoctorLayout from "./components/layout/DoctorLayout";

// function Dashboard() {
//     return <h1>Dashboard</h1>;
// }

// function Patients() {
//     return <h1>Patients</h1>;
// }

// function App() {
//     return (
//         <Routes>
//             <Route element={<DoctorLayout />}>

//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/patients" element={<Patients />} />

//             </Route>
//         </Routes>
//     );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import LabTechLayout from "./components/layout/LabTechLayout";
import Login from "./pages/Login";
import PatientTable from "./components/doctor/PatientTable";
import DoctorLayout from "./components/layout/DoctorLayout";
import ReceptionistLayout from "./components/layout/ReceptionistLayout";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import ReceptionistDashboard from "./pages/Receptionist/ReceptionistDashboard";
import ReceptionistPatientList from "./pages/Receptionist/ReceptionistPatientList";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./components/layout/AdminLayout";
import AdminStaffList from "./pages/Admin/AdminStaffList";
import AdminDoctorList from "./pages/Admin/AdminDoctorList";
import LabTechDashboard from "./pages/LabTech/LabTechDashboard";
import PharmacistLayout from "./components/layout/PharmacistLayout";
import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
import TestManagement from "./pages/LabTech/TestManagement";
import PatientReport from "./pages/LabTech/PatientReport";
import AvailableTests from "./pages/LabTech/AvailableTests";
import Prescriptions from "./pages/Pharmacist/Prescriptions";
import Inventory from "./pages/Pharmacist/Inventory";
import Billing from "./pages/Pharmacist/Billing";
import ReceptionistAppointment from "./pages/Receptionist/ReceptionistAppointment";
import ReceptionistBilling from "./pages/Receptionist/ReceptionistBilling";
import AdminMedicineList from "./pages/Admin/AdminMedicineList";
import AdminTestList from "./pages/Admin/AdminTestList";
import AdminDepartmentList from "./pages/Admin/AdminDepartmentList";
import SalesReport from "./pages/Pharmacist/SalesReport";
function Dashboard() {
    return <h1>Doctor Dashboard</h1>;
}

function Patients() {
    return <>    <h1>Patients</h1> <PatientTable /></>;
}


function App() {
    return (
        <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />

            {/* Doctor */}
            <Route element={<DoctorLayout />}>

                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/patients" element={<Patients />} />

            </Route>

            {/* Receptionist */}
            <Route element={<ReceptionistLayout />}>

                <Route
                    path="/receptionist/dashboard"
                    element={<ReceptionistDashboard />}
                />
                
                    <Route
                    path="/patientList"
                    element={<ReceptionistPatientList />}
                />
                    <Route
        path="/receptionist/appointments"
        element={<ReceptionistAppointment />}
    />
      <Route
        path="/receptionist/billing"
        element={<ReceptionistBilling />}
    />

            </Route>
          <Route element={<AdminLayout />}>

    <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
    />

        <Route
        path="/admin/doctors"
        element={<AdminDoctorList />}
    />

    <Route
        path="/admin/staff"
        element={<AdminStaffList />}
    />
          
            <Route
        path="/admin/departmentList"
        element={<AdminDepartmentList />}
    />
       <Route
        path="/admin/medicines"
        element={<AdminMedicineList />}
    />
                
                <Route path="/admin/tests" element={<AdminTestList />} />
</Route>
<Route element={<LabTechLayout />}>

    <Route
        path="/lab-tech/dashboard"
        element={<LabTechDashboard />}
    />

      <Route
        path="/lab-tech/test-management"
        element={<TestManagement />}
    />

    <Route
        path="/lab-tech/patient-report"
        element={<PatientReport />}
    />
      <Route
        path="/lab-tech/available-tests"
        element={<AvailableTests />}
    />

</Route>
<Route element={<PharmacistLayout />}>

    <Route
        path="/pharmacist/dashboard"
        element={<PharmacistDashboard />}
    />

       <Route
        path="/pharmacist/prescriptions"
        element={<Prescriptions />}
    />

       <Route
        path="/pharmacist/inventory"
        element={<Inventory />}
    />
  
   <Route
        path="/pharmacist/SalesReport"
        element={<SalesReport />}
    />
     <Route
        path="/pharmacist/billing"
        element={<Billing />}
    />

</Route>

        </Routes>
    );
}

export default App;