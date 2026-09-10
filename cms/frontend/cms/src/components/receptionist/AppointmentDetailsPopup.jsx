import React from "react";
import "./AppointmentDetailsPopup.css";

function AppointmentDetailsPopup({
    appointment,
    doctorName,
    patientName,
    onClose
}) {

    if (!appointment) {
        return null;
    }


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const d = new Date(date);

        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    };


    const formatTime = (time) => {

        if (!time) {
            return "-";
        }

        const [hours, minutes] =
            time.split(":");

        const date = new Date();

        date.setHours(
            Number(hours)
        );

        date.setMinutes(
            Number(minutes)
        );

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    return (

        <div className="appointment-details-overlay">

            <div className="appointment-details-popup">


                {/* Header */}

                <div className="appointment-details-header">

                    <div>

                        <h2>
                            Appointment Details
                        </h2>

                        <p>
                            {
                                appointment.appointment_id
                            }
                        </p>

                    </div>


                    <button
                        className="appointment-details-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Appointment Information */}

                <div className="appointment-details-section">

                    <h3>
                        Appointment Information
                    </h3>


                    <div className="appointment-details-grid">

                        <div>

                            <label>
                                Appointment ID
                            </label>

                            <strong>
                                {
                                    appointment.appointment_id
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Token Number
                            </label>

                            <strong>
                                {
                                    appointment.token_no ??
                                    "-"
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Appointment Date
                            </label>

                            <strong>
                                {
                                    formatDate(
                                        appointment.date
                                    )
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Time
                            </label>

                            <strong>
                                {
                                    formatTime(
                                        appointment.time
                                    )
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Status
                            </label>

                            <span
                                className={`appointment-detail-status ${
                                    appointment.status
                                        ?.toLowerCase()
                                        .replace(
                                            " ",
                                            "-"
                                        )
                                }`}
                            >
                                {
                                    appointment.status ||
                                    "-"
                                }
                            </span>

                        </div>


                        <div>

                            <label>
                                Created At
                            </label>

                            <strong>
                                {
                                    formatDate(
                                        appointment.created_at
                                    )
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Patient Information */}

                <div className="appointment-details-section">

                    <h3>
                        Patient Information
                    </h3>


                    <div className="appointment-details-grid">

                        <div>

                            <label>
                                Patient ID
                            </label>

                            <strong>
                                P
                                {String(
                                    appointment.patient_id
                                ).padStart(
                                    3,
                                    "0"
                                )}
                            </strong>

                        </div>


                        <div>

                            <label>
                                Patient Name
                            </label>

                            <strong>
    {patientName || "-"}
</strong>

                        </div>

                    </div>

                </div>


                {/* Doctor Information */}

                <div className="appointment-details-section">

                    <h3>
                        Doctor Information
                    </h3>


                    <div className="appointment-details-grid">

                        <div>

                            <label>
                                Doctor ID
                            </label>

                            <strong>
                                {
                                    appointment.doctor_id
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Doctor
                            </label>

                            <strong>
                                Dr. {doctorName}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Reason */}

                <div className="appointment-details-section">

                    <h3>
                        Reason for Visit
                    </h3>

                    <div className="appointment-reason">

                        {
                            appointment.reason ||
                            "No reason provided."
                        }

                    </div>

                </div>


                {/* Footer */}

                <div className="appointment-details-footer">

                    <button
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AppointmentDetailsPopup;