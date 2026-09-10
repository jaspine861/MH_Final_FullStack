// import BillingList from "../../components/receptionist/BillingList";
import BillingManagement from "../../components/receptionist/BillingManagement";
function ReceptionistBilling() {
    return (
        <>
            <h1>Billing</h1>
            <BillingManagement />
        </>
    );
}

export default ReceptionistBilling;
// import { useEffect, useState } from "react";

// function ReceptionistBilling() {
//   const [bills, setBills] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All"); // All, Paid, Unpaid
//   const [selectedBill, setSelectedBill] = useState(null);
//   const [showBill, setShowBill] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [paymentStep, setPaymentStep] = useState("view"); // view, method

//   useEffect(() => { fetchBills(); }, []);

//   const fetchBills = () => {
//     const allBills = JSON.parse(localStorage.getItem("kims_bills") || "[]");
//     // Dummy for demo if empty
//     if (allBills.length === 0) {
//       const dummy = [
//         { billing_id: "BILL834", appointment_id: "APT834", patient_id: "P2724", patient_name: "fgfgbed", patient_age: 34, patient_gender: "Male", patient_phone: "7890998789", doctor_name: "sdvdb", department: "Neurology", billing_date: "2026-09-03", billing_time: "3:29:43 PM", appointment_date: "2026-09-03", slot: "10:00 AM - 11:00 AM", type: "Walk-in", consult_fee: 500, reg_fee: 0, amount: 500, isFirstTime: false, status: "Paid", payment_method: "Cash" },
//         { billing_id: "BILL050", appointment_id: "APT050", patient_id: "P2724", patient_name: "fgfgbed", patient_age: 34, patient_gender: "Male", patient_phone: "7890998789", doctor_name: "sdvdb", department: "Neurology", billing_date: "2026-09-03", billing_time: "3:29:43 PM", appointment_date: "2026-09-03", slot: "10:00 AM - 11:00 AM", type: "Walk-in", consult_fee: 500, reg_fee: 0, amount: 500, isFirstTime: false, status: "Paid", payment_method: "Cash" },
//       ];
//       setBills(dummy);
//     } else {
//       setBills(allBills.reverse());
//     }
//   };

//   const handleViewBill = (bill) => {
//     setSelectedBill(bill);
//     setPaymentStep(bill.status === "Paid" ? "view" : "bill");
//     setShowBill(true);
//   };

//   const handlePayNow = () => setPaymentStep("method");

//   const handleConfirmPayment = () => {
//     if (!paymentMethod) { alert("Select Payment Method"); return; }
//     const all = JSON.parse(localStorage.getItem("kims_bills") || "[]");
//     const updated = all.map(b => b.billing_id === selectedBill.billing_id ? { ...b, status: "Paid", payment_method: paymentMethod } : b);
//     localStorage.setItem("kims_bills", JSON.stringify(updated));
//     setSelectedBill({ ...selectedBill, status: "Paid", payment_method: paymentMethod });
//     setPaymentStep("view");
//     fetchBills();
//   };

//   const handlePrint = () => {
//     const html = document.getElementById("kims-bill-print").innerHTML;
//     const w = window.open('', '_blank', 'width=800,height=900');
//     w.document.write(`<html><head><title>${selectedBill.billing_id}</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px} *{box-sizing:border-box} @media print{body{padding:0}}</style></head><body>${html}</body></html>`);
//     w.document.close(); w.focus(); setTimeout(() => { w.print(); w.close(); }, 400);
//   };

//   let filtered = bills;
//   if (filter !== "All") filtered = filtered.filter(b => b.status === filter);
//   if (search.trim()) {
//     const s = search.toLowerCase();
//     filtered = filtered.filter(b => 
//       (b.patient_name || "").toLowerCase().includes(s) ||
//       (b.billing_id || "").toLowerCase().includes(s) ||
//       (b.patient_id || "").toLowerCase().includes(s)
//     );
//   }

//   return (
//     <div style={{ padding: "25px" }}>
//       <h2 style={{ fontSize: "28px", fontFamily: "serif", fontWeight: "700", margin: "0 0 20px 0" }}>Billing</h2>

//       <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #eee" }}>
//         <input placeholder="Search by Patient Name or Bill ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: "1", minWidth: "240px", padding: "11px 16px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
//         <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "11px 16px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px", minWidth: "140px" }}>
//           <option value="All">All Bills</option>
//           <option value="Paid">Paid</option>
//           <option value="Pending">Unpaid</option>
//         </select>
//         <button onClick={() => { setSearch(""); setFilter("All"); }} style={{ padding: "11px 18px", borderRadius: "10px", border: "1px solid #ddd", background: "#f8f9fa", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>Clear</button>
//       </div>

