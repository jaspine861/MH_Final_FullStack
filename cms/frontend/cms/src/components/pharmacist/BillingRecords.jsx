// // // import { useEffect, useState } from "react";
// // // import "./BillingRecords.css";
// // // import { getBills } from "../../services/billService";

// // // function BillingRecords() {

// // //     const [searchTerm, setSearchTerm] = useState("");
// // //     const [billingRecords, setBillingRecords] = useState([]);
// // //     const [loading, setLoading] = useState(true);

// // //     useEffect(() => {

// // //         const fetchBillingRecords = async () => {

// // //             try {

// // //                 const data = await getBills();

// // //                 console.log("BILLING RECORDS:", data);

// // //                 setBillingRecords(
// // //                     Array.isArray(data)
// // //                         ? data
// // //                         : []
// // //                 );

// // //             } catch (error) {

// // //                 console.error(
// // //                     "Error fetching billing records:",
// // //                     error.response?.data || error
// // //                 );

// // //             } finally {

// // //                 setLoading(false);

// // //             }

// // //         };

// // //         fetchBillingRecords();

// // //     }, []);


// // //     // Search
// // //     const filteredRecords = billingRecords.filter((bill) => {

// // //         const search =
// // //             searchTerm.toLowerCase();

// // //         const billId =
// // //             String(
// // //                 bill.bill_id || ""
// // //             ).toLowerCase();

// // //         const patientId =
// // //             `P${String(
// // //                 bill.patient_id || ""
// // //             ).padStart(3, "0")}`.toLowerCase();

// // //         const paymentStatus =
// // //             String(
// // //                 bill.payment_status || ""
// // //             ).toLowerCase();

// // //         const paymentMethod =
// // //             String(
// // //                 bill.payment_method || ""
// // //             ).toLowerCase();

// // //         return (
// // //             billId.includes(search) ||
// // //             patientId.includes(search) ||
// // //             paymentStatus.includes(search) ||
// // //             paymentMethod.includes(search)
// // //         );

// // //     });


// // //     const formatBillId = (id) => {

// // //         if (!id) {
// // //             return "-";
// // //         }

// // //         return `BILL${String(id).padStart(3, "0")}`;

// // //     };


// // //     const formatPatientId = (id) => {

// // //         if (!id) {
// // //             return "-";
// // //         }

// // //         return `P${String(id).padStart(3, "0")}`;

// // //     };


// // //     const formatAmount = (amount) => {

// // //         return Number(
// // //             amount || 0
// // //         ).toFixed(2);

// // //     };


// // //     const formatDate = (date) => {

// // //         if (!date) {
// // //             return "-";
// // //         }

// // //         return new Date(date).toLocaleString(
// // //             "en-IN",
// // //             {
// // //                 day: "2-digit",
// // //                 month: "short",
// // //                 year: "numeric",
// // //                 hour: "2-digit",
// // //                 minute: "2-digit"
// // //             }
// // //         );

// // //     };


// // //     return (

// // //         <div className="billing-section">

// // //             {/* Search */}

// // //             <div className="billing-controls">

// // //                 <div className="billing-search-container">

// // //                     <span className="billing-search-icon">
// // //                         ⌕
// // //                     </span>

// // //                     <input
// // //                         type="text"
// // //                         placeholder="Search billing records..."
// // //                         value={searchTerm}
// // //                         onChange={(e) =>
// // //                             setSearchTerm(
// // //                                 e.target.value
// // //                             )
// // //                         }
// // //                     />

// // //                 </div>

// // //             </div>


// // //             {/* Loading */}

// // //             {loading ? (

// // //                 <p>
// // //                     Loading billing records...
// // //                 </p>

// // //             ) : (

// // //                 <div className="billing-table-container">

// // //                     <table>

// // //                         <thead>

// // //                             <tr>

// // //                                 <th>
// // //                                     Bill ID
// // //                                 </th>

// // //                                 <th>
// // //                                     Patient
// // //                                 </th>

// // //                                 <th>
// // //                                     Amount
// // //                                 </th>

// // //                                 <th>
// // //                                     Payment
// // //                                 </th>

