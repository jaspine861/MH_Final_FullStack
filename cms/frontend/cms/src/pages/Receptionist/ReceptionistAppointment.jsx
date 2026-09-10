// import AppointmentList from "../../components/receptionist/AppointmentList";
import AppointmentsManagement from "../../components/receptionist/AppointmentsManagement";
function ReceptionistAppointment() {
    return (
        <>
            <h1>Appointments</h1>
            <AppointmentsManagement />
        </>
    );
}

export default ReceptionistAppointment;
// import { useEffect, useState } from "react";

// function ReceptionistAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filterDate, setFilterDate] = useState("");

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = () => {
//     const apps = JSON.parse(localStorage.getItem("kims_appointments") || "[]");
//     const bills = JSON.parse(localStorage.getItem("kims_bills") || "[]");
    
//     let all = [...apps];
    
//     bills.forEach(b => {
//       if (!all.find(a => a.appointment_id === b.appointment_id)) {
//         all.push({
//           appointment_id: b.appointment_id,
//           billing_id: b.billing_id,
//           patient_name: b.patient_name,
//           doctor_name: b.doctor_name,
//           department: b.department,
//           appointment_date: b.appointment_date || b.billing_date,
//           status: b.status
//         });
//       }
//     });

//     // AUTO LOGIC FOR CONSULTED
//     const today = new Date();
//     today.setHours(0,0,0,0);

//     let cleaned = all.map(a => {
//       const aptDateStr = a.appointment_date || a.billing_date || a.date;
//       const aptDate = new Date(aptDateStr);
//       aptDate.setHours(0,0,0,0);
      
//       // If date is in past -> Consulted, else Booked
//       if (aptDate < today) {
//         return {...a, status: "Consulted" };
//       } else {
//         return {...a, status: "Booked" };
//       }
//     });

//     // Remove duplicates
//     const unique = [];
//     const seen = new Set();
//     cleaned.forEach(a => {
//       const id = a.appointment_id || a.billing_id;
//       if (!seen.has(id)) {
//         seen.add(id);
//         unique.push(a);
//       }
//     });

//     setAppointments(unique);
//   };

//   const handleCancel = (id) => {
//     if (!window.confirm("Cancel this appointment?")) return;
//     let apps = JSON.parse(localStorage.getItem("kims_appointments") || "[]");
//     apps = apps.filter(a => (a.appointment_id!== id && a.billing_id!== id));
//     localStorage.setItem("kims_appointments", JSON.stringify(apps));
//     let bills = JSON.parse(localStorage.getItem("kims_bills") || "[]");
//     bills = bills.filter(b => (b.appointment_id!== id && b.billing_id!== id));
//     localStorage.setItem("kims_bills", JSON.stringify(bills));
//     setAppointments(prev => prev.filter(a => (a.appointment_id || a.billing_id)!== id));
//   };

//   // Filters
//   let filtered = [...appointments];
//   if (filterDate) {
//     filtered = filtered.filter(a => (a.appointment_date || a.billing_date) === filterDate);
//   }
//   if (search.trim()) {
//     const s = search.toLowerCase();
//     filtered = filtered.filter(a =>
//       (a.patient_name || "").toLowerCase().includes(s) ||
//       (a.appointment_id || "").toLowerCase().includes(s) ||
//       (a.billing_id || "").toLowerCase().includes(s)
//     );
//   }

//   filtered.sort((a, b) => new Date(b.appointment_date || b.billing_date) - new Date(a.appointment_date || a.billing_date));

//   return (
//     <div style={{ padding: "25px" }}>
//       <h2 style={{ fontSize: "28px", fontFamily: "serif", fontWeight: "700", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: "10px" }}>
//         📅 Appointments
//       </h2>

//       <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #eee" }}>
//         <input placeholder="Search by Patient Name or ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: "1", minWidth: "240px", padding: "11px 16px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px" }} />
//         <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ padding: "11px 16px", borderRadius: "10px", border: "1.5px solid #e0e0e0", fontSize: "14px", minWidth: "160px" }} />
//         <button onClick={() => { setSearch(""); setFilterDate(""); }} style={{ padding: "11px 18px", borderRadius: "10px", border: "1px solid #ddd", background: "#f8f9fa", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>Clear</button>
//       </div>

//       <div style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #eee" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#fafafa", borderBottom: "1.5px solid #eee" }}>
//               <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>ID</th>
//               <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Patient Name</th>
//               <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Doctor</th>
//               <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Date</th>
//               <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Status</th>
//               <th style={{ padding: "15px 20px", textAlign: "left", fontSize: "13px", fontWeight: "700" }}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0? (
//               <tr><td colSpan="6" style={{ padding: "40px", textAlign: "center", color: "#999" }}>No appointments</td></tr>
//             ) : filtered.map((apt) => (
//               <tr key={apt.appointment_id || apt.billing_id} style={{ borderBottom: "1px solid #f5f5f5" }}>
//                 <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: "700" }}>{apt.appointment_id || apt.billing_id}</td>
//                 <td style={{ padding: "16px 20px", fontSize: "13px", fontWeight: "600" }}>{apt.patient_name}</td>
//                 <td style={{ padding: "16px 20px", fontSize: "13px" }}>{apt.doctor_name && apt.doctor_name!== "—"? <><span style={{ fontWeight: "600" }}>{apt.doctor_name}</span> <span style={{ color: "#888", fontSize: "11px" }}>({apt.department || "General"})</span></> : "—"}</td>
//                 <td style={{ padding: "16px 20px", fontSize: "13px" }}>{apt.appointment_date || apt.billing_date}</td>
//                 <td style={{ padding: "16px 20px" }}>
//                   {apt.status === "Booked"? (
//                     <span style={{ background: "#e3f2fd", color: "#1565c0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", border: "1px solid #bbdefb" }}>Booked</span>
//                   ) : (
//                     <span style={{ background: "#e8f5e9", color: "#2e7d32", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", border: "1px solid #c8e6c9" }}>Consulted</span>
//                   )}
//                 </td>
//                 <td style={{ padding: "16px 20px" }}>
//                   {apt.status === "Booked"? (
//                     <button onClick={() => handleCancel(apt.appointment_id || apt.billing_id)} style={{ background: "#d32f2f", color: "white", border: "none", padding: "7px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "700", fontSize: "12px" }}>Cancel</button>
//                   ) : (
//                     <span style={{ color: "#999", fontSize: "12px", fontStyle: "italic" }}>Cannot cancel</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div style={{ marginTop: "14px", fontSize: "12px", color: "#888", display: "flex", gap: "16px" }}>
//         <span>🔵 Blue = Booked (Future) - Can Cancel</span>
//         <span>🟢 Green = Consulted (Past) - Cannot cancel</span>
//       </div>
//     </div>
//   );
// }

// export default ReceptionistAppointments;