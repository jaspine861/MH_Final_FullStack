// import { useEffect, useState } from "react";
// import "./TestResultPopup.css";

// const testParameters = {
//     "Blood Test": [
//         "Hemoglobin (g/dL)",
//         "WBC Count (cells/µL)",
//         "RBC Count (million cells/µL)",
//         "Platelet Count (cells/µL)",
//         "Blood Sugar (mg/dL)",
//     ],

//     "Urine Test": [
//         "Color",
//         "Appearance",
//         "pH",
//         "Protein",
//         "Glucose",
//     ],

//     "Liver Function Test": [
//         "Total Bilirubin (mg/dL)",
//         "SGOT / AST (U/L)",
//         "SGPT / ALT (U/L)",
//         "Alkaline Phosphatase (U/L)",
//         "Albumin (g/dL)",
//     ],

//     "Kidney Function Test": [
//         "Blood Urea (mg/dL)",
//         "Serum Creatinine (mg/dL)",
//         "Uric Acid (mg/dL)",
//         "Sodium (mmol/L)",
//         "Potassium (mmol/L)",
//     ],

//     "Lipid Profile": [
//         "Total Cholesterol (mg/dL)",
//         "HDL Cholesterol (mg/dL)",
//         "LDL Cholesterol (mg/dL)",
//         "Triglycerides (mg/dL)",
//         "VLDL Cholesterol (mg/dL)",
//     ],

//     "Thyroid Profile": [
//         "T3 (ng/dL)",
//         "T4 (µg/dL)",
//         "TSH (µIU/mL)",
//         "Free T3 (pg/mL)",
//         "Free T4 (ng/dL)",
//     ],

//     "General": [
//         "Body Temperature (°C)",
//         "Blood Pressure (mmHg)",
//         "Blood Sugar (mg/dL)",
//         "Heart Rate (bpm)",
//         "Oxygen Saturation (SpO₂ %)",
//     ],
// };

// function TestResultPopup({
//     test,
//     onClose,
//     onGenerateBill
// }) {
      
//     const [results, setResults] = useState({});
//     const [technicianNotes, setTechnicianNotes] = useState("");
//     const [paymentMethod, setPaymentMethod] = useState("");
//     const [loading, setLoading] = useState(false);
    

//     useEffect(() => {

//         if (test) {

//             setResults({});
//             setTechnicianNotes("");
//             setPaymentMethod("");

//         }

//     }, [test]);

//     if (!test) return null;

//     const parameters =
//         testParameters[test.test_name] ||
//         testParameters["General"];

//     const handleResultChange = (parameter, value) => {

//         setResults((prev) => ({
//             ...prev,
//             [parameter]: value,
//         }));

//     };

//     const handleGenerateBill = async () => {

//         if (!paymentMethod) {
//             alert("Please select a payment method.");
//             return;
//         }

//         try {

//             setLoading(true);

//             await onGenerateBill(
//                 test,
//                 results,
//                 technicianNotes,
//                 paymentMethod
//             );

//         } catch (error) {

//             console.error(
//                 "Error generating bill:",
//                 error
//             );

//         } finally {

//             setLoading(false);

//         }

//     };

//     return (

//         <div className="test-popup-overlay">

//             <div className="test-popup">

//                 {/* Header */}

//                 <div className="test-popup-header">

//                     <h2>Test Details</h2>

//                     <button
//                         className="test-popup-close"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>


//                 {/* Test Information */}

//                 <div className="test-info">

//                     <div className="test-info-item">

//                         <label>
//                             Patient Name
//                         </label>

//                         <span>
//                             {test.patient_name ||
//                                 test.patient_id}
//                         </span>

//                     </div>


//                     <div className="test-info-item">

//                         <label>
//                             Test Name
//                         </label>

//                         <span>
//                             {test.test_name}
//                         </span>

//                     </div>

//                 </div>


//                 {/* Parameters */}

//                 <div className="test-parameters">

//                     <h3>
//                         {test.test_name} Parameters
//                     </h3>

//                     {parameters.map((parameter) => (

//                         <div
//                             className="parameter-row"
//                             key={parameter}
//                         >

//                             <label>
//                                 {parameter}
//                             </label>

//                             <input
//                                 type="text"
//                                 value={
//                                     results[parameter] || ""
//                                 }
//                                 onChange={(e) =>
//                                     handleResultChange(
//                                         parameter,
//                                         e.target.value
//                                     )
//                                 }
//                                 placeholder="Enter result"
//                             />

//                         </div>

//                     ))}

//                 </div>


//                 {/* Technician Notes */}

//                 <div className="technician-notes">

//                     <label>
//                         Technician Notes
//                     </label>

//                     <textarea
//                         value={technicianNotes}
//                         onChange={(e) =>
//                             setTechnicianNotes(
//                                 e.target.value
//                             )
//                         }
//                         placeholder="Enter technician notes..."
//                         rows="4"
//                     />

//                 </div>


//                 {/* Payment */}

//                 <div className="test-payment-section">

//                     <label>
//                         Payment Method
//                     </label>

//                     <select
//                         value={paymentMethod}
//                         onChange={(e) =>
//                             setPaymentMethod(
//                                 e.target.value
//                             )
//                         }
//                     >

//                         <option value="">
//                             Select Payment Method
//                         </option>

//                         <option value="Cash">
//                             Cash
//                         </option>

//                         <option value="Card">
//                             Card
//                         </option>

//                         <option value="UPI">
//                             UPI
//                         </option>

//                         <option value="Net Banking">
//                             Net Banking
//                         </option>

//                     </select>

//                 </div>


//                 {/* Actions */}

//                 <div className="test-popup-actions">

//                     <button
//                         className="test-close-button"
//                         onClick={onClose}
//                         disabled={loading}
//                     >
//                         Close
//                     </button>

//                     <button
//                         className="test-complete-button"
//                         onClick={handleGenerateBill}
//                         disabled={loading}
//                     >
//                         {loading
//                             ? "Generating..."
//                             : "Generate Bill"}
//                     </button>

//                 </div>

//             </div>

//         </div>

//     );

// }

// export default TestResultPopup;

import { useEffect, useState } from "react";
import "./TestResultPopup.css";

const testParameters = {
    "Complete Blood Count": [
        "Hemoglobin (g/dL)",
        "WBC Count (cells/µL)",
        "RBC Count (million cells/µL)",
        "Platelet Count (cells/µL)",
        "Blood Sugar (mg/dL)",
    ],

    "Blood Test": [
        "Hemoglobin (g/dL)",
        "WBC Count (cells/µL)",
        "RBC Count (million cells/µL)",
        "Platelet Count (cells/µL)",
        "Blood Sugar (mg/dL)",
    ],

    "Urine Test": [
        "Color",
        "Appearance",
        "pH",
        "Protein",
        "Glucose",
    ],

    "Liver Function Test": [
        "Total Bilirubin (mg/dL)",
        "SGOT / AST (U/L)",
        "SGPT / ALT (U/L)",
        "Alkaline Phosphatase (U/L)",
        "Albumin (g/dL)",
    ],

    "Kidney Function Test": [
        "Blood Urea (mg/dL)",
        "Serum Creatinine (mg/dL)",
        "Uric Acid (mg/dL)",
        "Sodium (mmol/L)",
        "Potassium (mmol/L)",
    ],

    "Lipid Profile": [
        "Total Cholesterol (mg/dL)",
        "HDL Cholesterol (mg/dL)",
        "LDL Cholesterol (mg/dL)",
        "Triglycerides (mg/dL)",
        "VLDL Cholesterol (mg/dL)",
    ],

    "Thyroid Profile": [
        "T3 (ng/dL)",
        "T4 (µg/dL)",
        "TSH (µIU/mL)",
        "Free T3 (pg/mL)",
        "Free T4 (ng/dL)",
    ],

    "General": [
        "Body Temperature (°C)",
        "Blood Pressure (mmHg)",
        "Blood Sugar (mg/dL)",
        "Heart Rate (bpm)",
        "Oxygen Saturation (SpO₂ %)",
    ],
};