// // //                                 <th>
// // //                                     Method
// // //                                 </th>

// // //                                 <th>
// // //                                     Date
// // //                                 </th>

// // //                                 <th>
// // //                                     Action
// // //                                 </th>

// // //                             </tr>

// // //                         </thead>


// // //                         <tbody>

// // //                             {filteredRecords.length > 0 ? (

// // //                                 filteredRecords.map(
// // //                                     (bill) => (

// // //                                         <tr
// // //                                             key={
// // //                                                 bill.bill_id
// // //                                             }
// // //                                         >

// // //                                             {/* Bill ID */}

// // //                                             <td>
// // //                                                 {
// // //                                                     formatBillId(
// // //                                                         bill.bill_id
// // //                                                     )
// // //                                                 }
// // //                                             </td>


// // //                                             {/* Patient */}

// // //                                             <td>
// // //                                                 {
// // //                                                     formatPatientId(
// // //                                                         bill.patient_id
// // //                                                     )
// // //                                                 }
// // //                                             </td>


// // //                                             {/* Amount */}

// // //                                             <td>
// // //                                                 ₹
// // //                                                 {
// // //                                                     formatAmount(
// // //                                                         bill.amount
// // //                                                     )
// // //                                                 }
// // //                                             </td>


// // //                                             {/* Payment */}

// // //                                             <td>

// // //                                                 <span
// // //                                                     className={`billing-status ${
// // //                                                         String(
// // //                                                             bill.payment_status ||
// // //                                                             ""
// // //                                                         ).toLowerCase()
// // //                                                     }`}
// // //                                                 >

// // //                                                     {
// // //                                                         bill.payment_status ||
// // //                                                         "-"
// // //                                                     }

// // //                                                 </span>

// // //                                             </td>


// // //                                             {/* Method */}

// // //                                             <td>
// // //                                                 {
// // //                                                     bill.payment_method ||
// // //                                                     "-"
// // //                                                 }
// // //                                             </td>


// // //                                             {/* Date */}

// // //                                             <td>
// // //                                                 {
// // //                                                     formatDate(
// // //                                                         bill.created_at ||
// // //                                                         bill.bill_date
// // //                                                     )
// // //                                                 }
// // //                                             </td>


// // //                                             {/* Action */}

// // //                                             <td>

// // //                                                 <button
// // //                                                     className="billing-action-button"
// // //                                                     onClick={() =>
// // //                                                         console.log(
// // //                                                             "View bill:",
// // //                                                             bill
// // //                                                         )
// // //                                                     }
// // //                                                 >
// // //                                                     View
// // //                                                 </button>

// // //                                             </td>

// // //                                         </tr>

// // //                                     )

// // //                                 )

// // //                             ) : (

// // //                                 <tr>

// // //                                     <td
// // //                                         colSpan="7"
// // //                                         className="no-billing-records"
// // //                                     >
// // //                                         No billing records found
// // //                                     </td>

// // //                                 </tr>

// // //                             )}

// // //                         </tbody>

// // //                     </table>

// // //                 </div>

// // //             )}

// // //         </div>

// // //     );

// // // }

// // // export default BillingRecords;

// // import { useEffect, useState } from "react";
// // import "./BillingRecords.css";
// // import { getBills } from "../../services/billService";

// // function BillingRecords() {
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [billingRecords, setBillingRecords] = useState([]);
// //     const [loading, setLoading] = useState(true);
    
// //     // NEW - for view modal
// //     const [selectedBill, setSelectedBill] = useState(null);
// //     const [showModal, setShowModal] = useState(false);

// //     useEffect(() => {
// //         const fetchBillingRecords = async () => {
// //             try {
// //                 const data = await getBills();
// //                 console.log("BILLING RECORDS:", data);
// //                 setBillingRecords(Array.isArray(data) ? data : []);
// //             } catch (error) {
// //                 console.error("Error fetching billing records:", error.response?.data || error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         fetchBillingRecords();
// //     }, []);

