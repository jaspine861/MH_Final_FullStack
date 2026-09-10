import "./PatientDetails.css";
import EditPatientPopup from "./EditPatientPopup";
import { useState } from "react";

function PatientDetails({
    patient,
    onClose,
    onEdit,
    onDelete,
    onAddAppointment
}) {

    const [showEditPopup, setShowEditPopup] = useState(false);

    if (!patient) return null;

    const handleEditClick = () => {
        setShowEditPopup(true);
    };

    const handleUpdated = (updatedPatient) => {

        if (onEdit) {
            onEdit(updatedPatient);
        }

        setShowEditPopup(false);
    };

    return (
        <>
            {/* Patient Details Popup */}

            {!showEditPopup && (
                <div className="patient-details-overlay">

                    <div className="patient-details-card">

                        {/* Header */}

                        <div className="patient-details-header">

                            <div>
                                <h2>Patient Details</h2>

                                <p>
                                    Patient ID: P
                                    {String(patient.patient_id).padStart(3, "0")}
                                </p>
                            </div>

                            <button
                                className="close-button"
                                onClick={onClose}
                            >
                                ×
                            </button>

                        </div>


                        {/* Patient Information */}

                        <div className="patient-details-body">

                            <div className="detail-section">

                                <h3>Personal Information</h3>

                                <div className="details-grid">

                                    <div className="detail-item">
                                        <span>Full Name</span>
                                        <strong>
                                            {patient.full_name}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Date of Birth</span>
                                        <strong>
                                            {patient.date_of_birth}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Gender</span>
                                        <strong>
                                            {patient.gender}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Blood Group</span>
                                        <strong>
                                            {patient.blood_group || "Not provided"}
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            <div className="detail-section">

                                <h3>Contact Information</h3>

                                <div className="details-grid">

                                    <div className="detail-item">
                                        <span>Phone</span>
                                        <strong>
                                            {patient.phone}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Email</span>
                                        <strong>
                                            {patient.email || "Not provided"}
                                        </strong>
                                    </div>

                                    <div className="detail-item full-width">
                                        <span>Address</span>
                                        <strong>
                                            {patient.address || "Not provided"}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>Emergency Contact</span>
                                        <strong>
                                            {patient.emergency_contact || "Not provided"}
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            <div className="detail-section">

                                <h3>Medical Information</h3>

                                <div className="details-grid">

                                    <div className="detail-item">
                                        <span>Allergies</span>

                                        <strong>
                                            {patient.allergies || "None"}
                                        </strong>
                                    </div>

                                    <div className="detail-item">

                                        <span>Status</span>

                                        <span
                                            className={`patient-status ${
                                                patient.status
                                                    ?.toLowerCase()
                                                    .replace(" ", "-")
                                            }`}
                                        >
                                            {patient.status}
                                        </span>

                                    </div>

                                    <div className="detail-item">

                                        <span>Registered Date</span>

                                        <strong>
                                            {new Date(
                                                patient.registered_date
                                            ).toLocaleDateString()}
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="patient-details-actions">

                            <button
                                className="appointment-button"
                                onClick={() =>
                                    onAddAppointment(patient)
                                }
                            >
                                + Add Appointment
                            </button>


                            <button
                                className="edit-button"
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>


                            {/* <button
                                className="delete-button"
                                onClick={() =>
                                    onDelete(patient)
                                }
                            >
                                Delete
                            </button> */}


                            <button
                                className="close-action-button"
                                onClick={onClose}
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* Edit Patient Popup */}

            {showEditPopup && (
                <EditPatientPopup
                    patient={patient}
                    onClose={() => setShowEditPopup(false)}
                    onUpdated={handleUpdated}
                />
            )}

        </>
    );
}

export default PatientDetails;