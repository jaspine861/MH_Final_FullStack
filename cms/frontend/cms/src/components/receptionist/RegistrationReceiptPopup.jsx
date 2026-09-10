// import "./RegistrationReceiptPopup.css";

// function RegistrationReceiptPopup({
//     patient,
//     amount,
//     paymentMethod,
//     onClose
// }) {

//     const receiptNumber =
//         `REG-${String(patient.patient_id).padStart(5, "0")}`;

//     const today = new Date();

//     const date = today.toLocaleDateString("en-IN");

//     const time = today.toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit"
//     });

//     const handlePrint = () => {
//         window.print();
//     };

//     return (

//         <div className="receipt-overlay">

//             <div className="receipt-card">

//                 {/* Header */}

//                 <div className="receipt-header">

//                     <div>
//                         <h2>
//                             Registration Receipt
//                         </h2>

//                         <p>
//                             Patient Registration
//                         </p>
//                     </div>

//                     <button
//                         className="receipt-close-button"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>


//                 {/* Hospital */}

//                 <div className="hospital-section">

//                     <h1>
//                         KIMS
//                     </h1>

//                     <p>
//                         Patient Registration Department
//                     </p>

//                     <p>
//                         Registration Receipt
//                     </p>

//                 </div>


//                 <div className="receipt-divider"></div>


//                 {/* Receipt Information */}

//                 <div className="receipt-meta">

//                     <div>
//                         <span>Receipt No.</span>
//                         <strong>
//                             {receiptNumber}
//                         </strong>
//                     </div>

//                     <div>
//                         <span>Date</span>
//                         <strong>
//                             {date}
//                         </strong>
//                     </div>

//                     <div>
//                         <span>Time</span>
//                         <strong>
//                             {time}
//                         </strong>
//                     </div>

//                 </div>


//                 {/* Patient */}

//                 <div className="receipt-patient">

//                     <h3>
//                         Patient Details
//                     </h3>

//                     <div className="receipt-row">

//                         <span>
//                             Patient ID
//                         </span>

//                         <strong>
//                             P
//                             {String(
//                                 patient.patient_id
//                             ).padStart(3, "0")}
//                         </strong>

//                     </div>

//                     <div className="receipt-row">

//                         <span>
//                             Patient Name
//                         </span>

//                         <strong>
//                             {patient.full_name}
//                         </strong>

//                     </div>

//                     <div className="receipt-row">

//                         <span>
//                             Phone
//                         </span>

//                         <strong>
//                             {patient.phone}
//                         </strong>

//                     </div>

//                 </div>


//                 {/* Payment */}

//                 <div className="receipt-payment">

//                     <h3>
//                         Payment Details
//                     </h3>

//                     <div className="receipt-row">

//                         <span>
//                             Description
//                         </span>

//                         <strong>
//                             Patient Registration
//                         </strong>

//                     </div>

//                     <div className="receipt-row">

//                         <span>
//                             Payment Method
//                         </span>

//                         <strong>
//                             {paymentMethod}
//                         </strong>

//                     </div>

//                     <div className="receipt-total">

//                         <span>
//                             Total Paid
//                         </span>

//                         <strong>
//                             ₹{amount}
//                         </strong>

//                     </div>

//                 </div>


//                 {/* Status */}

//                 <div className="paid-status">
//                     PAID
//                 </div>


//                 <p className="receipt-thank-you">
//                     Thank you for choosing our hospital.
//                 </p>


//                 {/* Buttons */}

//                 <div className="receipt-actions">

//                     <button
//                         className="receipt-print-button"
//                         onClick={handlePrint}
//                     >
//                         Print Receipt
//                     </button>

//                     <button
//                         className="receipt-done-button"
//                         onClick={onClose}
//                     >
//                         Done
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default RegistrationReceiptPopup;

import "./RegistrationReceiptPopup.css";

function RegistrationReceiptPopup({
    patient,
    amount,
    paymentMethod,
    onClose,
    onAddAppointment
}) {

    const receiptNumber =
        `REG-${String(patient.patient_id).padStart(5, "0")}`;

    const today = new Date();

    const date = today.toLocaleDateString("en-IN");

    const time = today.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const handlePrint = () => {
        window.print();
    };

    return (

        <div className="receipt-overlay">

            <div className="receipt-card">

                {/* Header */}
                <div className="receipt-header">

                    <div>
                        <h2>
                            Registration Receipt
                        </h2>

                        <p>
                            Patient Registration
                        </p>
                    </div>

                    <button
                        className="receipt-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Hospital */}
                <div className="hospital-section">

                    <h1>KIMS</h1>

                    <p>
                        Patient Registration Department
                    </p>

                    <p>
                        Registration Receipt
                    </p>

                </div>


                <div className="receipt-divider"></div>


                {/* Receipt Information */}
                <div className="receipt-meta">

                    <div>
                        <span>Receipt No.</span>

                        <strong>
                            {receiptNumber}
                        </strong>
                    </div>

                    <div>
                        <span>Date</span>

                        <strong>
                            {date}
                        </strong>
                    </div>

                    <div>
                        <span>Time</span>

                        <strong>
                            {time}
                        </strong>
                    </div>

                </div>


                {/* Patient */}
                <div className="receipt-patient">

                    <h3>
                        Patient Details
                    </h3>

                    <div className="receipt-row">

                        <span>
                            Patient ID
                        </span>

                        <strong>
                            P
                            {String(
                                patient.patient_id
                            ).padStart(3, "0")}
                        </strong>

                    </div>

                    <div className="receipt-row">

                        <span>
                            Patient Name
                        </span>

                        <strong>
                            {patient.full_name}
                        </strong>

                    </div>

                    <div className="receipt-row">

                        <span>
                            Phone
                        </span>

                        <strong>
                            {patient.phone}
                        </strong>

                    </div>

                </div>


                {/* Payment */}
                <div className="receipt-payment">

                    <h3>
                        Payment Details
                    </h3>

                    <div className="receipt-row">

                        <span>
                            Description
                        </span>

                        <strong>
                            Patient Registration
                        </strong>

                    </div>

                    <div className="receipt-row">

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            {paymentMethod}
                        </strong>

                    </div>

                    <div className="receipt-total">

                        <span>
                            Total Paid
                        </span>

                        <strong>
                            ₹{amount}
                        </strong>

                    </div>

                </div>


                {/* Status */}
                <div className="paid-status">
                    PAID
                </div>


                <p className="receipt-thank-you">
                    Thank you for choosing our hospital.
                </p>


                {/* Buttons */}
                <div className="receipt-actions">

                    <button
                        className="receipt-print-button"
                        onClick={handlePrint}
                    >
                        Print Receipt
                    </button>

                    <button
                        className="receipt-done-button"
                        onClick={() => onAddAppointment(patient)}
                    >
                        Add Appointment
                    </button>

                </div>

            </div>

        </div>
    );
}

export default RegistrationReceiptPopup;