function TestResultPopup({
    test,
    onClose,
    onGenerateBill
}) {

    const [results, setResults] = useState({});
    const [technicianNotes, setTechnicianNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [loading, setLoading] = useState(false);

    // Store validation errors
    const [errors, setErrors] = useState({});


    // Reset form whenever another test is opened
    useEffect(() => {

        if (test) {

            setResults({});
            setTechnicianNotes("");
            setPaymentMethod("");
            setErrors({});
            setLoading(false);

        }

    }, [test]);

    if (!test) {
        return null;
    }

    // Get parameters for the selected test
    const parameters =
        testParameters[test.test_name] ||
        testParameters["General"];

    // Handle result input
    const handleResultChange = (parameter, value) => {

        setResults((prev) => ({
            ...prev,
            [parameter]: value,
        }));

        // Remove error when user starts typing
        setErrors((prev) => ({
            ...prev,
            [parameter]: "",
        }));
    };


    // Validate the entire form
    const validateForm = () => {

        const newErrors = {};
        // Validate every test parameter
        parameters.forEach((parameter) => {

            const value = results[parameter];

            if (!value || value.trim() === "") {

                newErrors[parameter] =
                    "This field is required.";
            }
        });

        // Validate payment method
        if (!paymentMethod) {

            newErrors.paymentMethod =
                "Please select a payment method.";

        }


        setErrors(newErrors);
        // Return true only when there are no errors
        return Object.keys(newErrors).length === 0;
    };


    // Submit / Generate Bill
    const handleGenerateBill = async (e) => {

        // Prevent browser form submission
        e.preventDefault();


        // Validate before submitting
        const isValid = validateForm();

        if (!isValid) {

            return;

        }


        try {

            setLoading(true);


            await onGenerateBill(
                test,
                results,
                technicianNotes,
                paymentMethod
            );


        } catch (error) {

            console.error(
                "Error generating bill:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="test-popup-overlay">

            <div className="test-popup">


                {/* ================= HEADER ================= */}

                <div className="test-popup-header">

                    <h2>
                        Test Details
                    </h2>

                    <button
                        type="button"
                        className="test-popup-close"
                        onClick={onClose}
                        disabled={loading}
                    >
                        ×
                    </button>

                </div>


                {/* ================= TEST FORM ================= */}

                <form
                    onSubmit={handleGenerateBill}
                    noValidate
                >


                    {/* ================= TEST INFORMATION ================= */}

                    <div className="test-info">

                        <div className="test-info-item">

                            <label>
                                Patient Name
                            </label>

                            <span>
                                {test.patient_name ||
                                    test.patient_id}
                            </span>

                        </div>


                        <div className="test-info-item">

                            <label>
                                Test Name
                            </label>

                            <span>
                                {test.test_name}
                            </span>

                        </div>

                    </div>


                    {/* ================= PARAMETERS ================= */}

                    <div className="test-parameters">

                        <h3>
                            {test.test_name} Parameters
                        </h3>


                        {parameters.map((parameter) => (

                            <div
                                className="parameter-row"
                                key={parameter}
                            >

                                <label>
                                    {parameter}
                                </label>


                                <input
                                    type="text"
                                    value={
                                        results[parameter] || ""
                                    }
                                    onChange={(e) =>
                                        handleResultChange(
                                            parameter,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter result"
                                    disabled={loading}
                                    required
                                />

                                {/* Validation error */}

                                {errors[parameter] && (

                                    <small
                                        className="field-error"
                                    >
                                        {errors[parameter]}
                                    </small>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ================= TECHNICIAN NOTES ================= */}

                    <div className="technician-notes">

                        <label>
                            Technician Notes
                        </label>

                        <textarea
                            value={technicianNotes}
                            onChange={(e) =>
                                setTechnicianNotes(
                                    e.target.value
                                )
                            }
                            placeholder="Enter technician notes..."
                            rows="4"
                            disabled={loading}
                        />
                    </div>

                    {/* ================= PAYMENT ================= */}

                    <div className="test-payment-section">

                        <label>
                            Payment Method
                        </label>


                        <select
                            value={paymentMethod}
                            onChange={(e) => {

                                setPaymentMethod(
                                    e.target.value
                                );

                                setErrors((prev) => ({
                                    ...prev,
                                    paymentMethod: "",
                                }));

                            }}
                            disabled={loading}
                            required
                        >

                            <option value="">
                                Select Payment Method
                            </option>

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Net Banking">
                                Net Banking
                            </option>

                        </select>
                        {/* Payment error */}

                        {errors.paymentMethod && (

                            <small
                                className="field-error"
                            >
                                {errors.paymentMethod}
                            </small>
                        )}
                    </div>


                    {/* ================= ACTIONS ================= */}

                    <div className="test-popup-actions">

                        <button
                            type="button"
                            className="test-close-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="test-complete-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Generating..."
                                : "Generate Bill"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TestResultPopup;