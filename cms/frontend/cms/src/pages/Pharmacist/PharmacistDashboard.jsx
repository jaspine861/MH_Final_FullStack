// import StatCard from "../../components/doctor/StatCard";
// import PharmacistWelcomeCard from "../../components/pharmacist/PharmacistWelcomeCard";
// import hospitalLogo from "../../assets/hospital-bed-icon.png";
// import medicine_icon from "../../assets/doctor_icon.png";
// import patient_icon from "../../assets/patient_icon.png";

// import "./PharmacistDashboard.css";

// function PharmacistDashboard() {
//     return (
//         <div>

//             <div className="pharmacist-dashboard-top">

//                 <PharmacistWelcomeCard />

//                 <div className="pharmacist-stats-container">

//                     <StatCard
//                         image={hospitalLogo}
//                         title="Total Patients"
//                         value="2,301"
//                     />

//                     <StatCard
//                         image={medicine_icon}
//                         title="Prescriptions"
//                         value="156"
//                     />

//                     <StatCard
//                         image={patient_icon}
//                         title="Pending Orders"
//                         value="89"
//                     />

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default PharmacistDashboard;

import { useEffect, useState } from "react";

import StatCard from "../../components/doctor/StatCard";
import PharmacistWelcomeCard from "../../components/pharmacist/PharmacistWelcomeCard";

import hospitalLogo from "../../assets/hospital-bed-icon.png";
import medicine_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import { getPatients } from "../../services/patientService";
import { getPrescribedMedicines } from "../../services/prescribedMedicineService";

import "./PharmacistDashboard.css";


function PharmacistDashboard() {

    const [totalPatients, setTotalPatients] = useState(0);
    const [totalPrescriptions, setTotalPrescriptions] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                setLoading(true);

                const [
                    patientData,
                    prescriptionData
                ] = await Promise.all([
                    getPatients(),
                    getPrescribedMedicines()
                ]);


                console.log("PATIENTS:", patientData);
                console.log("PRESCRIPTIONS:", prescriptionData);


                // Total Patients
                setTotalPatients(
                    Array.isArray(patientData)
                        ? patientData.length
                        : 0
                );


                // Total Prescriptions
                setTotalPrescriptions(
                    Array.isArray(prescriptionData)
                        ? prescriptionData.length
                        : 0
                );


                // Pending Orders
                if (Array.isArray(prescriptionData)) {

                    const pending = prescriptionData.filter(
                        (prescription) =>
                            prescription.status?.toLowerCase() ===
                            "pending"
                    );

                    setPendingOrders(pending.length);

                }


            } catch (error) {

                console.error(
                    "Error loading pharmacist dashboard:",
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

            <div className="pharmacist-dashboard-top">

                <PharmacistWelcomeCard />


                <div className="pharmacist-stats-container">


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
                        image={medicine_icon}
                        title="Prescriptions"
                        value={
                            loading
                                ? "..."
                                : totalPrescriptions
                        }
                    />


                    <StatCard
                        image={patient_icon}
                        title="Pending Orders"
                        value={
                            loading
                                ? "..."
                                : pendingOrders
                        }
                    />


                </div>

            </div>

        </div>

    );

}


export default PharmacistDashboard;