// //     const filteredRecords = billingRecords.filter((bill) => {
// //         const search = searchTerm.toLowerCase();
// //         const billId = String(bill.bill_id || "").toLowerCase();
// //         const patientId = `P${String(bill.patient_id || "").padStart(3, "0")}`.toLowerCase();
// //         const paymentStatus = String(bill.payment_status || "").toLowerCase();
// //         const paymentMethod = String(bill.payment_method || "").toLowerCase();
// //         return (
// //             billId.includes(search) ||
// //             patientId.includes(search) ||
// //             paymentStatus.includes(search) ||
// //             paymentMethod.includes(search)
// //         );
// //     });

// //     const formatBillId = (id) => {
// //         if (!id) return "-";
// //         return `BILL${String(id).padStart(3, "0")}`;
// //     };

// //     const formatPatientId = (id) => {
// //         if (!id) return "-";
// //         return `P${String(id).padStart(3, "0")}`;
// //     };

// //     const formatAmount = (amount) => {
// //         return Number(amount || 0).toFixed(2);
// //     };

// //     const formatDate = (date) => {
// //         if (!date) return "-";
// //         return new Date(date).toLocaleString("en-IN", {
// //             day: "2-digit",
// //             month: "short",
// //             year: "numeric",
// //             hour: "2-digit",
// //             minute: "2-digit"
// //         });
// //     };

// //     // NEW - View handler
// //     const handleView = (bill) => {
// //         setSelectedBill(bill);
// //         setShowModal(true);
// //     };

// //     const closeModal = () => {
// //         setShowModal(false);
// //         setSelectedBill(null);
// //     };

// //     return (
// //         <div className="billing-section">
// //             <div className="billing-controls">
// //                 <div className="billing-search-container">
// //                     <span className="billing-search-icon">⌕</span>
// //                     <input
// //                         type="text"
// //                         placeholder="Search billing records..."
// //                         value={searchTerm}
// //                         onChange={(e) => setSearchTerm(e.target.value)}
// //                     />
// //                 </div>
// //             </div>

// //             {loading ? (
// //                 <p>Loading billing records...</p>
// //             ) : (
// //                 <div className="billing-table-container">
// //                     <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>Bill ID</th>
// //                                 <th>Patient</th>
// //                                 <th>Amount</th>
// //                                 <th>Payment</th>
// //                                 <th>Method</th>
// //                                 <th>Date</th>
// //                                 <th>Action</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {filteredRecords.length > 0 ? (
// //                                 filteredRecords.map((bill) => (
// //                                     <tr key={bill.bill_id}>
// //                                         <td>{formatBillId(bill.bill_id)}</td>
// //                                         <td>{formatPatientId(bill.patient_id)}</td>
// //                                         <td>₹{formatAmount(bill.amount)}</td>
// //                                         <td>
// //                                             <span className={`billing-status ${String(bill.payment_status || "").toLowerCase()}`}>
// //                                                 {bill.payment_status || "-"}
// //                                             </span>
// //                                         </td>
// //                                         <td>{bill.payment_method || "-"}</td>
// //                                         <td>{formatDate(bill.created_at || bill.bill_date)}</td>
// //                                         <td>
// //                                             <button
// //                                                 className="billing-action-button"
// //                                                 onClick={() => handleView(bill)}
// //                                             >
// //                                                 View
// //                                             </button>
// //                                         </td>
// //                                     </tr>
// //                                 ))
// //                             ) : (
// //                                 <tr>
// //                                     <td colSpan="7" className="no-billing-records">
// //                                         No billing records found
// //                                     </td>
// //                                 </tr>
// //                             )}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}