//       <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead><tr style={{ background: "#fafafa", borderBottom: "1.5px solid #eee" }}>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Bill ID</th>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Patient</th>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Doctor</th>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Date</th>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Amount</th>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Status</th>
//             <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Action</th>
//           </tr></thead>
//           <tbody>
//             {filtered.length === 0 ? <tr><td colSpan="7" style={{ padding: "40px", textAlign: "center", color: "#999" }}>No bills found</td></tr> :
//               filtered.map(b => (
//                 <tr key={b.billing_id} style={{ borderBottom: "1px solid #f5f5f5" }}>
//                   <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: "700" }}>{b.billing_id}</td>
//                   <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: "600" }}>{b.patient_name} <span style={{ color: "#888", fontWeight: "400" }}>({b.patient_id})</span></td>
//                   <td style={{ padding: "16px 20px", fontSize: "13px" }}>{b.doctor_name} <span style={{ color: "#888", fontSize: "11px" }}>({b.department})</span></td>
//                   <td style={{ padding: "16px 20px", fontSize: "13px" }}>{b.billing_date}</td>
//                   <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: "700" }}>₹{b.amount}</td>
//                   <td style={{ padding: "16px 20px" }}>{b.status === "Paid" ? <span style={{ background: "#e8f5e9", color: "#2e7d32", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>Paid</span> : <span style={{ background: "#fff3e0", color: "#ef6c00", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>Unpaid</span>}</td>
//                   <td style={{ padding: "16px 20px" }}><button onClick={() => handleViewBill(b)} style={{ background: "white", color: "#8b1a1a", border: "1.5px solid #8b1a1a", padding: "6px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "12px" }}>View</button></td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* SAME PROFESSIONAL BILL MODAL AS SCREENSHOT */}
//       {showBill && selectedBill && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", justifyContent: "center", alignItems: "flex-start", zIndex: 1100, overflowY: "auto", padding: "20px 0" }}>
//           <div style={{ background: "white", width: "95%", maxWidth: paymentStep === "method" ? "480px" : "740px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}>

//             {paymentStep === "bill" && (
//               <div id="kims-bill-print">
//                 <div style={{ background: "linear-gradient(135deg, #7a0f0f 0%, #a31e1e 100%)", color: "white", padding: "22px 28px", display: "flex", justifyContent: "space-between" }}>
//                   <div>
//                     <div style={{ fontSize: "26px", fontWeight: "900", fontFamily: "serif" }}>KIMS HEALTH</div>
//                     <div style={{ fontSize: "11px", opacity: "0.9" }}>Anayara P.O, Trivandrum • NABH & ISO Certified</div>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <div style={{ background: "#ffb300", color: "#000", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800" }}>UNPAID</div>
//                     <div style={{ marginTop: "8px", fontSize: "12px" }}><b>{selectedBill.billing_id}</b><br />{selectedBill.billing_date} • {selectedBill.billing_time}</div>
//                   </div>
//                 </div>
//                 <div style={{ padding: "22px 28px", textAlign: "center", borderBottom: "1px solid #eee" }}>
//                   <h3 style={{ fontFamily: "serif", margin: "0 0 8px 0" }}>Outpatient Invoice - Payment Due</h3>
//                   <div style={{ fontSize: "13px" }}>Amount: <b style={{ fontSize: "18px", color: "#7a0f0f" }}>₹{selectedBill.amount}.00</b></div>
//                 </div>
//                 <div style={{ padding: "0 28px 22px 28px", display: "flex", gap: "12px", marginTop: "20px" }}>
//                   <button onClick={() => setShowBill(false)} style={{ flex: 1, padding: "14px", border: "1.5px solid #a31e1e", color: "#a31e1a", background: "white", borderRadius: "10px", fontWeight: "700" }}>Close</button>
//                   <button onClick={handlePayNow} style={{ flex: 1.6, padding: "14px", background: "#a31e1e", color: "white", border: "none", borderRadius: "10px", fontWeight: "800" }}>Pay Now - ₹{selectedBill.amount} →</button>
//                 </div>
//               </div>
//             )}

//             {paymentStep === "method" && (
//               <div style={{ padding: "28px" }}>
//                 <h2 style={{ textAlign: "center", fontFamily: "serif" }}>Payment - ₹{selectedBill.amount}</h2>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
//                   {[{ id: "Cash", label: "💵 Cash" }, { id: "UPI", label: "📱 UPI / GPay" }, { id: "Card", label: "💳 Card" }].map(m => (
//                     <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ border: `2px solid ${paymentMethod === m.id ? "#a31e1e" : "#ddd"}`, borderRadius: "12px", padding: "14px", cursor: "pointer", background: paymentMethod === m.id ? "#fef2f2" : "white", fontWeight: "700" }}>{m.label}</div>
//                   ))}
//                 </div>
//                 <div style={{ display: "flex", gap: "12px" }}>
//                   <button onClick={() => setPaymentStep("bill")} style={{ flex: 1, padding: "13px", border: "1px solid #ccc", background: "white", borderRadius: "10px" }}>Back</button>
//                   <button onClick={handleConfirmPayment} style={{ flex: 2, padding: "13px", background: paymentMethod ? "#a31e1e" : "#ccc", color: "white", border: "none", borderRadius: "10px", fontWeight: "800" }}>Pay ₹{selectedBill.amount}</button>
//                 </div>
//               </div>
//             )}

