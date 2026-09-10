import PatientList from "../../components/receptionist/PatientList";
function ReceptionistPatientList() {
    return <>    <h1>Patients</h1> <PatientList /></>;
}

export default ReceptionistPatientList;
// import { useEffect, useState } from "react";
// import { getPatients } from "../../services/patientService";
// import { addAppointment } from "../../services/appointmentService";
// import axios from "axios";

// function ReceptionistPatientList() {
//   const [patients, setPatients] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showDetail, setShowDetail] = useState(false);
//   const [showBook, setShowBook] = useState(false);
//   const [showBill, setShowBill] = useState(false);
//   const [showDoctorList, setShowDoctorList] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [selectedDoctorObj, setSelectedDoctorObj] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [form, setForm] = useState({ doctor_id: "", doctor_name: "", department: "", date: "", type: "Walk-in", slot: "", reason: "" });
//   const [currentBill, setCurrentBill] = useState(null);
//   const [paymentStep, setPaymentStep] = useState("bill");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [showAddPatient, setShowAddPatient] = useState(false);
//   const [addForm, setAddForm] = useState({ full_name: "", age: "", dob: "", gender: "", blood_group: "", phone: "", email: "", address: "", emergency_contact: "", allergies: "" });
//   const [addErrors, setAddErrors] = useState({});
//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => { fetchPatients(); fetchDoctors(); }, []);
//   const fetchPatients = async () => {
//     try { const data = await getPatients(); let backend = Array.isArray(data)? data : data.results || data.data || []; const local = JSON.parse(localStorage.getItem("kims_patients") || "[]"); setPatients([...local,...backend]); }
//     catch { setPatients(JSON.parse(localStorage.getItem("kims_patients") || "[]")); }
//   };
//   const fetchDoctors = async () => {
//     try { const res = await axios.get("http://127.0.0.1:8000/api/v1/doctors/"); setDoctors(Array.isArray(res.data)? res.data : res.data.results || []); }
//     catch { setDoctors([{ id: "DOC001", name: "Dr. Jack", department: "Cardiology" }, { id: "DOC002", name: "Dr. Smith", department: "Neurology" }, { id: "DOC003", name: "Dr. Priya", department: "Orthopedics" }]); }
//   };

//   const calculateAge = (dobString) => {
//     if (!dobString) return "";
//     const birthDate = new Date(dobString); const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
//     return age >= 0 && age <= 100? age : "";
//   };
//   const handleDobChange = (dobValue) => { const age = calculateAge(dobValue); setAddForm({...addForm, dob: dobValue, age: age }); };
  
//   // ===== VALIDATION FIXED ONLY HERE =====
//   const validateAddPatient = () => {
//     let err = {};
//     if (!addForm.full_name.trim() || !/^[A-Za-z ]{3,50}$/.test(addForm.full_name.trim())) err.full_name = "Only letters, min 3 chars";
//     if (!addForm.dob) err.dob = "DOB required";
//     if (!addForm.age || addForm.age < 1 || addForm.age > 100) err.age = "Valid DOB required";
//     if (!addForm.gender) err.gender = "Select gender";
//     if (!/^[6-9][0-9]{9}$/.test(addForm.phone)) err.phone = "10 digits required";
//     if (!addForm.address.trim()) err.address = "Address required";
//     if (addForm.emergency_contact && !/^[6-9][0-9]{9}$/.test(addForm.emergency_contact)) err.emergency_contact = "Only 10 digit number";
//     setAddErrors(err); return Object.keys(err).length === 0;
//   };
  
