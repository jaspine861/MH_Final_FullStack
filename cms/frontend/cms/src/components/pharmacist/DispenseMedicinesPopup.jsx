import React, { useEffect, useState } from "react";
import "./DispenseMedicinesPopup.css";
import { createBill } from "../../services/billService";
import {
    getMedicinesByConsultation,

    updatePrescribedMedicineStatus
} from "../../services/prescribedMedicineService";

const DispenseMedicinesPopup = ({
    prescription,
    onClose,
    onPaymentSuccess
}) => {

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
     const [showPayment, setShowPayment] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("");
const [paymentCompleted, setPaymentCompleted] = useState(false);
const [createdBill, setCreatedBill] = useState(null);

   const getTiming = (medicine) => {
    const timings = [];

    if (medicine.morning) {
        timings.push("Morning");
    }

    if (medicine.afternoon) {
        timings.push("Afternoon");
    }

    if (medicine.night) {
        timings.push("Night");
    }

    return timings.length > 0
        ? timings.join(", ")
        : "-";
};
    // Temporary medicine prices
    const medicinePrices = {
        MED001: 25,
        MED002: 30,
        MED003: 45,
        MED004: 60,
        MED005: 80,
    };

     const totalAmount = medicines.reduce(
    (total, medicine) =>
        total + Number(medicine.price || 0),
    0
);
    const getPrice = (medicineId) => {
        return medicinePrices[medicineId] || 0;
    };

//    const handleGenerateBill = () => {
//     setShowPayment(true);
// };

// const handlePayment = () => {
//     if (!paymentMethod) {
//         alert("Please select a payment method");
//         return;
//     }

//     // For now this is a frontend payment simulation
//     setPaymentCompleted(true);
// };

const handleBackToBill = () => {
    setShowPayment(false);
    setPaymentMethod("");
    setPaymentCompleted(false);
};
    // Fetch all medicines for this consultation
    useEffect(() => {

        const fetchMedicines = async () => {

            try {

                if (!prescription?.consultation_id) {
                    console.error(
                        "Consultation ID not available"
                    );
                    return;
                }

                const data =
                    await getMedicinesByConsultation(
                        prescription.consultation_id
                    );

                console.log(
                    "CONSULTATION MEDICINES:",
                    data
                );

                setMedicines(data);

            } catch (error) {

                console.error(
                    "Error fetching medicines:",
                    error.response?.data || error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchMedicines();

    }, [prescription]);


    // Calculate total
  const total = medicines.reduce(
    (sum, medicine) =>
        sum + getPrice(medicine.medicine_id),
    0
);

const handleGenerateBill = () => {
    setShowPayment(true);
};

// const handlePayment = async () => {

//     if (!paymentMethod) {
//         alert("Please select a payment method");
//         return;
//     }

//     try {

//         /*
//          * 1. Calculate total
//          */

//         const totalAmount = medicines.reduce(
//             (total, medicine) =>
//                 total + Number(medicine.price || 0),
//             0
//         );


//         /*
//          * 2. Create Bill
//          */

//         const bill = await createBill({
//             consultation_id:
//                 prescription.consultation_id,

//             patient_id:
//                 prescription.patient_id,

//             amount:
//                 totalAmount,

//             payment_status:
//                 "paid",

//             payment_method:
//                 paymentMethod
//         });


//         console.log(
//             "BILL CREATED:",
//             bill
//         );


//         /*
//          * 3. Mark medicines as completed
//          */

//         for (const medicine of medicines) {

//             await updatePrescribedMedicineStatus(
//                 medicine.prescription_id,
//                 "completed"
//             );

//         }


//         /*
//          * 4. Payment completed
//          */

//         setPaymentCompleted(true);


//         /*
//          * 5. Tell parent table
//          */

//         if (onPaymentSuccess) {
//             onPaymentSuccess();
//         }


//         alert("Payment Successful!");


//         /*
//          * 6. Generate bill
//          */

//         generateBill(
//             paymentMethod,
//             bill
//         );

//     } catch (error) {

//         console.error(
//             "PAYMENT ERROR:",
//             error.response?.data || error
//         );

//         alert(
//             "Payment failed. Please try again."
//         );
//     }
// };

const handlePayment = async () => {

    if (!paymentMethod) {
        alert("Please select a payment method");
        return;
    }

    try {

        // const bill = await createBill({
        //     consultation_id: prescription.consultation_id,
        //     patient_id: prescription.patient_id,
        //     amount: totalAmount,
        //     payment_status: "paid",
        //     payment_method: paymentMethod
        // });

        // console.log("BILL CREATED:", bill);

//    const bill = await createBill({
//     consultation_id: prescription.consultation_id,
//     patient_id: prescription.patient_id,
//     amount: totalAmount,
//     payment_status: "paid",
//     payment_method: paymentMethod
// });

const bill = await createBill({
    consultation_id: prescription.consultation_id,
    patient_id: prescription.patient_id,
    payment_method: paymentMethod
});

setCreatedBill(bill);

        // for (const medicine of medicines) {

        //     await updatePrescribedMedicineStatus(
        //         medicine.prescription_id,
        //         "completed"
        //     );

        // }

        setPaymentCompleted(true);

        if (onPaymentSuccess) {
            onPaymentSuccess();
        }

        alert("Payment Successful!");

    } catch (error) {

        console.error(
            "PAYMENT ERROR:",
            error.response?.data || error
        );

        alert("Payment failed. Please try again.");
    }
};

const generateBill = (paymentMethod,
    bill) => {

    // const billNumber = `BILL-${Date.now()}`;
        const billNumber = createdBill?.bill_id
    ? `BILL${String(createdBill.bill_id).padStart(3, "0")}`
    : "BILL";
    const patientName =
        prescription?.patient_name ||
        `Patient ${prescription?.patient_id || "001"}`;

    const doctorName =
        prescription?.doctor_name ||
        `Doctor ${prescription?.doctor_id || "001"}`;

    const receptionistName = "Receptionist";

    const currentDate =
        new Date().toLocaleString("en-IN");

    const billWindow = window.open(
        "",
        "_blank",
        "width=900,height=700"
    );

    if (!billWindow) {
        alert("Please allow popups to generate the bill.");
        return;
    }

    billWindow.document.write(`
        <!DOCTYPE html>

        <html>

        <head>

            <title>${billNumber}</title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 30px;
                    background: #f5f5f5;
                }

                .bill-container {
                    max-width: 800px;
                    margin: auto;
                    background: white;
                    padding: 35px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .hospital-header {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #222;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }

                .hospital-logo {
                    width: 70px;
                    height: 70px;
                    object-fit: contain;
                    margin-right: 20px;
                }

                .hospital-info h1 {
                    margin: 0;
                    font-size: 26px;
                }

                .hospital-info p {
                    margin: 5px 0;
                    color: #555;
                }

                .bill-title {
                    text-align: center;
                    margin: 20px 0;
                }

                .bill-title h2 {
                    margin: 0;
                }

                .details {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    margin-bottom: 25px;
                }

                .detail-item {
                    padding: 7px 0;
                }

                .detail-item strong {
                    display: inline-block;
                    width: 130px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th,
                td {
                    border: 1px solid #ddd;
                    padding: 12px;
                }

                th {
                    background: #f3f3f3;
                    text-align: left;
                }

                .price {
                    text-align: right;
                }

                .total-section {
                    margin-top: 20px;
                    text-align: right;
                }

                .total {
                    font-size: 20px;
                    font-weight: bold;
                }

                .paid {
                    color: green;
                    font-weight: bold;
                }

                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    text-align: center;
                    color: #666;
                }

                .print-button {
                    margin-top: 25px;
                    text-align: center;
                }

                .print-button button {
                    padding: 10px 25px;
                    border: none;
                    background: #222;
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                }

                @media print {

                    body {
                        background: white;
                        padding: 0;
                    }

                    .bill-container {
                        box-shadow: none;
                    }

                    .print-button {
                        display: none;
                    }

                }

            </style>

        </head>


        <body>

            <div class="bill-container">


                <!-- Hospital -->

                <div class="hospital-header">

                    <img
                        src="/hospital-logo.png"
                        class="hospital-logo"
                        alt="Hospital Logo"
                    />

                    <div class="hospital-info">

                        <h1>ABC HOSPITAL</h1>

                        <p>
                            123 Main Road, Chennai, Tamil Nadu
                        </p>

                        <p>
                            Phone: +91 98765 43210
                        </p>

                        <p>
                            Email: info@abchospital.com
                        </p>

                    </div>

                </div>


                <!-- Bill title -->

                <div class="bill-title">

                    <h2>MEDICINE BILL</h2>

                    <p>
                        Bill No: ${billNumber}
                    </p>

                </div>


                <!-- Patient details -->

                <div class="details">

                    <div class="detail-item">

                        <strong>Patient:</strong>

                        ${patientName}

                    </div>


                    <div class="detail-item">

                        <strong>Patient ID:</strong>

                        ${prescription?.patient_id || "-"}

                    </div>


                    <div class="detail-item">

                        <strong>Doctor:</strong>

                        ${doctorName}

                    </div>


                    <div class="detail-item">

                        <strong>Receptionist:</strong>

                        ${receptionistName}

                    </div>


                    <div class="detail-item">

                        <strong>Date:</strong>

                        ${currentDate}

                    </div>


                    <div class="detail-item">

                        <strong>Payment:</strong>

                        <span class="paid">
                            PAID
                        </span>

                    </div>


                    <div class="detail-item">

                        <strong>Method:</strong>

                        ${paymentMethod}

                    </div>

                </div>


                <!-- Medicines -->

                <table>

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Medicine</th>

                            <th>Dosage</th>

                            <th>Timing</th>

                            <th>Duration</th>

                            <th>Available Stock</th>

                            <th>Price</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${medicines.map(
                            (medicine, index) => {

                                const price =
                                    // getPrice(
                                    //     // medicine.medicine_id
                                    //     medicine.price
                                    // );
                                    // medicine.price
                                     Number(medicine.price || 0);

                                return `

                                    <tr>

                                        <td>
                                            ${index + 1}
                                        </td>

                                        <td>
                                            ${medicine.medicine_name}
                                        </td>

                                        <td>
                                            ${medicine.dosage}
                                        </td>

                                        <td>
                                            ${getTiming(medicine)}
                                        </td>

                                        <td>
                                            ${medicine.duration}
                                        </td>


                                         <td>
    ${medicine.stock_quantity ?? 0}
</td>
                                        <td class="price">
                                            ₹${price.toFixed(2)}
                                        </td>

                                    </tr>

                                `;

                            }
                        ).join("")}

                    </tbody>

                </table>


                <!-- Total -->

                <div class="total-section">

                    <p>
                        Sub Total:
                        ₹${totalAmount.toFixed(2)}
                    </p>

                    <p>
                        Tax:
                        ₹0.00
                    </p>

                    <p class="total">
                        TOTAL:
                        ₹${totalAmount.toFixed(2)}
                    </p>

                </div>


                <!-- Footer -->

                <div class="footer">

                    <p>
                        <strong>
                            Thank you for choosing ABC Hospital
                        </strong>
                    </p>

                    <p>
                        This is a computer generated bill.
                    </p>

                </div>


                <div class="print-button">

                    <button onclick="window.print()">
                        Print Bill
                    </button>

                </div>


            </div>

        </body>

        </html>
    `);

    billWindow.document.close();
};
    return (

        <div className="dispense-overlay">

            <div className="dispense-popup">


                {/* Header */}

                <div className="dispense-header">

                    <h2>
                        Dispense Medicines
                    </h2>

                    <button
                        className="dispense-close-icon"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Patient / Doctor */}

                <div className="patient-doctor-info">

                    <div>

                        <label>
                            Patient
                        </label>

                        <p>
                            {
                                prescription?.patient_name ||
                                `Patient ${
                                    prescription?.patient_id ||
                                    "001"
                                }`
                            }
                        </p>

                    </div>


                    <div>

                        <label>
                            Doctor
                        </label>

                        <p>
                            {
                                prescription?.doctor_name ||
                                `Doctor ${
                                    prescription?.doctor_id ||
                                    "001"
                                }`
                            }
                        </p>

                    </div>

                </div>


                {/* Medicines */}

                <div className="medicine-section">

                    <h3>
                        Prescribed Medicines
                    </h3>


                    {loading ? (

                        <p>
                            Loading medicines...
                        </p>

                    ) : medicines.length === 0 ? (

                        <p>
                            No medicines prescribed.
                        </p>

                    ) : (

                        <div className="medicine-table-wrapper">

                            <table className="medicine-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Medicine
                                        </th>

                                        <th>
                                            Dosage
                                        </th>

                                        <th>
                                            Timing
                                        </th>

                                        <th>
                                            Duration
                                        </th>
                                         <th>Available Stock</th>
                                        <th>
                                            Price
                                        </th>

                                    </tr>

                                </thead>


                             <tbody>

    {medicines.map((medicine) => (

        <tr
            key={medicine.prescription_id}
        >

            <td>
                {medicine.medicine_name || "-"}
            </td>

            <td>
                {medicine.dosage || "-"}
            </td>

            <td>
                {getTiming(medicine)}
            </td>

            <td>
                {medicine.duration || "-"}
            </td>

            <td>
                <span
                    className={
                        Number(medicine.stock_quantity || 0) === 0
                            ? "stock-out"
                            : Number(medicine.stock_quantity || 0) <= 10
                                ? "stock-low"
                                : "stock-available"
                    }
                >
                    {medicine.stock_quantity ?? 0}
                </span>
            </td>

            <td>
                ₹{Number(medicine.price || 0).toFixed(2)}
            </td>

        </tr>

    ))}

</tbody>

                            </table>

                        </div>

                    )}

                </div>


                {/* Total */}

                <div className="bill-total">

                    <span>
                        Total Amount
                    </span>

                    <strong>
                        ₹{totalAmount}
                    </strong>

                </div>


                {/* Buttons */}

                {!showPayment && !paymentCompleted && (

    <div className="dispense-actions">

        <button
            className="dispense-cancel-btn"
            onClick={onClose}
        >
            Close
        </button>

        <button
            className="generate-bill-btn"
            onClick={handleGenerateBill}
        >
            Generate Bill
        </button>

    </div>

)}


{showPayment && !paymentCompleted && (

    <div className="payment-container">

        <h3>Payment</h3>

        <div className="payment-total">

            <span>
                Total Amount
            </span>

            <strong>
                ₹{totalAmount.toFixed(2)}
            </strong>

        </div>


        <p className="payment-label">
            Select Payment Method
        </p>


        <div className="payment-methods">

            <button
                type="button"
                className={
                    paymentMethod === "Cash"
                        ? "payment-method selected"
                        : "payment-method"
                }
                onClick={() => setPaymentMethod("Cash")}
            >
                💵 Cash
            </button>


            <button
                type="button"
                className={
                    paymentMethod === "UPI"
                        ? "payment-method selected"
                        : "payment-method"
                }
                onClick={() => setPaymentMethod("UPI")}
            >
                📱 UPI
            </button>


            <button
                type="button"
                className={
                    paymentMethod === "Card"
                        ? "payment-method selected"
                        : "payment-method"
                }
                onClick={() => setPaymentMethod("Card")}
            >
                💳 Card
            </button>


            <button
                type="button"
                className={
                    paymentMethod === "Net Banking"
                        ? "payment-method selected"
                        : "payment-method"
                }
                onClick={() =>
                    setPaymentMethod("Net Banking")
                }
            >
                🏦 Net Banking
            </button>

        </div>


        {paymentMethod && (

            <div className="selected-payment">

                Selected:
                <strong>
                    {" "}{paymentMethod}
                </strong>

            </div>

        )}


        <div className="payment-actions">

            <button
                className="back-btn"
                onClick={() => setShowPayment(false)}
            >
                Back
            </button>


            <button
                className="pay-btn"
                onClick={handlePayment}
            >
                Pay ₹{totalAmount.toFixed(2)}
            </button>

        </div>

    </div>

)}


{paymentCompleted && (

    <div className="payment-success">

        <div className="success-icon">
            ✓
        </div>

        <h3>
            Payment Successful
        </h3>

        <p>
            ₹{totalAmount.toFixed(2)} paid successfully
        </p>

        <p>
            Payment Method:
            <strong>
                {" "}{paymentMethod}
            </strong>
        </p>


        <div className="payment-actions">

            <button
                className="close-btn"
                onClick={onClose}
            >
                Close
            </button>


            {/* <button
                className="generate-bill-btn"
                onClick={() =>
                    generateBill(paymentMethod)
                }
            >
                Generate Paid Bill
            </button> */}

            <button
    className="generate-bill-btn"
    onClick={() =>
        generateBill(paymentMethod, createdBill)
    }
>
    Generate Paid Bill
</button>

        </div>

    </div>

)}


            </div>

        </div>

    );

};

export default DispenseMedicinesPopup;