// //             {/* VIEW MODAL */}
// //             {showModal && selectedBill && (
// //                 <div className="bill-modal-overlay" onClick={closeModal}>
// //                     <div className="bill-modal-content" onClick={(e) => e.stopPropagation()}>
// //                         <div className="bill-modal-header">
// //                             <h3>Bill Details</h3>
// //                             <button className="bill-modal-close" onClick={closeModal}>×</button>
// //                         </div>
// //                         <div className="bill-modal-body">
// //                             <p><strong>Bill ID:</strong> {formatBillId(selectedBill.bill_id)}</p>
// //                             <p><strong>Patient ID:</strong> {formatPatientId(selectedBill.patient_id)}</p>
// //                             <p><strong>Amount:</strong> ₹{formatAmount(selectedBill.amount)}</p>
// //                             <p><strong>Payment Status:</strong> {selectedBill.payment_status}</p>
// //                             <p><strong>Payment Method:</strong> {selectedBill.payment_method}</p>
// //                             <p><strong>Date:</strong> {formatDate(selectedBill.created_at || selectedBill.bill_date)}</p>
// //                             <p><strong>Description:</strong> {selectedBill.description || selectedBill.notes || "No notes"}</p>
// //                         </div>
// //                         <div className="bill-modal-footer">
// //                             <button className="bill-modal-btn-close" onClick={closeModal}>Close</button>
// //                             <button className="bill-modal-btn-print" onClick={() => window.print()}>Print</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

// // export default BillingRecords;

// import { useEffect, useState } from "react";
// import "./BillingRecords.css";
// import { getBills } from "../../services/billService";
// import hospitalLogo from "../../assets/hospital_logo.png";

// function BillingRecords() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [billingRecords, setBillingRecords] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // View modal
//     const [selectedBill, setSelectedBill] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         const fetchBillingRecords = async () => {
//             try {
//                 const data = await getBills();

//                 console.log("BILLING RECORDS:", data);

//                 setBillingRecords(Array.isArray(data) ? data : []);
//             } catch (error) {
//                 console.error(
//                     "Error fetching billing records:",
//                     error.response?.data || error
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBillingRecords();
//     }, []);

//     /* =========================
//        SEARCH FILTER
//        ========================= */

//     const filteredRecords = billingRecords.filter((bill) => {
//         const search = searchTerm.toLowerCase();

//         const billId = String(bill.bill_id || "").toLowerCase();

//         const patientId = `P${String(
//             bill.patient_id || ""
//         ).padStart(3, "0")}`.toLowerCase();

//         const paymentStatus = String(
//             bill.payment_status || ""
//         ).toLowerCase();

//         const paymentMethod = String(
//             bill.payment_method || ""
//         ).toLowerCase();

//         return (
//             billId.includes(search) ||
//             patientId.includes(search) ||
//             paymentStatus.includes(search) ||
//             paymentMethod.includes(search)
//         );
//     });

//     /* =========================
//        FORMAT BILL ID
//        ========================= */

//     const formatBillId = (id) => {
//         if (!id) return "-";

//         return `BILL${String(id).padStart(3, "0")}`;
//     };

//     /* =========================
//        FORMAT PATIENT ID
//        ========================= */

//     const formatPatientId = (id) => {
//         if (!id) return "-";

//         return `P${String(id).padStart(3, "0")}`;
//     };

//     /* =========================
//        FORMAT AMOUNT
//        ========================= */

//     const formatAmount = (amount) => {
//         return Number(amount || 0).toFixed(2);
//     };

//     /* =========================
//        FORMAT DATE
//        ========================= */

//     const formatDate = (date) => {
//         if (!date) return "-";

//         return new Date(date).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     /* =========================
//        VIEW BILL
//        ========================= */

//     const handleView = (bill) => {
//         setSelectedBill(bill);
//         setShowModal(true);
//     };

//     /* =========================
//        CLOSE MODAL
//        ========================= */

//     const closeModal = () => {
//         setShowModal(false);
//         setSelectedBill(null);
//     };

//     return (
//         <div className="billing-section">

//             {/* =========================
//                 SEARCH
//                ========================= */}

//             <div className="billing-controls">

//                 <div className="billing-search-container">

//                     <span className="billing-search-icon">
//                         ⌕
//                     </span>

//                     <input
//                         type="text"
//                         placeholder="Search billing records..."
//                         value={searchTerm}
//                         onChange={(e) =>
//                             setSearchTerm(e.target.value)
//                         }
//                     />

//                 </div>

//             </div>


//             {/* =========================
//                 BILLING TABLE
//                ========================= */}

//             {loading ? (

//                 <p>Loading billing records...</p>

//             ) : (

//                 <div className="billing-table-container">

//                     <table>

//                         <thead>