//   const savePatientToStorage = () => {
//     if (!validateAddPatient()) return null;
//     let localPatients = JSON.parse(localStorage.getItem("kims_patients") || "[]"); let savedPatient;
//     if (isEditMode) { localPatients = localPatients.map(p => p.id === selectedPatient.id? {...p,...addForm, age: parseInt(addForm.age), full_name: addForm.full_name, name: addForm.full_name, phone: addForm.phone, phone_number: addForm.phone } : p); savedPatient = localPatients.find(p => p.id === selectedPatient.id); }
//     else { savedPatient = { id: Date.now(), patient_id: `P${String(Date.now()).slice(-4)}`, full_name: addForm.full_name, name: addForm.full_name, age: parseInt(addForm.age), dob: addForm.dob, gender: addForm.gender, blood_group: addForm.blood_group || "O+", phone: addForm.phone, phone_number: addForm.phone, email: addForm.email || "", address: addForm.address, emergency_contact: addForm.emergency_contact || "", allergies: addForm.allergies || "None", registered_date: new Date().toLocaleDateString("en-GB"), status: "Active" }; localPatients.push(savedPatient); }
//     localStorage.setItem("kims_patients", JSON.stringify(localPatients)); fetchPatients(); return savedPatient;
//   };
//   const handleAddPatientSave = () => { const saved = savePatientToStorage(); if (!saved) return; setShowAddPatient(false); setIsEditMode(false); setAddForm({ full_name: "", age: "", dob: "", gender: "", blood_group: "", phone: "", email: "", address: "", emergency_contact: "", allergies: "" }); };
//   const handleSaveAndBookAppointment = () => { const saved = savePatientToStorage(); if (!saved) return; setSelectedPatient(saved); setShowAddPatient(false); setIsEditMode(false); setAddForm({ full_name: "", age: "", dob: "", gender: "", blood_group: "", phone: "", email: "", address: "", emergency_contact: "", allergies: "" }); setSelectedDoctorObj(null); setForm({ doctor_id: "", doctor_name: "", department: "", date: "", type: "Walk-in", slot: "", reason: "" }); setShowBook(true); };
//   const openDetailView = (p) => { setSelectedPatient(p); setShowDetail(true); };
//   const handleEdit = () => { setAddForm({ full_name: selectedPatient.name || selectedPatient.full_name || "", age: selectedPatient.age || "", dob: selectedPatient.dob || "", gender: selectedPatient.gender || "", blood_group: selectedPatient.blood_group || "", phone: selectedPatient.phone || selectedPatient.phone_number || "", email: selectedPatient.email || "", address: selectedPatient.address || "", emergency_contact: selectedPatient.emergency_contact || "", allergies: selectedPatient.allergies || "" }); setIsEditMode(true); setShowDetail(false); setShowAddPatient(true); };
//   const openBookModal = () => { setSelectedDoctorObj(null); setForm({ doctor_id: "", doctor_name: "", department: "", date: "", type: "Walk-in", slot: "", reason: "" }); setShowDetail(false); setShowBook(true); };
//   const selectDoctor = (doc) => { setSelectedDoctorObj(doc); setForm({...form, doctor_id: doc.id, doctor_name: doc.name, department: doc.department }); setShowDoctorList(false); };
//   const handleBookAppointment = async () => {
//     if (!form.doctor_id) { alert("Select Doctor"); return; } if (!form.date) { alert("Select Date"); return; } if (!form.slot) { alert("Select Time Slot"); return; }
//     const today = new Date(); today.setHours(0, 0, 0, 0); const selDate = new Date(form.date); selDate.setHours(0, 0, 0, 0); const diffDays = Math.ceil((selDate - today) / (1000 * 60 * 60 * 24));
//     if (form.type === "Walk-in" && diffDays!== 0) { alert("❌ Walk-in only for TODAY"); return; } if (form.type === "Prior Booking" && diffDays < 2) { alert(`❌ Prior Booking at least 2 days before.`); return; }
//     const appointment = { id: Date.now(), appointment_id: `APT${Date.now().toString().slice(-3)}`, patient_id: selectedPatient.id, patient_name: selectedPatient.name || selectedPatient.full_name, doctor_id: selectedDoctorObj?.id || form.doctor_id, doctor_name: selectedDoctorObj?.name || form.doctor_name, department: selectedDoctorObj?.department || form.department, appointment_date: form.date, type: form.type, slot: form.slot, reason: form.reason, status: "Pending" };
//     try { const res = await addAppointment(appointment); appointment.id = res.id || appointment.id; } catch { }
//     const allBills = JSON.parse(localStorage.getItem("kims_bills") || "[]"); const isFirst =!allBills.some(b => b.patient_id === selectedPatient.patient_id); const CONSULT = 500, REG = 200; const amount = isFirst? CONSULT + REG : CONSULT;
//     const bill = { id: appointment.id, billing_id: `BILL${String(appointment.id).slice(-3)}`, appointment_id: appointment.appointment_id, patient_id: selectedPatient.patient_id || `P${String(selectedPatient.id).padStart(3, "0")}`, patient_name: selectedPatient.name || selectedPatient.full_name, patient_age: selectedPatient.age, patient_gender: selectedPatient.gender, patient_phone: selectedPatient.phone || selectedPatient.phone_number || "—", doctor_id: selectedDoctorObj?.id || form.doctor_id, doctor_name: selectedDoctorObj?.name || form.doctor_name, department: selectedDoctorObj?.department || form.department, isFirstTime: isFirst, reg_fee: isFirst? REG : 0, consult_fee: CONSULT, amount, billing_date: form.date, billing_time: new Date().toLocaleTimeString(), appointment_date: form.date, type: form.type, slot: form.slot, status: "Pending" };
//     const bills = JSON.parse(localStorage.getItem("kims_bills") || "[]"); bills.push(bill); localStorage.setItem("kims_bills", JSON.stringify(bills));
//     const apps = JSON.parse(localStorage.getItem("kims_appointments") || "[]"); apps.push(bill); localStorage.setItem("kims_appointments", JSON.stringify(apps));
//     setCurrentBill(bill); setPaymentStep("bill"); setShowBook(false); setShowBill(true);
//   };
//   const handlePayNowClick = () => setPaymentStep("method");
//   const handleConfirmPayment = () => { if (!paymentMethod) { alert("Select Payment Method"); return; } const bills = JSON.parse(localStorage.getItem("kims_bills") || "[]"); localStorage.setItem("kims_bills", JSON.stringify(bills.map(b => b.billing_id === currentBill.billing_id? {...b, status: "Paid", payment_method: paymentMethod } : b))); setCurrentBill({...currentBill, status: "Paid", payment_method: paymentMethod }); setPaymentStep("success"); };
//   const handlePrint = () => { const html = document.getElementById("kims-bill-print").innerHTML; const w = window.open('', '_blank', 'width=800,height=900'); w.document.write(`<html><head><title>${currentBill.billing_id}</title><style>body{font-family:Arial,sans-serif;margin:0;padding:20px} *{box-sizing:border-box} @media print{body{padding:0}}</style></head><body>${html}</body></html>`); w.document.close(); w.focus(); setTimeout(() => { w.print(); w.close(); }, 400); };
//   const filtered = patients.filter(p => (p.name || p.full_name || "").toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div>
//       <div style={{ padding: "20px 25px 0 25px" }}>
//         <h2 style={{ fontSize: "32px", fontFamily: "serif", fontWeight: "700", marginBottom: "20px" }}>Patients</h2>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//           <button onClick={() => { setIsEditMode(false); setAddForm({ full_name: "", age: "", dob: "", gender: "", blood_group: "", phone: "", email: "", address: "", emergency_contact: "", allergies: "" }); setAddErrors({}); setShowAddPatient(true); }} style={{ background: "white", color: "#8b1a1a", border: "1.5px solid #8b1a1a", padding: "7px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>+ Add Patient</button>
//           <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "9px 15px", borderRadius: "8px", border: "1px solid #ddd", minWidth: "260px" }} />
//         </div>
//       </div>
//       <div style={{ padding: "0 25px" }}>
//         <div style={{ background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr style={{ background: "#fafafa" }}><th style={{ padding: "14px 20px", textAlign: "left" }}>ID</th><th style={{ padding: "14px 20px", textAlign: "left" }}>Name</th><th style={{ padding: "14px 20px", textAlign: "left" }}>Age</th><th style={{ padding: "14px 20px", textAlign: "left" }}>Gender</th><th style={{ padding: "14px 20px", textAlign: "left" }}>Phone</th><th style={{ padding: "14px 20px", textAlign: "left" }}>Status</th><th style={{ padding: "14px 20px", textAlign: "left" }}>Action</th></tr></thead>
//             <tbody>{filtered.map(p => (<tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}><td style={{ padding: "16px 20px" }}>{p.patient_id || `P${String(p.id).padStart(3, "0")}`}</td><td style={{ padding: "16px 20px" }}>{p.name || p.full_name}</td><td style={{ padding: "16px 20px" }}>{p.age || 0}</td><td style={{ padding: "16px 20px" }}>{p.gender || "-"}</td><td style={{ padding: "16px 20px" }}>{p.phone || p.phone_number}</td><td style={{ padding: "16px 20px" }}><span style={{ background: "#c8e6d0", padding: "5px 14px", borderRadius: "20px", fontSize: "12px" }}>Active</span></td><td style={{ padding: "16px 20px" }}><button onClick={() => openDetailView(p)} style={{ background: "white", color: "#8b1a1a", border: "1.5px solid #8b1a1a", padding: "5px 18px", borderRadius: "6px", cursor: "pointer" }}>View</button></td></tr>))}</tbody>
//           </table>
//         </div>
//       </div>

