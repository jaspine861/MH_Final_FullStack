import React from "react";
import "./AppointmentBillPopup.css";

function AppointmentBillPopup({ bill, onClose }) {

    if (!bill) {
        return null;
    }

    const formatDate = (date) => {

        if (!date) return "-";

        const d = new Date(date);

        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };


    const formatTime = (time) => {

        if (!time) return "-";

        const [hours, minutes] = time.split(":");

        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };


    const handlePrint = () => {
        window.print();
    };


    return (

        <div className="appointment-bill-overlay">

            <div className="appointment-bill-popup">

                {/* Header */}

                <div className="appointment-bill-header">

                    <div className="hospital-info">

                        <h1>
                           Kims
                        </h1>

                        <p>
                            Hospital & Healthcare Centre
                        </p>

                        <span>
                            Appointment Payment Receipt
                        </span>

                    </div>


                    <button
                        className="appointment-bill-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Bill Information */}

                <div className="appointment-bill-meta">

                    <div>

                        <span>Bill Number</span>

                        <strong>
                            APPT-BILL
                            {String(
                                bill.id || ""
                            ).padStart(3, "0")}
                        </strong>

                    </div>


                    <div>

                        <span>Bill Date</span>

                        <strong>
                            {formatDate(
                                bill.bill_date
                            )}
                        </strong>

                    </div>

                </div>


                {/* Patient + Doctor */}

                <div className="appointment-bill-section">

                    <h3>
                        Appointment Details
                    </h3>


                    <div className="appointment-bill-grid">

                        <div>
                            <label>
                                Patient ID
                            </label>

                            <p>
                                P
                                {String(
                                    bill.patient_id || ""
                                ).padStart(3, "0")}
                            </p>
                        </div>


                        <div>
                            <label>
                                Patient Name
                            </label>

                            <p>
                                {bill.patient_name || "-"}
                            </p>
                        </div>


                        <div>
                            <label>
                                Doctor
                            </label>

                            <p>
                                {bill.doctor_name || "-"}
                            </p>
                        </div>


                        <div>
                            <label>
                                Doctor ID
                            </label>

                            <p>
                                {bill.doctor_id || "-"}
                            </p>
                        </div>


                        <div>
                            <label>
                                Department
                            </label>

                            <p>
                                {bill.department || "-"}
                            </p>
                        </div>


                        <div>
                            <label>
                                Appointment Type
                            </label>

                            <p>
                                {bill.appointment_type || "-"}
                            </p>
                        </div>

                    </div>

                </div>


                {/* Appointment Schedule */}

                <div className="appointment-bill-section">

                    <h3>
                        Schedule
                    </h3>


                    <div className="appointment-bill-grid">

                        <div>

                            <label>
                                Appointment Date
                            </label>

                            <p>
                                {formatDate(
                                    bill.appointment_date
                                    || bill.date
                                )}
                            </p>

                        </div>


                        <div>

                            <label>
                                Time Slot
                            </label>

                            <p>
                                {formatTime(
                                    bill.appointment_time
                                    || bill.time
                                )}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Payment */}

                <div className="appointment-bill-payment">

                    <div className="payment-row">

                        <span>
                            Consultation Fee
                        </span>

                        <strong>
                            ₹
                            {Number(
                                bill.amount || 0
                            ).toFixed(2)}
                        </strong>

                    </div>


                    <div className="payment-row">

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            {bill.payment_method || "-"}
                        </strong>

                    </div>


                    <div className="payment-row">

                        <span>
                            Payment Status
                        </span>

                        <strong className="paid-status">
                            {bill.payment_status || "Paid"}
                        </strong>

                    </div>


                    <div className="payment-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹
                            {Number(
                                bill.amount || 0
                            ).toFixed(2)}
                        </strong>

                    </div>

                </div>


                {/* Footer */}

                <div className="appointment-bill-footer">

                    <p>
                        Thank you for choosing our hospital.
                    </p>

                    <p>
                        This is a computer-generated receipt.
                    </p>

                </div>


                {/* Actions */}

                <div className="appointment-bill-actions">

                    <button
                        className="appointment-bill-print"
                        onClick={handlePrint}
                    >
                        Print Bill
                    </button>


                    <button
                        className="appointment-bill-done"
                        onClick={onClose}
                    >
                        Done
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AppointmentBillPopup;