//                             <tr>
//                                 <th>Bill ID</th>
//                                 <th>Patient</th>
//                                 <th>Amount</th>
//                                 <th>Payment</th>
//                                 <th>Method</th>
//                                 <th>Date</th>
//                                 <th>Action</th>
//                             </tr>

//                         </thead>


//                         <tbody>

//                             {filteredRecords.length > 0 ? (

//                                 filteredRecords.map((bill) => (

//                                     <tr key={bill.bill_id}>

//                                         <td>
//                                             {formatBillId(
//                                                 bill.bill_id
//                                             )}
//                                         </td>

//                                         <td>
//                                             {formatPatientId(
//                                                 bill.patient_id
//                                             )}
//                                         </td>

//                                         <td>
//                                             ₹
//                                             {formatAmount(
//                                                 bill.amount
//                                             )}
//                                         </td>

//                                         <td>

//                                             <span
//                                                 className={`billing-status ${String(
//                                                     bill.payment_status || ""
//                                                 ).toLowerCase()}`}
//                                             >
//                                                 {bill.payment_status || "-"}
//                                             </span>

//                                         </td>

//                                         <td>
//                                             {bill.payment_method || "-"}
//                                         </td>

//                                         <td>
//                                             {formatDate(
//                                                 bill.created_at ||
//                                                 bill.bill_date
//                                             )}
//                                         </td>

//                                         <td>

//                                             <button
//                                                 className="billing-action-button"
//                                                 onClick={() =>
//                                                     handleView(bill)
//                                                 }
//                                             >
//                                                 View
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))

//                             ) : (

//                                 <tr>

//                                     <td
//                                         colSpan="7"
//                                         className="no-billing-records"
//                                     >
//                                         No billing records found
//                                     </td>

//                                 </tr>

//                             )}

//                         </tbody>

//                     </table>

//                 </div>

//             )}


//             {/* =================================================
//                 PROFESSIONAL HOSPITAL BILL VIEW MODAL
//                ================================================= */}

//             {showModal && selectedBill && (

//                 <div
//                     className="bill-modal-overlay"
//                     onClick={closeModal}
//                 >

//                     <div
//                         className="bill-modal-content"
//                         onClick={(e) => e.stopPropagation()}
//                     >


//                         {/* =========================
//                             HOSPITAL HEADER
//                            ========================= */}

//                         <div className="hospital-bill-header">

//                             <img
//                                 src={hospitalLogo}
//                                 alt="KIMS CARE Logo"
//                                 className="hospital-bill-logo"
//                             />

//                             <div className="hospital-bill-info">

//                                 <h2>
//                                     KIMS CARE
//                                 </h2>

//                                 <p>
//                                     Clinic Management System
//                                 </p>

//                                 <p>
//                                     Chennai, Tamil Nadu
//                                 </p>

//                                 <p>
//                                     Phone: +91 98765 43210
//                                 </p>

//                             </div>

//                         </div>


//                         {/* =========================
//                             BILL TITLE
//                            ========================= */}

//                         <div className="bill-title-section">

//                             <h3>
//                                 MEDICINE BILL
//                             </h3>

//                         </div>


//                         {/* =========================
//                             BILL INFORMATION
//                            ========================= */}

//                         <div className="bill-information">

//                             <div>

//                                 <p>
//                                     <strong>
//                                         Bill ID:
//                                     </strong>{" "}
//                                     {formatBillId(
//                                         selectedBill.bill_id
//                                     )}
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Patient ID:
//                                     </strong>{" "}
//                                     {formatPatientId(
//                                         selectedBill.patient_id
//                                     )}
//                                 </p>

//                             </div>


//                             <div>

//                                 <p>
//                                     <strong>
//                                         Date:
//                                     </strong>{" "}
//                                     {formatDate(
//                                         selectedBill.created_at ||
//                                         selectedBill.bill_date
//                                     )}
//                                 </p>

//                                 <p>
//                                     <strong>
//                                         Payment Status:
//                                     </strong>{" "}
//                                     {selectedBill.payment_status || "-"}
//                                 </p>

//                             </div>

//                         </div>