//       {showDetail && selectedPatient && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
//           <div style={{ background: "white", width: "100%", maxWidth: "760px", borderRadius: "16px", overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
//             <div style={{ background: "#8b1a1a", color: "white", padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//                 <div style={{ width: "54px", height: "54px", background: "white", color: "#8b1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "22px" }}>{(selectedPatient.name || selectedPatient.full_name || "P").charAt(0).toUpperCase()}</div>
//                 <div>
//                   <div style={{ fontSize: "20px", fontWeight: "700", fontFamily: "serif" }}>{selectedPatient.name || selectedPatient.full_name}</div>
//                   <div style={{ fontSize: "13px", opacity: "0.9", marginTop: "2px", display: "flex", gap: "8px", alignItems: "center" }}>
//                     <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "10px", fontSize: "11px" }}>{selectedPatient.patient_id || `P${String(selectedPatient.id).padStart(3, "0")}`}</span>
//                     <span>• {selectedPatient.age} Yrs • {selectedPatient.gender}</span>
//                     <span>• {selectedPatient.blood_group || "O+"}</span>
//                   </div>
//                 </div>
//               </div>
//               <button onClick={() => setShowDetail(false)} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "20px" }}>×</button>
//             </div>
//             <div style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
//               <div style={{ marginBottom: "24px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
//                   <div style={{ width: "3px", height: "18px", background: "#8b1a1a", borderRadius: "10px" }}></div>
//                   <h3 style={{ color: "#8b1a1a", fontFamily: "serif", fontSize: "14px", fontWeight: "800", margin: 0, letterSpacing: "0.5px", textTransform: "uppercase" }}>Personal Information</h3>
//                 </div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
//                   <div style={{ background: "#faf8f8", border: "1px solid #f0e0e0", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#8b1a1a", fontWeight: "800", letterSpacing: "0.8px", textTransform: "uppercase" }}>Full Name</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px", color: "#222" }}>{selectedPatient.name || selectedPatient.full_name}</div>
//                   </div>
//                   <div style={{ background: "#f1f8e9", border: "1px solid #c5e1a5", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#2e7d32", fontWeight: "800", letterSpacing: "0.8px", textTransform: "uppercase" }}>DOB • Age (Auto-Calculated)</div>
//                     <div style={{ fontSize: "14px", fontWeight: "700", marginTop: "5px", color: "#2e7d32" }}>{selectedPatient.dob? `${selectedPatient.dob} • ${selectedPatient.age} Years` : `${selectedPatient.age} Years`}</div>
//                   </div>
//                   <div style={{ background: "#faf8f8", border: "1px solid #f0e0e0", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#8b1a1a", fontWeight: "800", letterSpacing: "0.8px", textTransform: "uppercase" }}>Gender</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}>{selectedPatient.gender || "Male"}</div>
//                   </div>
//                   <div style={{ background: "#faf8f8", border: "1px solid #f0e0e0", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#8b1a1a", fontWeight: "800", letterSpacing: "0.8px", textTransform: "uppercase" }}>Blood Group</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}><span style={{ background: "#8b1a1a", color: "white", padding: "2px 10px", borderRadius: "20px", fontSize: "12px" }}>{selectedPatient.blood_group || "O+"}</span></div>
//                   </div>
//                 </div>
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
//                   <div style={{ width: "3px", height: "18px", background: "#8b1a1a", borderRadius: "10px" }}></div>
//                   <h3 style={{ color: "#8b1a1a", fontFamily: "serif", fontSize: "14px", fontWeight: "800", margin: 0, letterSpacing: "0.5px", textTransform: "uppercase" }}>Contact Information</h3>
//                 </div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
//                   <div style={{ background: "#faf8f8", border: "1px solid #f0e0e0", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#8b1a1a", fontWeight: "800", textTransform: "uppercase" }}>Phone Number</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}>📱 {selectedPatient.phone || selectedPatient.phone_number}</div>
//                   </div>
//                   <div style={{ background: "#faf8f8", border: "1px solid #f0e0e0", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#8b1a1a", fontWeight: "800", textTransform: "uppercase" }}>Email Address</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}>{selectedPatient.email || "Not provided"}</div>
//                   </div>
//                   <div style={{ background: "#faf8f8", border: "1px solid #f0e0e0", padding: "14px 16px", borderRadius: "10px", gridColumn: "1 / span 2" }}>
//                     <div style={{ fontSize: "10px", color: "#8b1a1a", fontWeight: "800", textTransform: "uppercase" }}>Full Address</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}>📍 {selectedPatient.address || "Address not provided"}</div>
//                   </div>
//                   <div style={{ background: "#fff8e1", border: "1px solid #ffe082", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#f57f17", fontWeight: "800", textTransform: "uppercase" }}>Emergency Contact</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}>🚨 {selectedPatient.emergency_contact || "Not added"}</div>
//                   </div>
//                   <div style={{ background: "#fff3f0", border: "1px solid #ffab91", padding: "14px 16px", borderRadius: "10px" }}>
//                     <div style={{ fontSize: "10px", color: "#d84315", fontWeight: "800", textTransform: "uppercase" }}>Known Allergies</div>
//                     <div style={{ fontSize: "14px", fontWeight: "600", marginTop: "5px" }}>⚠️ {selectedPatient.allergies || "None"}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ padding: "18px 28px", borderTop: "1px solid #eee", display: "flex", justifyContent: "center", gap: "12px", background: "#fafafa" }}>
//               <button onClick={openBookModal} style={{ background: "#8b1a1a", color: "white", border: "none", padding: "12px 26px", borderRadius: "10px", cursor: "pointer", fontWeight: "700", fontSize: "14px" }}>📅 Book Appointment</button>
//               <button onClick={handleEdit} style={{ background: "white", border: "1.5px solid #ddd", padding: "12px 22px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>✏️ Edit</button>
//               <button onClick={() => setShowDetail(false)} style={{ background: "white", border: "1.5px solid #ddd", padding: "12px 22px", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showAddPatient && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100, padding: "20px" }}>
//           <div style={{ background: "white", width: "100%", maxWidth: "780px", borderRadius: "14px", overflow: "hidden", maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
//             <div style={{ background: "#8b1a1a", color: "white", padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><h2 style={{ fontFamily: "serif", margin: 0, fontSize: "22px" }}>{isEditMode? "Edit Patient" : "Register New Patient"}</h2><p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: "0.9" }}>DOB → Age auto-locked | Letters only for Name | Numbers only for Phone</p></div><button onClick={() => { setShowAddPatient(false); setIsEditMode(false); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer" }}>×</button></div>
//             <div style={{ padding: "28px", overflowY: "auto" }}>
//               <div style={{ marginBottom: "24px" }}>
//                 <h4 style={{ color: "#8b1a1a", fontSize: "13px", fontWeight: "800", textTransform: "uppercase", marginBottom: "14px" }}>Personal Information</h4>
//                 <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr", gap: "16px" }}>
//                   <div>
//                     <label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Full Name *</label>
//                     <input value={addForm.full_name} onChange={e => setAddForm({...addForm, full_name: e.target.value.replace(/[^A-Za-z ]/g, "").replace(/\s{2,}/g," ") })} placeholder="Ex: John Doe (only letters)" style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${addErrors.full_name? "#d32f2f" : "#e0e0e0"}`, borderRadius: "8px" }} />
//                     {addErrors.full_name && <span style={{ color:"#d32f2f", fontSize:"11px" }}>{addErrors.full_name}</span>}
//                   </div>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Age * <span style={{ color: "#2e7d32", fontSize: "10px" }}>(Locked)</span></label><input type="number" value={addForm.age} disabled readOnly placeholder="Auto from DOB" style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #a5d6a7", borderRadius: "8px", background: "#e8f5e9", fontWeight: "700", cursor: "not-allowed" }} /></div>
//                 </div>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginTop: "16px" }}>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Date of Birth *</label><input type="date" value={addForm.dob} onChange={e => handleDobChange(e.target.value)} max={new Date().toISOString().split('T')[0]} style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${addErrors.dob? "#d32f2f" : "#2e7d32"}`, borderRadius: "8px", background: "#f1f8e9", fontWeight: "600" }} />{addErrors.dob && <span style={{ color:"#d32f2f", fontSize:"11px" }}>{addErrors.dob}</span>}</div>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Gender *</label><select value={addForm.gender} onChange={e => setAddForm({...addForm, gender: e.target.value })} style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${addErrors.gender? "#d32f2f" : "#e0e0e0"}`, borderRadius: "8px" }}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select>{addErrors.gender && <span style={{ color:"#d32f2f", fontSize:"11px" }}>{addErrors.gender}</span>}</div>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Blood Group</label><select value={addForm.blood_group} onChange={e => setAddForm({...addForm, blood_group: e.target.value })} style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #e0e0e0", borderRadius: "8px" }}><option value="">Select</option><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select></div>
//                 </div>
//               </div>
//               <div style={{ marginBottom: "24px" }}>
//                 <h4 style={{ color: "#8b1a1a", fontSize: "13px", fontWeight: "800", textTransform: "uppercase", marginBottom: "14px" }}>Contact Information</h4>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Phone * (10 digits)</label><input value={addForm.phone} onChange={e => setAddForm({...addForm, phone: e.target.value.replace(/[^0-9]/g,"").slice(0,10) })} maxLength="10" placeholder="9876543210" style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${addErrors.phone? "#d32f2f" : "#e0e0e0"}`, borderRadius: "8px" }} />{addErrors.phone && <span style={{ color:"#d32f2f", fontSize:"11px" }}>{addErrors.phone}</span>}</div>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Email (Optional)</label><input value={addForm.email} onChange={e => setAddForm({...addForm, email: e.target.value })} placeholder="john@example.com" style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #e0e0e0", borderRadius: "8px" }} /></div>
//                   <div style={{ gridColumn: "1 / span 2" }}><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Full Address *</label><textarea value={addForm.address} onChange={e => setAddForm({...addForm, address: e.target.value })} placeholder="House No, Street, City..." rows="2" style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${addErrors.address? "#d32f2f" : "#e0e0e0"}`, borderRadius: "8px" }} />{addErrors.address && <span style={{ color:"#d32f2f", fontSize:"11px" }}>{addErrors.address}</span>}</div>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Emergency Contact</label><input value={addForm.emergency_contact} onChange={e => setAddForm({...addForm, emergency_contact: e.target.value.replace(/[^0-9]/g,"").slice(0,10) })} placeholder="Only 10 digit number" style={{ width: "100%", padding: "11px 13px", border: `1.5px solid ${addErrors.emergency_contact? "#d32f2f" : "#e0e0e0"}`, borderRadius: "8px" }} />{addErrors.emergency_contact && <span style={{ color:"#d32f2f", fontSize:"11px" }}>{addErrors.emergency_contact}</span>}</div>
//                   <div><label style={{ fontWeight: "600", fontSize: "12px", marginBottom: "6px", display: "block" }}>Known Allergies</label><input value={addForm.allergies} onChange={e => setAddForm({...addForm, allergies: e.target.value })} placeholder="Ex: Penicillin, None" style={{ width: "100%", padding: "11px 13px", border: "1.5px solid #e0e0e0", borderRadius: "8px" }} /></div>
//                 </div>
//               </div>
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #eee", paddingTop: "18px", flexWrap: "wrap" }}>
//                 <button onClick={() => { setShowAddPatient(false); setIsEditMode(false); }} style={{ padding: "11px 22px", border: "1.5px solid #8b1a1a", color: "#8b1a1a", background: "white", borderRadius: "8px", fontWeight: "600" }}>Cancel</button>
//                 {!isEditMode && (<button onClick={handleSaveAndBookAppointment} style={{ padding: "11px 22px", background: "white", color: "#8b1a1a", border: "1.5px solid #8b1a1a", borderRadius: "8px", fontWeight: "700" }}>Save & Book Appointment</button>)}
//                 <button onClick={handleAddPatientSave} style={{ padding: "11px 24px", background: "#8b1a1a", color: "white", border: "none", borderRadius: "8px", fontWeight: "700" }}>{isEditMode? "Update Patient" : "Save Patient"}</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showBook && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" }}>
//           <div style={{ background: "white", width: "100%", maxWidth: "720px", borderRadius: "12px", padding: "30px", maxHeight: "90vh", overflowY: "auto" }}>
//             <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "20px" }}><div><h2 style={{ fontFamily: "serif", margin: 0, fontSize: "28px" }}>Book Appointment</h2><p style={{ color: "#777", fontSize: "14px" }}>For {selectedPatient?.name || selectedPatient?.full_name} - {selectedPatient?.age} Yrs</p></div><button onClick={() => setShowBook(false)} style={{ border: "none", background: "none", fontSize: "24px", cursor: "pointer" }}>×</button></div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//               <div style={{ gridColumn: "1 / span 2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}><div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Type *</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}><option>Walk-in</option><option>Prior Booking</option></select><small style={{ color: "#8b1a1a", fontSize: "11px", fontWeight: "600" }}>{form.type === "Walk-in"? "⚠️ Today only" : "⚠️ At least 2 days before"}</small></div><div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Slot *</label><select value={form.slot} onChange={e => setForm({...form, slot: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }}><option value="">Select Slot</option><option>09:00 AM - 10:00 AM</option><option>10:00 AM - 11:00 AM</option><option>11:00 AM - 12:00 PM</option><option>02:00 PM - 03:00 PM</option></select></div></div>
//               <div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Patient ID</label><input disabled value={selectedPatient?.patient_id || selectedPatient?.id} style={{ width: "100%", padding: "12px", background: "#f3f3f3", border: "1px solid #ddd", borderRadius: "8px" }} /></div>
//               <div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Patient Name</label><input disabled value={selectedPatient?.name || selectedPatient?.full_name} style={{ width: "100%", padding: "12px", background: "#f3f3f3", border: "1px solid #ddd", borderRadius: "8px" }} /></div>
//               <div style={{ position: "relative" }}><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Doctor *</label><div onClick={() => setShowDoctorList(!showDoctorList)} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer", display: "flex", justifyContent: "space-between" }}><span>{form.doctor_name || "Select Doctor"}</span><span>▼</span></div>{showDoctorList && (<div style={{ position: "absolute", top: "70px", left: 0, right: 0, background: "white", border: "1px solid #ddd", borderRadius: "8px", zIndex: 10, maxHeight: "150px", overflowY: "auto" }}>{doctors.map(d => (<div key={d.id} onClick={() => selectDoctor(d)} style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #f5f5f5" }}>{d.name} - {d.department}</div>))}</div>)}</div>
//               <div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Department</label><input disabled value={form.department} style={{ width: "100%", padding: "12px", background: "#e8f5e9", border: "1px solid #ddd", borderRadius: "8px" }} /></div>
//               <div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Date *</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value })} style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }} /></div>
//               <div><label style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", display: "block" }}>Reason</label><input value={form.reason} onChange={e => setForm({...form, reason: e.target.value })} placeholder="Reason for visit" style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px" }} /></div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "25px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
//               <button onClick={() => setShowBook(false)} style={{ padding: "10px 24px", border: "1.5px solid #8b1a1a", color: "#8b1a1a", background: "white", borderRadius: "8px" }}>Cancel</button>
//               <button onClick={handleBookAppointment} style={{ padding: "10px 24px", background: "#8b1a1a", color: "white", border: "none", borderRadius: "8px", fontWeight: "700" }}>Book & Generate Bill</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showBill && currentBill && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", justifyContent: "center", alignItems: "flex-start", zIndex: 1100, overflowY: "auto", padding: "20px 0" }}>
//           <div style={{ background: "white", width: "95%", maxWidth: paymentStep === "method"? "480px" : "740px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}>
//             {paymentStep === "bill" && (
//               <div id="kims-bill-print">
//                 <div style={{ background: "linear-gradient(135deg, #7a0f0f 0%, #a31e1e 100%)", color: "white", padding: "22px 28px", display: "flex", justifyContent: "space-between" }}>
//                   <div>
//                     <div style={{ fontSize: "26px", fontWeight: "900", fontFamily: "serif", display: "flex", alignItems: "center", gap: "10px" }}><span style={{ background: "white", color: "#7a0f0f", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>K</span>KIMS HEALTH</div>
//                     <div style={{ fontSize: "11px", opacity: "0.9", marginTop: "4px", lineHeight: "1.4" }}>Anayara P.O, Trivandrum - 695029 | NABH Accredited • ISO 9001:2015<br/>Phone: +91 471 2941000 | www.kimshealth.org</div>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <div style={{ background: "#ffb300", color: "#000", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800" }}>UNPAID</div>
//                     <div style={{ marginTop: "10px", background: "rgba(255,255,255,0.15)", padding: "8px 12px", borderRadius: "8px", fontSize: "12px" }}>
//                       <div style={{ fontWeight: "700" }}>{currentBill.billing_id}</div>
//                       <div>{currentBill.billing_date} • {currentBill.billing_time}</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ padding: "0 28px 22px 28px", display: "flex", gap: "12px", marginTop:"20px" }}>
//                   <button onClick={() => setShowBill(false)} style={{ flex: 1, padding: "14px", border: "1.5px solid #a31e1e", color: "#a31e1e", background: "white", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>Pay Later</button>
//                   <button onClick={handlePayNowClick} style={{ flex: 1.6, padding: "14px", background: "linear-gradient(135deg, #7a0f0f, #a31e1e)", color: "white", border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer" }}>Pay Now - ₹{currentBill.amount} →</button>
//                 </div>
//               </div>
//             )}
//             {paymentStep === "method" && (
//               <div style={{ padding: "28px" }}>
//                 <h2 style={{ fontFamily: "serif", fontSize: "22px", margin: 0, textAlign:"center" }}>Select Payment Method</h2>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop:"18px" }}>
//                   {[{ id: "Cash", icon: "💵", name: "Cash Payment" }, { id: "UPI", icon: "📱", name: "UPI / GPay" }, { id: "Card", icon: "💳", name: "Debit / Credit Card" }].map(m => (
//                     <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ border: `2px solid ${paymentMethod === m.id? "#a31e1e" : "#e5e7eb"}`, borderRadius: "12px", padding: "14px 16px", cursor: "pointer", background: paymentMethod === m.id? "#fef2f2" : "white", display: "flex", alignItems: "center", gap: "14px" }}>
//                       <div style={{ fontSize: "22px" }}>{m.icon}</div><div style={{ flex: 1, fontWeight:"700" }}>{m.name}</div><div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${paymentMethod === m.id? "#a31e1e" : "#ccc"}`, background: paymentMethod === m.id? "#a31e1e" : "white" }}></div>
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ display: "flex", gap: "12px", marginTop: "22px" }}>
//                   <button onClick={() => setPaymentStep("bill")} style={{ flex: 1, padding: "13px", border: "1.5px solid #ddd", background: "white", borderRadius: "10px" }}>Back</button>
//                   <button onClick={handleConfirmPayment} style={{ flex: 2, padding: "13px", background: paymentMethod? "#a31e1e" : "#ccc", color: "white", border: "none", borderRadius: "10px", fontWeight: "800" }}>Confirm & Pay ₹{currentBill.amount}</button>
//                 </div>
//               </div>
//             )}
//             {paymentStep === "success" && (
//               <div style={{ padding:"28px", textAlign:"center" }}>
//                 <div style={{ fontSize:"48px" }}>✅</div><h2>Payment Successful</h2><p>Paid via {currentBill.payment_method} • ₹{currentBill.amount}</p>
//                 <button onClick={() => { setShowBill(false); setPaymentStep("bill"); }} style={{ padding: "14px 30px", background: "#a31e1e", color: "white", border: "none", borderRadius: "10px", fontWeight: "800", marginTop:"20px" }}>Done ✓</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default ReceptionistPatientList;