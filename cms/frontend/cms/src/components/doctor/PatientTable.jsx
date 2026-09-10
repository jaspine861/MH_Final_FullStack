
import { useEffect, useState } from "react";
import "./PatientTable.css";
import { getAppointments } from "../../services/appointmentService";
import ConsultationPopup from "./ConsultationPopup";
import { getConsultationByAppointment } from "../../services/consultationService";
import { getPatients } from "../../services/patientService";
function PatientTable() {

    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConsultation, setShowConsultation] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
const [loadingConsultation, setLoadingConsultation] = useState(false);
const [patients, setPatients] = useState([]);

    // useEffect(() => {

    //     const fetchAppointments = async () => {

    //         try {

    //             const doctorId = localStorage.getItem("doctorId");

    //             console.log("Logged Doctor ID:", doctorId);

    //             if (!doctorId) {
    //                 console.error("Doctor ID not found in localStorage");
    //                 return;
    //             }

    //             const data = await getAppointments();

    //             console.log("ALL APPOINTMENTS:", data);

    //             // Only appointments for logged-in doctor
    //             const doctorAppointments = data.filter(
    //                 (appointment) =>
    //                     String(appointment.doctor_id) === String(doctorId)
    //             );

    //             console.log(
    //                 "DOCTOR APPOINTMENTS:",
    //                 doctorAppointments
    //             );

    //             setAppointments(doctorAppointments);

    //         } catch (error) {

    //             console.error(
    //                 "Error fetching appointments:",
    //                 error
    //             );

    //         } finally {

    //             setLoading(false);

    //         }
    //     };

    //     fetchAppointments();

    // }, []);

    useEffect(() => {

    const fetchAppointments = async () => {

        try {

            const doctorId =
                localStorage.getItem("doctorId");

            console.log(
                "Logged Doctor ID:",
                doctorId
            );

            if (!doctorId) {

                console.error(
                    "Doctor ID not found in localStorage"
                );

                return;
            }


            const [appointmentData, patientData] = await Promise.all([
    getAppointments(),
    getPatients()
]);

           console.log(
    "ALL APPOINTMENTS:",
    appointmentData
);

console.log(
    "ALL PATIENTS:",
    patientData
);


            // Get today's date: YYYY-MM-DD
            const today = new Date();

            const todayDate =
                `${today.getFullYear()}-${String(
                    today.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    today.getDate()
                ).padStart(2, "0")}`;


            console.log(
                "TODAY:",
                todayDate
            );


            // Only today's appointments
            // belonging to the logged-in doctor
            const doctorAppointments =
                appointmentData.filter(
                    (appointment) =>
                        String(
                            appointment.doctor_id
                        ) === String(doctorId) &&

                        appointment.date === todayDate
                );


            console.log(
                "TODAY'S DOCTOR APPOINTMENTS:",
                doctorAppointments
            );


            setAppointments(
                doctorAppointments
            );

            setPatients(
    Array.isArray(patientData)
        ? patientData
        : []
);


        } catch (error) {

            console.error(
                "Error fetching appointments:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    fetchAppointments();

}, []);

const getPatientName = (patientId) => {

    const patient = patients.find(
        (patient) =>
            String(patient.patient_id) ===
            String(patientId)
    );

    return patient?.full_name || "-";
};


    const filteredAppointments = appointments.filter(
        (appointment) => {

            const matchesStatus =
                selectedFilter === "All" ||
                appointment.status === selectedFilter;

            const search =
                searchTerm.toLowerCase();

            const matchesSearch =
    String(appointment.patient_id)
        .toLowerCase()
        .includes(search) ||

    getPatientName(appointment.patient_id)
        .toLowerCase()
        .includes(search) ||

    String(appointment.reason)
        .toLowerCase()
        .includes(search);

            return matchesStatus && matchesSearch;
        }
    );
   const handleAppointmentAction = async (appointment) => {

    // START NEW CONSULTATION
    if (appointment.status === "Booked") {

        setSelectedAppointment(appointment);
        setSelectedConsultation(null);
        setShowConsultation(true);

        return;
    }


    // VIEW EXISTING CONSULTATION
    if (appointment.status === "Consulted") {

        try {

            setLoadingConsultation(true);

            const data =
                await getConsultationByAppointment(
                    appointment.appointment_id
                );

            console.log(
                "CONSULTATION FOR APPOINTMENT:",
                data
            );


            // API returns an array
            if (Array.isArray(data) && data.length > 0) {

                setSelectedAppointment(appointment);

                setSelectedConsultation(data[0]);

                setShowConsultation(true);

            } else {

                alert(
                    "No consultation found for this appointment."
                );

            }

        } catch (error) {

            console.error(
                "Error fetching consultation:",
                error.response?.data || error
            );

            alert(
                "Failed to load consultation details."
            );

        } finally {

            setLoadingConsultation(false);

        }

    }

};

    return (
        <div className="patient-section">

            {/* Filter + Search */}
            <div className="patient-controls">

                <div className="filter-container">

                    <button
                        className={`filter-button ${
                            showFilter
                                ? "filter-active"
                                : ""
                        }`}
                        onClick={() =>
                            setShowFilter(!showFilter)
                        }
                    >
                        <span>⚱</span>
                        Filter
                    </button>

                    {showFilter && (

                        <div className="filter-options">

                            {[
                                "All",
                                "Booked",
                                "Consulted",
                                "Cancelled"
                            ].map((option) => (

                                <button
                                    key={option}
                                    className={
                                        selectedFilter === option
                                            ? "filter-option selected"
                                            : "filter-option"
                                    }
                                    onClick={() => {

                                        setSelectedFilter(option);
                                        setShowFilter(false);

                                    }}
                                >
                                    {option}
                                </button>

                            ))}

                        </div>

                    )}

                </div>


                {/* Search */}
                <div className="search-container">

                    <span className="search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search patient..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* Loading */}
            {loading ? (

                <p>Loading appointments...</p>

            ) : (

                <div className="patient-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Appointment ID</th>
                                <th>Patient Name</th>
                                <th>Token</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>


                        <tbody>

                            {filteredAppointments.length > 0 ? (

                                filteredAppointments.map(
                                    (appointment, index) => (

                                        <tr
                                            key={
                                                appointment.appointment_id
                                            }
                                        >

                                            <td>
                                                {
                                                    appointment.appointment_id
                                                }
                                            </td>

                                            <td>
                                              {getPatientName(
        appointment.patient_id
    )}
                                            </td>

                                            <td>
                                                
                                                    {index + 1}
                                                
                                            </td>

                                            <td>
                                                {
                                                    appointment.date
                                                }
                                            </td>

                                            <td>
                                                {
                                                    appointment.time
                                                }
                                            </td>

                                            <td>
                                                {
                                                    appointment.reason
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={`status ${
                                                        appointment.status
                                                            ?.toLowerCase()
                                                            .replace(
                                                                " ",
                                                                "-"
                                                            )
                                                    }`}
                                                >
                                                    {
                                                        appointment.status
                                                    }
                                                </span>

                                            </td>

                                            <td>

                                           <button
    className="action-button"
    onClick={() =>
        handleAppointmentAction(appointment)
    }
    disabled={
        loadingConsultation &&
        selectedAppointment?.appointment_id ===
        appointment.appointment_id
    }
>
    {
        loadingConsultation &&
        selectedAppointment?.appointment_id ===
        appointment.appointment_id
            ? "Loading..."
            : appointment.status === "Booked"
                ? "Start"
                : "View"
    }
</button>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}
                                    >
                                        No appointments found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
{showConsultation && selectedAppointment && (

    <ConsultationPopup

        appointment={selectedAppointment}

        consultation={selectedConsultation}

        mode={
            selectedConsultation
                ? "view"
                : "create"
        }

        onClose={() => {

            setShowConsultation(false);

            setSelectedAppointment(null);

            setSelectedConsultation(null);

        }}

        onConsultationCompleted={(data) => {

            console.log(
                "Consultation completed:",
                data
            );


            setAppointments(
                (prevAppointments) =>
                    prevAppointments.map(
                        (appointment) =>
                            appointment.appointment_id ===
                            selectedAppointment.appointment_id
                                ? {
                                    ...appointment,
                                    status: "Consulted"
                                }
                                : appointment
                    )
            );


            setShowConsultation(false);

            setSelectedAppointment(null);

            setSelectedConsultation(null);

        }}

    />

)}
        </div>
    );
}

export default PatientTable;