//                         {/* =========================
//                             DIVIDER
//                            ========================= */}

//                         <div className="bill-divider"></div>


//                         {/* =========================
//                             BILL TABLE
//                            ========================= */}

//                         <table className="hospital-bill-table">

//                             <thead>

//                                 <tr>

//                                     <th>
//                                         Description
//                                     </th>

//                                     <th>
//                                         Amount
//                                     </th>

//                                 </tr>

//                             </thead>


//                             <tbody>

//                                 <tr>

//                                     <td>
//                                         {selectedBill.description ||
//                                             selectedBill.notes ||
//                                             "Medicine Charges"}
//                                     </td>

//                                     <td>
//                                         ₹
//                                         {formatAmount(
//                                             selectedBill.amount
//                                         )}
//                                     </td>

//                                 </tr>

//                             </tbody>

//                         </table>


//                         {/* =========================
//                             TOTAL
//                            ========================= */}

//                         <div className="bill-total-section">

//                             <span>
//                                 Total Amount
//                             </span>

//                             <strong>
//                                 ₹
//                                 {formatAmount(
//                                     selectedBill.amount
//                                 )}
//                             </strong>

//                         </div>


//                         {/* =========================
//                             PAYMENT DETAILS
//                            ========================= */}

//                         <div className="bill-payment-details">

//                             <p>
//                                 <strong>
//                                     Payment Method:
//                                 </strong>{" "}
//                                 {selectedBill.payment_method || "-"}
//                             </p>

//                             <p>
//                                 <strong>
//                                     Payment Status:
//                                 </strong>{" "}
//                                 {selectedBill.payment_status || "-"}
//                             </p>

//                         </div>


//                         {/* =========================
//                             BILL FOOTER
//                            ========================= */}

//                         <div className="hospital-bill-footer">

//                             <p>
//                                 Thank you for choosing KIMS CARE.
//                             </p>

//                             <span>
//                                 This is a computer-generated bill.
//                             </span>

//                         </div>


//                         {/* =========================
//                             BUTTONS
//                            ========================= */}

//                         <div className="bill-modal-footer">

//                             <button
//                                 className="bill-modal-btn-close"
//                                 onClick={closeModal}
//                             >
//                                 Close
//                             </button>

//                             <button
//                                 className="bill-modal-btn-print"
//                                 onClick={() => window.print()}
//                             >
//                                 Print Bill
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>
//     );
// }

// export default BillingRecords;


import { useEffect, useState } from "react";
import "./BillingRecords.css";
import { getBills } from "../../services/billService";
import { getMedicinesByConsultation } from "../../services/prescribedMedicineService";
import hospitalLogo from "../../assets/hospital_logo.png";