//             {paymentStep === "view" && (
//               <div>
//                 <div id="kims-bill-print">
//                   {/* Header - Exactly like your screenshot */}
//                   <div style={{ background: "linear-gradient(135deg, #7a0f0f 0%, #a31e1e 100%)", color: "white", padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <div>
//                       <div style={{ fontSize: "26px", fontWeight: "900", fontFamily: "serif", letterSpacing: "0.5px" }}>KIMS HEALTH</div>
//                       <div style={{ fontSize: "11px", opacity: "0.9", marginTop: "2px" }}>Anayara P.O, Trivandrum • NABH & ISO Certified</div>
//                     </div>
//                     <div style={{ textAlign: "right" }}>
//                       <div style={{ background: "#22c55e", color: "white", padding: "7px 16px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", display: "inline-block" }}>✓ PAID</div>
//                       <div style={{ fontSize: "13px", fontWeight: "700", marginTop: "8px" }}>{selectedBill.billing_id}</div>
//                       <div style={{ fontSize: "11px", opacity: "0.85" }}>{selectedBill.billing_date} • {selectedBill.billing_time}</div>
//                     </div>
//                   </div>

//                   {/* Payment Successful Center - like screenshot */}
//                   <div style={{ background: "#f0fdf4", padding: "22px 28px", textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>
//                     <div style={{ width: "52px", height: "52px", background: "#22c55e", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px auto", fontSize: "28px", fontWeight: "800" }}>✓</div>
//                     <div style={{ fontSize: "20px", fontWeight: "800", color: "#15803d", fontFamily: "serif" }}>Payment Successful</div>
//                     <div style={{ fontSize: "13px", color: "#444", marginTop: "4px" }}>Paid via {selectedBill.payment_method} • ₹{selectedBill.amount}.00 • Transaction completed</div>
//                   </div>

//                   {/* Billed To & Consultant - Same as screenshot */}
//                   <div style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px" }}>
//                     <div style={{ fontSize: "13px", lineHeight: "1.6" }}>
//                       <div style={{ fontSize: "10px", fontWeight: "800", color: "#a31e1e", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>BILLED TO</div>
//                       <div style={{ fontWeight: "800", fontSize: "15px", color: "#111" }}>{selectedBill.patient_name} ({selectedBill.patient_id})</div>
//                       <div style={{ fontSize: "13px", color: "#444", marginTop: "2px" }}>{selectedBill.patient_age}Y • {selectedBill.patient_gender} • {selectedBill.patient_phone}</div>
//                       <div style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>Appointment: {selectedBill.appointment_date} • {selectedBill.slot}</div>
//                     </div>
//                     <div style={{ fontSize: "13px", lineHeight: "1.6", textAlign: "right" }}>
//                       <div style={{ fontSize: "10px", fontWeight: "800", color: "#a31e1e", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "6px" }}>CONSULTANT</div>
//                       <div style={{ fontWeight: "800", fontSize: "14px" }}>{selectedBill.doctor_name}</div>
//                       <div style={{ fontSize: "12px", color: "#555" }}>{selectedBill.department}</div>
//                       <div style={{ fontSize: "12px", color: "#22c55e", fontWeight: "700", marginTop: "6px" }}>✓ PAID - {selectedBill.payment_method}</div>
//                     </div>
//                   </div>

//                   {/* Service Table - Same as screenshot */}
//                   <div style={{ padding: "0 28px 18px 28px" }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: "800", color: "#666", textTransform: "uppercase", padding: "10px 0", borderBottom: "1px solid #eee" }}>
//                       <span>Service</span><span>Amount</span>
//                     </div>
//                     <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
//                       <span>Consultation Fee ({selectedBill.type})</span><span style={{ fontWeight: "600" }}>₹{selectedBill.consult_fee}</span>
//                     </div>
//                     {selectedBill.isFirstTime && selectedBill.reg_fee > 0 && (
//                       <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f5f5f5", fontSize: "13px" }}>
//                         <span>Registration Fee</span><span style={{ fontWeight: "600" }}>₹{selectedBill.reg_fee}</span>
//                       </div>
//                     )}
//                     <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", fontWeight: "800", fontSize: "14px", borderTop: "1.5px solid #222", marginTop: "8px" }}>
//                       <span>Total Paid</span><span style={{ color: "#7a0f0f" }}>₹{selectedBill.amount}.00</span>
//                     </div>

//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "28px" }}>
//                       <div style={{ fontSize: "10px", color: "#888", lineHeight: "1.5" }}>This is a computer generated invoice.<br />No signature required.<br />Thank you for choosing KIMS Health.</div>
//                       <div style={{ fontSize: "10px", color: "#555", borderTop: "1px solid #222", paddingTop: "6px", width: "120px", textAlign: "center", marginTop: "20px" }}>Authorized Signatory</div>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ padding: "0 28px 24px 28px", display: "flex", gap: "12px", background: "white" }}>
//                   <button onClick={handlePrint} style={{ flex: 1, padding: "14px", border: "1.5px solid #a31e1e", color: "#a31e1e", background: "white", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>🖨️ Print Bill</button>
//                   <button onClick={() => setShowBill(false)} style={{ flex: 1, padding: "14px", background: "#a31e1e", color: "white", border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer" }}>Done ✓</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReceptionistBilling;