// import WelcomeCard from "../../components/labTech/LabTechWelcomeCard";
// import StatCard from "../../components/doctor/StatCard";

// import hospitalLogo from "../../assets/hospital-bed-icon.png";
// import doctor_icon from "../../assets/doctor_icon.png";
// import patient_icon from "../../assets/patient_icon.png";

// import "./LabTechDashboard.css";

// function LabTechDashboard() {
//     return (
//         <div>

//             <div className="lab-tech-dashboard-top">

//                 <WelcomeCard />

//                 <div className="lab-tech-stats-container">

//                     <StatCard
//                         image={hospitalLogo}
//                         title="Total Patients"
//                         value="2,301"
//                     />

//                     <StatCard
//                         image={doctor_icon}
//                         title="Lab Tests"
//                         value="156"
//                     />

//                     <StatCard
//                         image={patient_icon}
//                         title="Pending Tests"
//                         value="89"
//                     />

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default LabTechDashboard;
import { useEffect, useState } from "react";

import WelcomeCard from "../../components/labTech/LabTechWelcomeCard";
import StatCard from "../../components/doctor/StatCard";

import hospitalLogo from "../../assets/hospital-bed-icon.png";
import doctor_icon from "../../assets/doctor_icon.png";
import patient_icon from "../../assets/patient_icon.png";

import { getPrescribedTests } from "../../services/prescribedTestService";

import "./LabTechDashboard.css";

function LabTechDashboard() {

    const [labTestsCount, setLabTestsCount] = useState(0);
    const [pendingTestsCount, setPendingTestsCount] = useState(0);
    const [totalPatients, setTotalPatients] = useState(0);

    const loadDashboardData = async () => {
        try {

            const data = await getPrescribedTests();

            console.log("Dashboard lab tests:", data);

            // Total lab tests
            setLabTestsCount(data.length);

            // Pending lab tests
            const pending = data.filter(
                (test) => test.status?.toLowerCase() === "pending"
            );

            setPendingTestsCount(pending.length);

            // Unique patients
            const patientIds = [
                ...new Set(
                    data
                        .map((test) => test.patient_id)
                        .filter((id) => id !== null && id !== undefined)
                )
            ];

            setTotalPatients(patientIds.length);

        } catch (error) {

            console.error(
                "Error loading dashboard data:",
                error.response?.data || error
            );

        }
    };

    useEffect(() => {

        // Load immediately
        loadDashboardData();

        // Refresh every 5 seconds
        const interval = setInterval(() => {
            loadDashboardData();
        }, 5000);

        // Stop refreshing when leaving dashboard
        return () => clearInterval(interval);

    }, []);


    return (
        <div>

            <div className="lab-tech-dashboard-top">

                <WelcomeCard />

                <div className="lab-tech-stats-container">

                    <StatCard
                        image={doctor_icon}
                        title="Lab Tests"
                        value={labTestsCount}
                    />

                    <StatCard
                        image={patient_icon}
                        title="Pending Tests"
                        value={pendingTestsCount}
                    />

                </div>

            </div>

        </div>
    );
}

export default LabTechDashboard;