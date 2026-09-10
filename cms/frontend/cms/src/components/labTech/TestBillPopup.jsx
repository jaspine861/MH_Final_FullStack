import "./TestBillPopup.css";

function TestBillPopup({ bill, onClose }) {

    if (!bill) return null;

    return (
        <div className="bill-overlay">

            <div className="bill-container">

                {/* Header */}
                <div className="bill-header">

                    <div className="hospital-info">

                        <img
                            src="/hospital-logo.png"
                            alt="Hospital Logo"
                            className="hospital-logo"
                        />

                        <div>
                            <h1>KERAN HOSPITAL</h1>

                            <p>
                                Multispeciality Hospital
                            </p>

                            <span>
                                Thiruvananthapuram, Kerala
                            </span>

                            <span>
                                Phone: +91 98765 43210
                            </span>

                            <span>
                                Email: info@keranhospital.com
                            </span>
                        </div>

                    </div>

                    <div className="bill-title">

                        <h2>MEDICAL BILL</h2>

                        <p>
                            Bill ID: <strong>{bill.bill_id}</strong>
                        </p>

                        <p>
                            Date: {bill.date}
                        </p>

                    </div>

                </div>


                {/* Divider */}
                <div className="bill-divider"></div>


                {/* Patient + Doctor */}
                <div className="bill-details-grid">

                    <div className="bill-detail-box">

                        <h3>Patient Information</h3>

                        <p>
                            <span>Patient Name</span>
                            <strong>{bill.patient_name}</strong>
                        </p>

                        <p>
                            <span>Patient ID</span>
                            <strong>{bill.patient_id}</strong>
                        </p>

                    </div>


                    <div className="bill-detail-box">

                        <h3>Doctor Information</h3>

                        <p>
                            <span>Doctor Name</span>
                            <strong>{bill.doctor_name}</strong>
                        </p>

                    </div>

                </div>


                {/* Test Table */}
                <div className="bill-section">

                    <h3>Test Details</h3>

                    <table className="bill-table">

                        <thead>

                            <tr>
                                <th>#</th>
                                <th>Test Description</th>
                                <th>Amount</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>1</td>

                                <td>
                                    <strong>
                                        {bill.test_name}
                                    </strong>

                                    <small>
                                        Laboratory Diagnostic Test
                                    </small>
                                </td>

                                <td>
                                    ₹{Number(bill.amount).toFixed(2)}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                {/* Payment */}
                <div className="bill-payment-section">

                    <div>

                        <p>
                            Payment Method
                        </p>

                        <strong>
                            {bill.payment_method}
                        </strong>

                    </div>

                    <div>

                        <p>
                            Payment Status
                        </p>

                        <span className="bill-paid">
                            {bill.payment_status}
                        </span>

                    </div>

                </div>


                {/* Total */}
                <div className="bill-total">

                    <span>Total Amount</span>

                    <strong>
                        ₹{Number(bill.amount).toFixed(2)}
                    </strong>

                </div>


                {/* Footer */}
                <div className="bill-footer">

                    <p>
                        Thank you for choosing Keran Hospital.
                    </p>

                    <span>
                        This is a computer-generated bill.
                    </span>

                </div>


                {/* Actions */}
                <div className="bill-actions">

                    <button
                        className="bill-print-button"
                        onClick={() => window.print()}
                    >
                        Print Bill
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

export default TestBillPopup;