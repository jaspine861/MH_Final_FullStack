import { useEffect, useState } from "react";
import "./PatientList.css";
import AddPatient from "./AddPatient";
import { getPatients } from "../../services/patientService";
import PatientDetails from "./PatientDetails";
import AddAppointment from "./AddAppointment";
function PatientList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddPatient, setShowAddPatient] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAppointment, setShowAppointment] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getPatients();

                console.log("API DATA:", data);

                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {

        if (!dateOfBirth) {
            return "-";
        }

        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDifference =
            today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() < birthDate.getDate()
            )
        ) {
            age--;
        }

        return age;
    };

    // const filteredPatients = patients.filter((patient) => {

    //     const search = searchTerm.toLowerCase();

    //     return (
    //         String(patient.patient_id)
    //             .toLowerCase()
    //             .includes(search) ||

    //         String(patient.full_name)
    //             .toLowerCase()
    //             .includes(search) ||

    //         String(patient.phone)
    //             .toLowerCase()
    //             .includes(search)
    //     );
    // });

    const filteredPatients = patients.filter((patient) => {

    const search = searchTerm.trim().toLowerCase();

    const patientId = `P${String(patient.patient_id).padStart(3, "0")}`;
    const patientName = String(patient.full_name || "").toLowerCase();

    return (
        patientId.toLowerCase().includes(search) ||
        String(patient.patient_id)
            .toLowerCase()
            .includes(search) ||
        patientName.includes(search)
    );
});

    const handleViewPatient = (patient) => {
        console.log("View patient:", patient);
    };

    return (
        <div className="patient-section">

            {/* Add Patient + Search */}
            <div className="patient-controls">

                <button
                    className="add-patient-button"
                    onClick={() => setShowAddPatient(true)}
                >
                    <span>+</span>
                    Add Patient
                </button>

                <div className="search-container">

                    <span className="search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Loading */}
            {loading ? (

                <p>Loading patients...</p>

            ) : (

                /* Patient List */
                <div className="patient-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                {/* <th>Last Visit</th> */}
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredPatients.length > 0 ? (

                                filteredPatients.map((patient) => (

                                    <tr key={patient.patient_id}>

                                        <td>
                                            P{String(patient.patient_id).padStart(3, "0")}
                                        </td>

                                        <td>
                                            {patient.full_name}
                                        </td>

                                        <td>
                                            {calculateAge(
                                                patient.date_of_birth
                                            )}
                                        </td>

                                        <td>
                                            {patient.gender}
                                        </td>

                                        <td>
                                            {patient.phone}
                                        </td>

                                        

                                        <td>

                                            <span
                                                className={`status ${
                                                    patient.status
                                                        ?.toLowerCase()
                                                        .replace(" ", "-")
                                                }`}
                                            >
                                                {patient.status}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="action-button"
                                                onClick={() =>
                                                   setSelectedPatient(patient)
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}
                                    >
                                        No patients found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {/* Add Patient Modal */}
            {/* {showAddPatient && (

                // <AddPatient
                //     onClose={() =>
                //         setShowAddPatient(false)
                //     }
                // />
                
                <AddPatient
    onClose={() => setShowAddPatient(false)}
    onPatientAdded={(newPatient) => {
        setPatients((prev) => [...prev, newPatient]);
    }}
/>


            )} */}

            {showAddPatient && (
    <AddPatient
        onClose={() => setShowAddPatient(false)}
        onPatientAdded={(newPatient) => {
            setPatients((prevPatients) => [
                ...prevPatients,
                newPatient
            ]);
        }}
    />
)}
{selectedPatient && (
    <PatientDetails
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
        onAddAppointment={(patient) => {
    setSelectedPatient(patient);
    setShowAppointment(true);
}}
        onEdit={(patient) => {
            console.log("Edit patient:", patient);
        }}
        onDelete={(patient) => {
            console.log("Delete patient:", patient);
        }}
    />
)}
{showAppointment && (
    <AddAppointment
        patient={selectedPatient}
        onClose={() => setShowAppointment(false)}
        onAppointmentBooked={(appointment) => {
            console.log("Appointment booked:", appointment);

            setShowAppointment(false);
        }}
    />
)}
        </div>
    );
}

export default PatientList;