import "./LabBillPopup.css";

function LabBillPopup({ bill, onClose }) {

    if (!bill) return null;

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const formatAmount = (amount) => {

        return Number(amount || 0).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR"
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (

        <div className="lab-bill-overlay">

            <div className="lab-bill-popup">

                {/* Header */}

                <div className="lab-bill-header">

                    <div className="hospital-brand">

                        <div className="hospital-logo">
                            H
                        </div>

                        <div>

                            <h1>
                                ABC MULTISPECIALITY HOSPITAL
                            </h1>

                            <p>
                                Hospital & Diagnostic Center
                            </p>

                            <span>
                                Healthcare You Can Trust
                            </span>

                        </div>

                    </div>

                    <button
                        className="lab-bill-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Bill Title */}

                <div className="lab-bill-title">

                    <h2>
                        LABORATORY BILL
                    </h2>

                    <div className="bill-title-line"></div>

                </div>


                {/* Bill Information */}

                <div className="lab-bill-meta">

                    <div>
                        <span>Bill Number</span>
                        <strong>
                            LAB
                            {String(
                                bill.lab_bill_id
                            ).padStart(4, "0")}
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

                <div className="lab-bill-info-grid">

                    <div className="bill-info-card">

                        <h3>
                            Patient Information
                        </h3>

                        <div className="bill-info-row">

                            <span>
                                Patient Name
                            </span>

                            <strong>
                                {bill.patient_name || "-"}
                            </strong>

                        </div>

                        <div className="bill-info-row">

                            <span>
                                Patient ID
                            </span>

                            <strong>
                                P
                                {String(
                                    bill.patient_id || ""
                                ).padStart(3, "0")}
                            </strong>

                        </div>

                    </div>


                    <div className="bill-info-card">

                        <h3>
                            Doctor Information
                        </h3>

                        <div className="bill-info-row">

                            <span>
                                Doctor
                            </span>

                            <strong>
                                {bill.doctor_name || "-"}
                            </strong>

                        </div>

                        <div className="bill-info-row">

                            <span>
                                Doctor ID
                            </span>

                            <strong>
                                {bill.doctor_id || "-"}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Test Details */}

                <div className="bill-test-section">

                    <h3>
                        Laboratory Test Details
                    </h3>

                    <table>

                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Test Name</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>
                                    1
                                </td>

                                <td>
                                    <strong>
                                        {bill.test_name}
                                    </strong>
                                </td>

                                <td>
                                    {bill.description || "-"}
                                </td>

                                <td className="bill-amount">
                                    {formatAmount(
                                        bill.amount
                                    )}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                {/* Payment */}

                <div className="lab-payment-section">

                    <div className="payment-details">

                        <div>
                            <span>
                                Payment Method
                            </span>

                            <strong>
                                {bill.payment_method}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Payment Status
                            </span>

                            <strong className="paid-status">
                                {bill.payment_status
                                    ?.toUpperCase()}
                            </strong>
                        </div>

                    </div>


                    <div className="bill-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            {formatAmount(
                                bill.amount
                            )}
                        </strong>

                    </div>

                </div>


                {/* Footer */}

                <div className="lab-bill-footer">

                    <p>
                        Thank you for choosing
                        ABC Multispeciality Hospital.
                    </p>

                    <span>
                        This is a computer-generated bill.
                    </span>

                </div>


                {/* Actions */}

                <div className="lab-bill-actions">

                    <button
                        className="bill-print-button"
                        onClick={handlePrint}
                    >
                        🖨 Print Bill
                    </button>

                    <button
                        className="bill-close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}

export default LabBillPopup;