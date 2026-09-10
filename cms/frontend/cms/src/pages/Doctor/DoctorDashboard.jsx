// import WelcomeCard from "../../components/doctor/WelcomeCard";
// import PatientTable from "../../components/doctor/PatientTable";
// import StatCard from "../../components/doctor/StatCard";
// import hospitalLogo from "../../assets/hospital-bed-icon.png";
// import doctor_icon from "../../assets/doctor_icon.png"
// import patient_icon from "../../assets/patient_icon.png"
// import "./DoctorDashboard.css";

// function DoctorDashboard() {
//     return (
//         <div>
//         <div className="dashboard-top">

//             <WelcomeCard />

//             <div className="stats-container">

//                 <StatCard
//                     image={hospitalLogo}
//                     title="Total Patients"
//                     value="2,301"
//                 />

//                 <StatCard
//                     image={doctor_icon}
//                     title="Pending Appointments"
//                     value="156"
//                 />

//                 <StatCard
//                     image={patient_icon}
//                     title=" Completed Consultations "
//                     value="89"
//                 />

//             </div>

//         </div>

      
//         </div>
//     );
// }

// export default DoctorDashboard;
import { useEffect, useState } from "react";

import WelcomeCard from "../../components/doctor/WelcomeCard";
import PatientTable from "../../components/doctor/PatientTable";
import StatCard from "../../components/doctor/StatCard";

import hospitalLogo from "../../assets/hospital-bed-icon.png";
import doctor_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import { getPatients } from "../../services/patientService";
import { getAppointments } from "../../services/appointmentService";

import "./DoctorDashboard.css";


function DoctorDashboard() {

    const [patientCount, setPatientCount] = useState(0);
    const [pendingAppointments, setPendingAppointments] = useState(0);
    const [completedConsultations, setCompletedConsultations] = useState(0);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const doctorId =
                    localStorage.getItem("doctorId");

                if (!doctorId) {

                    console.error(
                        "Doctor ID not found in localStorage"
                    );

                    return;
                }


                const [
                    patients,
                    appointments
                ] = await Promise.all([
                    getPatients(),
                    getAppointments()
                ]);


                console.log(
                    "PATIENTS:",
                    patients
                );

                console.log(
                    "APPOINTMENTS:",
                    appointments
                );


                // -------------------------
                // Total Patients
                // -------------------------

                setPatientCount(
                    Array.isArray(patients)
                        ? patients.length
                        : 0
                );


                // -------------------------
                // Only logged-in doctor's appointments
                // -------------------------

                const doctorAppointments =
                    Array.isArray(appointments)
                        ? appointments.filter(
                            (appointment) =>
                                String(
                                    appointment.doctor_id
                                ) === String(doctorId)
                        )
                        : [];


                console.log(
                    "DOCTOR APPOINTMENTS:",
                    doctorAppointments
                );


                // -------------------------
                // Pending Appointments
                // -------------------------

                const pending =
                    doctorAppointments.filter(
                        (appointment) =>
                            appointment.status === "Booked"
                    );


                setPendingAppointments(
                    pending.length
                );


                // -------------------------
                // Completed Consultations
                // -------------------------

                const completed =
                    doctorAppointments.filter(
                        (appointment) =>
                            appointment.status === "Consulted"
                    );


                setCompletedConsultations(
                    completed.length
                );


            } catch (error) {

                console.error(
                    "Error loading doctor dashboard:",
                    error.response?.data || error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchDashboardData();

    }, []);


    return (

        <div>

            <div className="dashboard-top">

                <WelcomeCard />


                <div className="stats-container">


                    {/* Total Patients */}

                    <StatCard
                        image={hospitalLogo}
                        title="Total Patients"
                        value={
                            loading
                                ? "..."
                                : patientCount
                        }
                    />


                    {/* Pending Appointments */}

                    <StatCard
                        image={doctor_icon}
                        title="Pending Appointments"
                        value={
                            loading
                                ? "..."
                                : pendingAppointments
                        }
                    />


                    {/* Completed Consultations */}

                    <StatCard
                        image={patient_icon}
                        title="Completed Consultations"
                        value={
                            loading
                                ? "..."
                                : completedConsultations
                        }
                    />

                </div>

            </div>


            {/* Patient Table */}

            {/* <PatientTable /> */}

        </div>

    );

}


export default DoctorDashboard;