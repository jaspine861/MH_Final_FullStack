// import ReceptionistWelcomeCard from "../../components/receptionist/ReceptionistWelcomeCard";
// // import PatientTable from "../../components/receptionist/PatientTable";
// import StatCard from "../../components/doctor/StatCard";

// import hospitalLogo from "../../assets/hospital-bed-icon.png";
// import doctor_icon from "../../assets/doctor_icon.png";
// import patient_icon from "../../assets/patient_icon.png";

// import "./ReceptionistDashboard.css";

// function ReceptionistDashboard() {
//     return (
//         <div>

//             <div className="dashboard-top">

//                 <ReceptionistWelcomeCard />

//                 <div className="stats-container">

//                     <StatCard
//                         image={hospitalLogo}
//                         title="Total Patients"
//                         value="2,301"
//                     />

//                     <StatCard
//                         image={doctor_icon}
//                         title="Appointments"
//                         value="156"
//                     />

//                     <StatCard
//                         image={patient_icon}
//                         title="Consultations"
//                         value="89"
//                     />

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ReceptionistDashboard;

import { useEffect, useState } from "react";

import ReceptionistWelcomeCard from "../../components/receptionist/ReceptionistWelcomeCard";
import StatCard from "../../components/doctor/StatCard";

import hospitalLogo from "../../assets/hospital-bed-icon.png";
import doctor_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import { getPatients } from "../../services/patientService";
import { getAppointments } from "../../services/appointmentService";

import "./ReceptionistDashboard.css";


function ReceptionistDashboard() {

    const [totalPatients, setTotalPatients] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [totalConsultations, setTotalConsultations] = useState(0);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                setLoading(true);


                // Fetch patients and appointments
                const [
                    patientData,
                    appointmentData
                ] = await Promise.all([
                    getPatients(),
                    getAppointments()
                ]);


                console.log(
                    "PATIENTS:",
                    patientData
                );

                console.log(
                    "APPOINTMENTS:",
                    appointmentData
                );


                // Total Patients
                setTotalPatients(
                    Array.isArray(patientData)
                        ? patientData.length
                        : 0
                );


                // Total Appointments
                setTotalAppointments(
                    Array.isArray(appointmentData)
                        ? appointmentData.length
                        : 0
                );


                // Total Consultations
                const consultations =
                    Array.isArray(appointmentData)
                        ? appointmentData.filter(
                              (appointment) =>
                                  appointment.status ===
                                  "Consulted"
                          ).length
                        : 0;


                setTotalConsultations(
                    consultations
                );


            } catch (error) {

                console.error(
                    "Error loading receptionist dashboard:",
                    error
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

                <ReceptionistWelcomeCard />


                <div className="stats-container">


                    <StatCard
                        image={hospitalLogo}
                        title="Total Patients"
                        value={
                            loading
                                ? "..."
                                : totalPatients
                        }
                    />


                    <StatCard
                        image={doctor_icon}
                        title="Appointments"
                        value={
                            loading
                                ? "..."
                                : totalAppointments
                        }
                    />


                    <StatCard
                        image={patient_icon}
                        title="Consultations"
                        value={
                            loading
                                ? "..."
                                : totalConsultations
                        }
                    />


                </div>

            </div>

        </div>

    );

}


export default ReceptionistDashboard;