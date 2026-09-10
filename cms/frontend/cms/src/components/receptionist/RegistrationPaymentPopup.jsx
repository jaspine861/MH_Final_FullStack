// import { useState } from "react";
// import "./RegistrationPaymentPopup.css";
// import RegistrationReceiptPopup from "./RegistrationReceiptPopup";

// function RegistrationPaymentPopup({
//     patient,
//     onClose,
//     onPaymentCompleted
// }) {

//     const REGISTRATION_FEE = 100;

//     const [paymentMethod, setPaymentMethod] = useState("");
//     const [showReceipt, setShowReceipt] = useState(false);

//     const handlePayment = () => {

//         if (!paymentMethod) {
//             return;
//         }

//         setShowReceipt(true);
//     };

//     return (
//         <>
//             <div className="registration-payment-overlay">

//                 <div className="registration-payment-card">

//                     <div className="registration-payment-header">

//                         <div>
//                             <h2>
//                                 Registration Payment
//                             </h2>

//                             <p>
//                                 Complete patient registration
//                             </p>
//                         </div>

//                         <button
//                             className="registration-close-button"
//                             onClick={onClose}
//                         >
//                             ×
//                         </button>

//                     </div>


//                     {/* Patient Details */}

//                     <div className="registration-patient-info">

//                         <div>
//                             <span>Patient ID</span>

//                             <strong>
//                                 P
//                                 {String(
//                                     patient.patient_id
//                                 ).padStart(3, "0")}
//                             </strong>
//                         </div>

//                         <div>
//                             <span>Patient Name</span>

//                             <strong>
//                                 {patient.full_name}
//                             </strong>
//                         </div>

//                     </div>


//                     {/* Registration Fee */}

//                     <div className="registration-fee-box">

//                         <span>
//                             Registration Fee
//                         </span>

//                         <strong>
//                             ₹100
//                         </strong>

//                     </div>


//                     {/* Payment Method */}

//                     <div className="registration-form-group">

//                         <label>
//                             Mode of Payment
//                         </label>

//                         <select
//                             value={paymentMethod}
//                             onChange={(e) =>
//                                 setPaymentMethod(
//                                     e.target.value
//                                 )
//                             }
//                         >

//                             <option value="">
//                                 Select payment method
//                             </option>

//                             <option value="Cash">
//                                 Cash
//                             </option>

//                             <option value="UPI">
//                                 UPI
//                             </option>

//                             <option value="Card">
//                                 Card
//                             </option>

//                             <option value="Net Banking">
//                                 Net Banking
//                             </option>

//                         </select>

//                     </div>


//                     {/* Buttons */}

//                     <div className="registration-payment-actions">

//                         <button
//                             type="button"
//                             className="registration-cancel-button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="button"
//                             className="registration-pay-button"
//                             onClick={handlePayment}
//                             disabled={!paymentMethod}
//                         >
//                             Generate Receipt
//                         </button>

//                     </div>

//                 </div>

//             </div>


//             {/* Receipt */}

//             {showReceipt && (

//                 <RegistrationReceiptPopup
//                     patient={patient}
//                     amount={REGISTRATION_FEE}
//                     paymentMethod={paymentMethod}
//                     onClose={() => {

//                         setShowReceipt(false);

//                         if (onPaymentCompleted) {
//                             onPaymentCompleted();
//                         }

//                     }}
//                 />

//             )}

//         </>
//     );
// }

// export default RegistrationPaymentPopup;

import { useState } from "react";
import "./RegistrationPaymentPopup.css";
import RegistrationReceiptPopup from "./RegistrationReceiptPopup";

function RegistrationPaymentPopup({
    patient,
    onClose,
    onPaymentCompleted,
    onAddAppointment
}) {

    const REGISTRATION_FEE = 100;

    const [paymentMethod, setPaymentMethod] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);

    const handlePayment = () => {

        if (!paymentMethod) {
            return;
        }

        setShowReceipt(true);
    };

    const handleAddAppointment = () => {

        // Close registration receipt
        setShowReceipt(false);

        // Close registration payment popup
        if (onClose) {
            onClose();
        }

        // Open Add Appointment
        if (onAddAppointment) {
            onAddAppointment(patient);
        }
    };

    return (
        <>
            <div className="registration-payment-overlay">

                <div className="registration-payment-card">

                    {/* Header */}

                    <div className="registration-payment-header">

                        <div>
                            <h2>
                                Registration Payment
                            </h2>

                            <p>
                                Complete patient registration
                            </p>
                        </div>

                        <button
                            className="registration-close-button"
                            onClick={onClose}
                        >
                            ×
                        </button>

                    </div>


                    {/* Patient Details */}

                    <div className="registration-patient-info">

                        <div>
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

                        <div>
                            <span>
                                Patient Name
                            </span>

                            <strong>
                                {patient.full_name}
                            </strong>
                        </div>

                    </div>


                    {/* Registration Fee */}

                    <div className="registration-fee-box">

                        <span>
                            Registration Fee
                        </span>

                        <strong>
                            ₹100
                        </strong>

                    </div>


                    {/* Payment Method */}

                    <div className="registration-form-group">

                        <label>
                            Mode of Payment
                        </label>

                        <select
                            value={paymentMethod}
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                Select payment method
                            </option>

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="Net Banking">
                                Net Banking
                            </option>

                        </select>

                    </div>


                    {/* Buttons */}

                    <div className="registration-payment-actions">

                        <button
                            type="button"
                            className="registration-cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="registration-pay-button"
                            onClick={handlePayment}
                            disabled={!paymentMethod}
                        >
                            Generate Receipt
                        </button>

                    </div>

                </div>

            </div>


            {/* Registration Receipt */}

            {showReceipt && (

                <RegistrationReceiptPopup
                    patient={patient}
                    amount={REGISTRATION_FEE}
                    paymentMethod={paymentMethod}

                    onClose={() => {

                        setShowReceipt(false);

                        if (onPaymentCompleted) {
                            onPaymentCompleted();
                        }

                    }}

                    onAddAppointment={
                        handleAddAppointment
                    }
                />

            )}

        </>
    );
}

export default RegistrationPaymentPopup;