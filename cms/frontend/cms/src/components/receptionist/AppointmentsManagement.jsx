import { useEffect, useState } from "react";
import "./AppointmentsManagement.css";
import { getPatients } from "../../services/patientService";
import { getAppointments } from "../../services/appointmentService";
import { getDoctors } from "../../services/doctorService";
import AppointmentDetailsPopup from "./AppointmentDetailsPopup";

function AppointmentsManagement() {

    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [showDetails, setShowDetails] = useState(false);


    // Fetch appointments + doctors
    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoading(true);

               const [appointmentData, doctorData, patientData] =
    await Promise.all([
        getAppointments(),
        getDoctors(),
        getPatients()
    ]);

                console.log(
                    "APPOINTMENTS:",
                    appointmentData
                );

                console.log(
                    "DOCTORS:",
                    doctorData
                );

                setAppointments(
                    Array.isArray(appointmentData)
                        ? appointmentData
                        : []
                );

                setDoctors(
                    Array.isArray(doctorData)
                        ? doctorData
                        : []
                );
                setPatients(
    Array.isArray(patientData)
        ? patientData
        : []
);

            } catch (error) {

                console.error(
                    "Error loading appointment management:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);


    // Get doctor name
    const getDoctorName = (doctorId) => {

        const doctor = doctors.find(
            (doctor) =>
                String(doctor.doctor_id) ===
                String(doctorId)
        );

        return doctor?.name || doctorId || "-";
    };

    const getPatientName = (patientId) => {

    const patient = patients.find(
        (patient) =>
            String(patient.patient_id) ===
            String(patientId)
    );

    return patient?.full_name || "-";
};


    // Search + date filtering
    // const filteredAppointments =
    //     appointments.filter((appointment) => {

    //         const search =
    //             searchTerm
    //                 .trim()
    //                 .toLowerCase();


    //         const matchesSearch =
    //             !search ||

    //             String(
    //                 appointment.appointment_id || ""
    //             )
    //                 .toLowerCase()
    //                 .includes(search) ||

    //             String(
    //                 appointment.patient_id || ""
    //             )
    //                 .toLowerCase()
    //                 .includes(search) ||

    //             String(
    //                 appointment.reason || ""
    //             )
    //                 .toLowerCase()
    //                 .includes(search) ||

    //             String(
    //                 appointment.doctor_id || ""
    //             )
    //                 .toLowerCase()
    //                 .includes(search) ||

    //             getDoctorName(
    //                 appointment.doctor_id
    //             )
    //                 .toLowerCase()
    //                 .includes(search);


    //         const matchesDate =
    //             !selectedDate ||
    //             appointment.date === selectedDate;


    //         return (
    //             matchesSearch &&
    //             matchesDate
    //         );

    //     });
    // Search + date filtering
const today = new Date().toISOString().split("T")[0];

// const filteredAppointments =
//     appointments.filter((appointment) => {

//         const search =
//             searchTerm
//                 .trim()
//                 .toLowerCase();

//         const matchesSearch =
//             !search ||

//             String(appointment.appointment_id || "")
//                 .toLowerCase()
//                 .includes(search) ||

//             String(appointment.patient_id || "")
//                 .toLowerCase()
//                 .includes(search) ||

//             String(appointment.reason || "")
//                 .toLowerCase()
//                 .includes(search) ||

//             String(appointment.doctor_id || "")
//                 .toLowerCase()
//                 .includes(search) ||

//             getDoctorName(appointment.doctor_id)
//                 .toLowerCase()
//                 .includes(search);

//         // Show only today and future appointments
//         const matchesFromToday =
//             appointment.date >= today;

//         // If user selects a date, apply that filter too
//         const matchesSelectedDate =
//             !selectedDate ||
//             appointment.date === selectedDate;

//         return (
//             matchesSearch &&
//             matchesFromToday &&
//             matchesSelectedDate
//         );

//     });
       
const filteredAppointments =
    appointments.filter((appointment) => {

        const search =
            searchTerm
                .trim()
                .toLowerCase();

        const patientName =
            getPatientName(
                appointment.patient_id
            ).toLowerCase();

        const patientId =
            String(
                appointment.patient_id || ""
            ).toLowerCase();

        const formattedPatientId =
            `p${String(
                appointment.patient_id || ""
            ).padStart(3, "0")}`;

        const matchesSearch =
            !search ||

            String(
                appointment.appointment_id || ""
            )
                .toLowerCase()
                .includes(search) ||

            patientId.includes(search) ||

            formattedPatientId.includes(search) ||

            patientName.includes(search) ||

            String(
                appointment.reason || ""
            )
                .toLowerCase()
                .includes(search) ||

            String(
                appointment.doctor_id || ""
            )
                .toLowerCase()
                .includes(search) ||

            getDoctorName(
                appointment.doctor_id
            )
                .toLowerCase()
                .includes(search);

        const matchesFromToday =
            appointment.date >= today;

        const matchesSelectedDate =
            !selectedDate ||
            appointment.date === selectedDate;

        return (
            matchesSearch &&
            matchesFromToday &&
            matchesSelectedDate
        );

    });

    // View appointment
    const handleView = (appointment) => {

        setSelectedAppointment(appointment);

        setShowDetails(true);

    };


    // Clear filters
    const handleClearFilters = () => {

        setSearchTerm("");

        setSelectedDate("");

    };


    return (

        <div className="appointments-management">

            {/* Header */}

            <div className="appointments-page-header">

                <div>

                    <h2>
                        Appointments Management
                    </h2>

                    <p>
                        View and manage all patient appointments
                    </p>

                </div>

            </div>


            {/* Controls */}

            <div className="appointments-controls">


                {/* Search */}

                <div className="appointments-search">

                    <span>
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search appointment, patient, doctor..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                </div>


                {/* Date */}

                <div className="appointments-date-filter">

                    <label>
                        Date
                    </label>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) =>
                            setSelectedDate(
                                e.target.value
                            )
                        }
                    />

                </div>


                {/* Clear */}

                {(searchTerm || selectedDate) && (

                    <button
                        className="clear-filter-button"
                        onClick={handleClearFilters}
                    >
                        Clear
                    </button>

                )}

            </div>


            {/* Result count */}

            {!loading && (

                <div className="appointments-result-count">

                    Showing{" "}
                    <strong>
                        {filteredAppointments.length}
                    </strong>{" "}
                    appointment
                    {filteredAppointments.length !== 1
                        ? "s"
                        : ""}

                </div>

            )}


            {/* Table */}

            {loading ? (

                <div className="appointments-loading">
                    Loading appointments...
                </div>

            ) : (

                <div className="appointments-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Appointment ID
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Doctor
                                </th>

                                <th>
                                    Time
                                </th>

                               

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredAppointments.length > 0 ? (

                                filteredAppointments.map(
                                    (appointment) => (

                                        <tr
                                            key={
                                                 appointment.appointment_id
                                            }
                                        >

                                            {/* Appointment ID */}

                                            <td>

                                                <strong>
                                                    {
                                                        appointment.appointment_id
                                                    }
                                                </strong>

                                            </td>


                                            {/* Patient */}

                                            {/* <td>

                                                <div className="patient-cell">

                                                    <div className="patient-avatar">

                                                        {String(
                                                            appointment.patient_id
                                                        )
                                                            .charAt(0)
                                                            .toUpperCase()}

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            Patient
                                                        </strong>

                                                        <span>
                                                            P
                                                            {String(
                                                                appointment.patient_id
                                                            ).padStart(
                                                                3,
                                                                "0"
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td> */}

                                            {/* Patient */}

<td>

    <div className="patient-cell">

        <div className="patient-avatar">

            {getPatientName(
                appointment.patient_id
            )
                .charAt(0)
                .toUpperCase()}

        </div>

        <strong>
            {getPatientName(
                appointment.patient_id
            )}
        </strong>

    </div>

</td>


                                            {/* Doctor */}

                                            <td>

                                                <div className="doctor-cell">

                                                    <strong>
                                                        Dr.{" "}
                                                        {getDoctorName(
                                                            appointment.doctor_id
                                                        )}
                                                    </strong>

                                                    <span>
                                                        {
                                                            appointment.doctor_id
                                                        }
                                                    </span>

                                                </div>

                                            </td>


                                            {/* Time */}

                                            <td>

                                                <span className="appointment-time">

                                                    {appointment.time
                                                        ? appointment.time.slice(
                                                              0,
                                                              5
                                                          )
                                                        : "-"}

                                                </span>

                                            </td>


                                            {/* Token */}
{/* 
                                            <td>

                                                <span className="token-badge">

                                                    {appointment.token_no ??
                                                        "-"}

                                                </span>

                                            </td> */}


                                            {/* Action */}

                                            <td>

                                                <button
                                                    className="view-appointment-button"
                                                    onClick={() =>
                                                        handleView(
                                                            appointment
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="no-appointments"
                                    >

                                        <div>

                                            <span>
                                                📅
                                            </span>

                                            <p>
                                                No appointments found
                                            </p>

                                            <small>
                                                Try changing your
                                                search or date filter.
                                            </small>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* Details Popup */}

            {showDetails &&
                selectedAppointment && (

                    <AppointmentDetailsPopup

                        appointment={
                            selectedAppointment
                        }

                        doctorName={
                            getDoctorName(
                                selectedAppointment.doctor_id
                            )
                        }

                        patientName={
        getPatientName(
            selectedAppointment.patient_id
        )
    }

                        onClose={() => {

                            setShowDetails(false);

                            setSelectedAppointment(
                                null
                            );

                        }}

                    />

                )}

        </div>

    );

}

export default AppointmentsManagement;