function BillingRecords() {
    const [searchTerm, setSearchTerm] = useState("");
    const [billingRecords, setBillingRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // View modal
    const [selectedBill, setSelectedBill] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Medicines for selected bill
    const [billMedicines, setBillMedicines] = useState([]);
    const [medicineLoading, setMedicineLoading] = useState(false);

    /* =========================
       FETCH BILLING RECORDS
       ========================= */

    useEffect(() => {
        const fetchBillingRecords = async () => {
            try {
                const data = await getBills();

                console.log("BILLING RECORDS:", data);

                setBillingRecords(
                    Array.isArray(data) ? data : []
                );
            } catch (error) {
                console.error(
                    "Error fetching billing records:",
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBillingRecords();
    }, []);

    /* =========================
       SEARCH FILTER
       ========================= */

    const filteredRecords = billingRecords.filter((bill) => {
        const search = searchTerm.toLowerCase();

        const billId = String(
            bill.bill_id || ""
        ).toLowerCase();

        const patientId = `P${String(
            bill.patient_id || ""
        ).padStart(3, "0")}`.toLowerCase();

        const paymentStatus = String(
            bill.payment_status || ""
        ).toLowerCase();

        const paymentMethod = String(
            bill.payment_method || ""
        ).toLowerCase();

        return (
            billId.includes(search) ||
            patientId.includes(search) ||
            paymentStatus.includes(search) ||
            paymentMethod.includes(search)
        );
    });

    /* =========================
       FORMAT BILL ID
       ========================= */

    const formatBillId = (id) => {
        if (!id) return "-";

        return `BILL${String(id).padStart(3, "0")}`;
    };

    /* =========================
       FORMAT PATIENT ID
       ========================= */

    const formatPatientId = (id) => {
        if (!id) return "-";

        return `P${String(id).padStart(3, "0")}`;
    };

    /* =========================
       FORMAT AMOUNT
       ========================= */

    const formatAmount = (amount) => {
        return Number(amount || 0).toFixed(2);
    };

    /* =========================
       FORMAT DATE
       ========================= */

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    /* =========================
       VIEW BILL
       ========================= */

    const handleView = async (bill) => {
        setSelectedBill(bill);
        setShowModal(true);

        // Clear old medicines
        setBillMedicines([]);

        // Start medicine loading
        setMedicineLoading(true);

        try {
            if (!bill.consultation_id) {
                console.warn(
                    "No consultation_id found for bill:",
                    bill
                );

                return;
            }

            const medicines =
                await getMedicinesByConsultation(
                    bill.consultation_id
                );

            console.log(
                "MEDICINES FOR BILL:",
                medicines
            );

            setBillMedicines(
                Array.isArray(medicines)
                    ? medicines
                    : []
            );
        } catch (error) {
            console.error(
                "Error fetching bill medicines:",
                error.response?.data || error
            );

            setBillMedicines([]);
        } finally {
            setMedicineLoading(false);
        }
    };

    /* =========================
       CLOSE MODAL
       ========================= */

    const closeModal = () => {
        setShowModal(false);
        setSelectedBill(null);
        setBillMedicines([]);
    };

    return (
        <div className="billing-section">

            {/* =========================
                SEARCH
               ========================= */}

            <div className="billing-controls">

                <div className="billing-search-container">

                    <span className="billing-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search billing records..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* =========================
                BILLING TABLE
               ========================= */}

            {loading ? (

                <p>Loading billing records...</p>

            ) : (

                <div className="billing-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Bill ID</th>
                                <th>Patient</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Method</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredRecords.length > 0 ? (

                                filteredRecords.map((bill) => (

                                    <tr key={bill.bill_id}>

                                        <td>
                                            {formatBillId(
                                                bill.bill_id
                                            )}
                                        </td>

                                        <td>
                                            {formatPatientId(
                                                bill.patient_id
                                            )}
                                        </td>

                                        <td>
                                            ₹
                                            {formatAmount(
                                                bill.amount
                                            )}
                                        </td>

                                        <td>

                                            <span
                                                className={`billing-status ${String(
                                                    bill.payment_status || ""
                                                ).toLowerCase()}`}
                                            >
                                                {bill.payment_status || "-"}
                                            </span>

                                        </td>

                                        <td>
                                            {bill.payment_method || "-"}
                                        </td>

                                        <td>
                                            {formatDate(
                                                bill.created_at ||
                                                bill.bill_date
                                            )}
                                        </td>

                                        <td>

                                            <button
                                                className="billing-action-button"
                                                onClick={() =>
                                                    handleView(bill)
                                                }
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-billing-records"
                                    >
                                        No billing records found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* =================================================
                PROFESSIONAL HOSPITAL BILL
               ================================================= */}

            {showModal && selectedBill && (

                <div
                    className="bill-modal-overlay"
                    onClick={closeModal}
                >

                    <div
                        className="bill-modal-content"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* =========================
                            HOSPITAL HEADER
                           ========================= */}

                        <div className="hospital-bill-header">

                            <img
                                src={hospitalLogo}
                                alt="KIMS CARE Logo"
                                className="hospital-bill-logo"
                            />

                            <div className="hospital-bill-info">

                                <h2>
                                    KIMS 
                                </h2>

                                <p>
                                    Clinic Management System
                                </p>

                                <p>
                                    Chennai, Tamil Nadu
                                </p>

                                <p>
                                    Phone: +91 98765 43210
                                </p>

                            </div>

                        </div>


                        {/* =========================
                            BILL TITLE
                           ========================= */}

                        <div className="bill-title-section">

                            <h3>
                                MEDICINE BILL
                            </h3>

                        </div>


                        {/* =========================
                            BILL INFORMATION
                           ========================= */}

                        <div className="bill-information">

                            <div>

                                <p>
                                    <strong>
                                        Bill ID:
                                    </strong>{" "}
                                    {formatBillId(
                                        selectedBill.bill_id
                                    )}
                                </p>

                                <p>
                                    <strong>
                                        Patient ID:
                                    </strong>{" "}
                                    {formatPatientId(
                                        selectedBill.patient_id
                                    )}
                                </p>

                            </div>

                            <div>

                                <p>
                                    <strong>
                                        Consultation ID:
                                    </strong>{" "}
                                    {selectedBill.consultation_id ||
                                        "-"}
                                </p>

                                <p>
                                    <strong>
                                        Date:
                                    </strong>{" "}
                                    {formatDate(
                                        selectedBill.created_at ||
                                        selectedBill.bill_date
                                    )}
                                </p>

                            </div>

                        </div>


                        <div className="bill-divider"></div>


                        {/* =================================================
                            MEDICINE DETAILS
                           ================================================= */}

                        <div className="bill-medicine-section">

                            <h4>
                                Medicine Details
                            </h4>


                            {medicineLoading ? (

                                <div className="bill-medicine-loading">
                                    Loading medicine details...
                                </div>

                            ) : billMedicines.length > 0 ? (

                                <table className="hospital-bill-table">

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

                                            <th>
                                                Price
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {billMedicines.map(
                                            (medicine, index) => (

                                                <tr
                                                    key={
                                                        medicine.prescription_id ||
                                                        medicine.medicine_id ||
                                                        index
                                                    }
                                                >

                                                    <td>

                                                        <strong>
                                                            {medicine.medicine_name ||
                                                                "-"}
                                                        </strong>

                                                        <small>
                                                            {medicine.medicine_id
                                                                ? ` (${medicine.medicine_id})`
                                                                : ""}
                                                        </small>

                                                    </td>

                                                    <td>
                                                        {medicine.dosage ||
                                                            "-"}
                                                    </td>

                                                    <td>

                                                        {[
                                                            medicine.morning &&
                                                                "Morning",

                                                            medicine.afternoon &&
                                                                "Afternoon",

                                                            medicine.night &&
                                                                "Night",
                                                        ]
                                                            .filter(Boolean)
                                                            .join(", ") ||
                                                            "-"}

                                                    </td>

                                                    <td>
                                                        {medicine.duration ||
                                                            "-"}
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {formatAmount(
                                                            medicine.price
                                                        )}
                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            ) : (

                                <div className="bill-no-medicines">
                                    No medicine details found for
                                    this bill.
                                </div>

                            )}

                        </div>


                        {/* =========================
                            TOTAL
                           ========================= */}

                        <div className="bill-total-section">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹
                                {formatAmount(
                                    selectedBill.amount
                                )}
                            </strong>

                        </div>


                        {/* =========================
                            PAYMENT DETAILS
                           ========================= */}

                        <div className="bill-payment-details">

                            <p>
                                <strong>
                                    Payment Method:
                                </strong>{" "}
                                {selectedBill.payment_method ||
                                    "-"}
                            </p>

                            <p>
                                <strong>
                                    Payment Status:
                                </strong>{" "}
                                {selectedBill.payment_status ||
                                    "-"}
                            </p>

                        </div>


                        {/* =========================
                            FOOTER
                           ========================= */}

                        <div className="hospital-bill-footer">

                            <p>
                                Thank you for choosing KIMS CARE.
                            </p>

                            <span>
                                This is a computer-generated bill.
                            </span>

                        </div>


                        {/* =========================
                            BUTTONS
                           ========================= */}

                        <div className="bill-modal-footer">

                            <button
                                className="bill-modal-btn-close"
                                onClick={closeModal}
                            >
                                Close
                            </button>

                            <button
                                className="bill-modal-btn-print"
                                onClick={() =>
                                    window.print()
                                }
                            >
                                Print Bill
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default BillingRecords;