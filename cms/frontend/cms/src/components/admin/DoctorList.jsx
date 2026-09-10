// import { useEffect, useState } from "react";
// import "./DoctorList.css";
// import AddDoctor from "./AddDoctor";

// import EditDoctor from "./EditDoctor";
// import {
//     getDoctors,
//     deleteDoctor
// } from "../../services/doctorService";

// function DoctorList() {

//     const [searchTerm, setSearchTerm] = useState("");
//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     const [showAddDoctor, setShowAddDoctor] = useState(false);
//     const [selectedDoctor, setSelectedDoctor] = useState(null);

//     // Fetch doctors from backend
//     useEffect(() => {

//         const fetchDoctors = async () => {

//             try {

//                 const data = await getDoctors();

//                 console.log("DOCTOR API DATA:", data);

//                 setDoctors(data);

//             } catch (error) {

//                 console.error("Error fetching doctors:", error);

//             } finally {

//                 setLoading(false);

//             }
//         };

//         fetchDoctors();

//     }, []);

//     // Search
//     const filteredDoctors = doctors.filter((doctor) => {

//         const search = searchTerm.toLowerCase();

//         return (
//             String(doctor.id)
//                 .toLowerCase()
//                 .includes(search) ||

//             String(doctor.name)
//                 .toLowerCase()
//                 .includes(search) ||

//             String(doctor.department)
//                 .toLowerCase()
//                 .includes(search) ||

//             String(doctor.phone)
//                 .toLowerCase()
//                 .includes(search)
//         );
//     });

//     // Edit
//     const handleEditDoctor = (doctor) => {
//         setSelectedDoctor(doctor);
//     };

//     // Delete
//     const handleDeleteDoctor = async (doctor) => {

//         const confirmDelete = window.confirm(
//             `Are you sure you want to delete Dr. ${doctor.name}?`
//         );

//         if (!confirmDelete) {
//             return;
//         }

//         try {

//             await deleteDoctor(doctor.id);

//             // Remove from UI after successful deletion
//             setDoctors((prevDoctors) =>
//                 prevDoctors.filter(
//                     (doctorMember) =>
//                         doctorMember.id !== doctor.id
//                 )
//             );

//             console.log("Doctor deleted successfully");

//         } catch (error) {

//             console.error("Error deleting doctor:", error);

//             if (error.response) {
//                 console.log("Status:", error.response.status);
//                 console.log("Response:", error.response.data);
//             }

//             alert("Failed to delete doctor");
//         }
//     };

//     return (
//         <div className="doctor-section">

//             {/* Add Doctor + Search */}
//             <div className="doctor-controls">

//                 <button
//                     className="add-doctor-button"
//                     onClick={() => setShowAddDoctor(true)}
//                 >
//                     <span>+</span>
//                     Add Doctor
//                 </button>

//                 <div className="doctor-search-container">

//                     <span className="doctor-search-icon">
//                         ⌕
//                     </span>

//                     <input
//                         type="text"
//                         placeholder="Search doctors..."
//                         value={searchTerm}
//                         onChange={(e) =>
//                             setSearchTerm(e.target.value)
//                         }
//                     />

//                 </div>

//             </div>

//             {/* Loading */}
//             {loading ? (

//                 <p>Loading doctors...</p>

//             ) : (

//                 /* Doctor Table */
//                 <div className="doctor-table-container">

//                     <table>

//                         <thead>

//                             <tr>
//                                 <th>Doctor ID</th>
//                                 <th>Doctor Name</th>
//                                 <th>Department</th>
//                                 <th>Contact</th>
//                                 <th>Fees</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>

//                         </thead>

//                         <tbody>

//                             {filteredDoctors.length > 0 ? (

//                                 filteredDoctors.map((doctor) => (

//                                     <tr key={doctor.id}>

//                                         {/* Doctor ID */}
//                                         <td>
//                                             {doctor.doctor_id || `DOC${String(doctor.id).padStart(3, "0")}`}
//                                         </td>

//                                         {/* Name */}
//                                         <td>
//                                             Dr. {doctor.name}
//                                         </td>

//                                         {/* Department */}
//                                         <td>
//                                             {doctor.department}
//                                         </td>

//                                         {/* Phone */}
//                                         <td>
//                                             {doctor.phone}
//                                         </td>

//                                         {/* Fees */}
//                                         <td>
//                                             ₹{doctor.fees}
//                                         </td>

//                                         {/* Status */}
//                                         <td>

//                                             <span
//                                                 className={`doctor-status ${
//                                                     doctor.status
//                                                         ?.toLowerCase()
//                                                         .replace(" ", "-")
//                                                 }`}
//                                             >
//                                                 {doctor.status}
//                                             </span>

//                                         </td>

//                                         {/* Actions */}
//                                         <td>

//                                             <div className="doctor-action-buttons">

//                                                 <button
//                                                     className="edit-doctor-button"
//                                                     onClick={() =>
//                                                         handleEditDoctor(doctor)
//                                                     }
//                                                 >
//                                                     Edit
//                                                 </button>

//                                                 <button
//                                                     className="delete-doctor-button"
//                                                     onClick={() =>
//                                                         handleDeleteDoctor(doctor)
//                                                     }
//                                                 >
//                                                     Delete
//                                                 </button>

//                                             </div>

//                                         </td>

//                                     </tr>

//                                 ))

//                             ) : (

//                                 <tr>

//                                     <td
//                                         colSpan="7"
//                                         className="no-doctors"
//                                     >
//                                         No doctors found
//                                     </td>

//                                 </tr>

//                             )}

//                         </tbody>

//                     </table>

//                 </div>

//             )}

//             {/* Add Doctor Modal */}
//            {showAddDoctor && (
//     <AddDoctor
//         onClose={() => setShowAddDoctor(false)}
//         onDoctorAdded={(newDoctor) => {
//             setDoctors((prevDoctors) => [
//                 ...prevDoctors,
//                 newDoctor
//             ]);
//         }}
//     />
// )}

//             {/* Edit Doctor Modal */}
//             {selectedDoctor && (

//                 <EditDoctor
//                     doctor={selectedDoctor}

//                     onClose={() =>
//                         setSelectedDoctor(null)
//                     }

//                     onDoctorUpdated={(updatedDoctor) => {

//                         setDoctors((prevDoctors) =>
//                             prevDoctors.map((doctor) =>
//                                 doctor.id === updatedDoctor.id
//                                     ? updatedDoctor
//                                     : doctor
//                             )
//                         );

//                     }}
//                 />

//             )}

//         </div>
//     );
// }

// export default DoctorList;
import { useEffect, useState } from "react";
import "./DoctorList.css";
import AddDoctor from "./AddDoctor";
import EditDoctor from "./EditDoctor";

import {
    getDoctors,
    updateDoctor
} from "../../services/doctorService";

function DoctorList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddDoctor, setShowAddDoctor] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Fetch doctors from backend
    useEffect(() => {

        const fetchDoctors = async () => {

            try {

                const data = await getDoctors();

                console.log("DOCTOR API DATA:", data);

                setDoctors(data);

            } catch (error) {

                console.error("Error fetching doctors:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchDoctors();

    }, []);

    // Search
    const filteredDoctors = doctors.filter((doctor) => {

        const search = searchTerm.toLowerCase();

        return (
            String(doctor.id)
                .toLowerCase()
                .includes(search) ||

            String(doctor.name)
                .toLowerCase()
                .includes(search) ||

            String(doctor.department)
                .toLowerCase()
                .includes(search) ||

            String(doctor.phone)
                .toLowerCase()
                .includes(search)
        );
    });

    // Edit
    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
    };

    // Activate / Deactivate
    const handleStatusChange = async (doctor) => {

        const isActive = doctor.status === "Active";

        const newStatus = isActive
            ? "Inactive"
            : "Active";

        const action = isActive
            ? "deactivate"
            : "activate";

        const confirmAction = window.confirm(
            `Are you sure you want to ${action} Dr. ${doctor.name}?`
        );

        if (!confirmAction) {
            return;
        }

        try {

            const updatedDoctor = await updateDoctor(
                doctor.id,
                {
                    ...doctor,
                    status: newStatus
                }
            );

            setDoctors((prevDoctors) =>
                prevDoctors.map((doctorMember) =>
                    doctorMember.id === doctor.id
                        ? updatedDoctor
                        : doctorMember
                )
            );

            console.log(
                `Doctor ${action}d successfully`
            );

        } catch (error) {

            console.error(
                `Error trying to ${action} doctor:`,
                error
            );

            if (error.response) {
                console.log(
                    "Status:",
                    error.response.status
                );

                console.log(
                    "Response:",
                    error.response.data
                );
            }

            alert(`Failed to ${action} doctor`);
        }
    };

    return (
        <div className="doctor-section">

            {/* Add Doctor + Search */}
            <div className="doctor-controls">

                <button
                    className="add-doctor-button"
                    onClick={() => setShowAddDoctor(true)}
                >
                    <span>+</span>
                    Add Doctor
                </button>

                <div className="doctor-search-container">

                    <span className="doctor-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Loading */}
            {loading ? (

                <p>Loading doctors...</p>

            ) : (

                /* Doctor Table */
                <div className="doctor-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Doctor ID</th>
                                <th>Doctor Name</th>
                                <th>Department</th>
                                <th>Contact</th>
                                <th>Fees</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredDoctors.length > 0 ? (

                                filteredDoctors.map((doctor) => (

                                    <tr key={doctor.id}>

                                        {/* Doctor ID */}
                                        <td>
                                            {doctor.doctor_id ||
                                                `DOC${String(doctor.id).padStart(3, "0")}`}
                                        </td>

                                        {/* Name */}
                                        <td>
                                            Dr. {doctor.name}
                                        </td>

                                        {/* Department */}
                                        <td>
                                            {doctor.department}
                                        </td>

                                        {/* Phone */}
                                        <td>
                                            {doctor.phone}
                                        </td>

                                        {/* Fees */}
                                        <td>
                                            ₹{doctor.fees}
                                        </td>

                                        {/* Status */}
                                        <td>

                                            <span
                                                className={`doctor-status ${doctor.status
                                                    ?.toLowerCase()
                                                    .replace(" ", "-")
                                                    }`}
                                            >
                                                {doctor.status}
                                            </span>

                                        </td>

                                        {/* Actions */}
                                        <td>

                                            <div className="doctor-action-buttons">

                                                <button
                                                    className="edit-doctor-button"
                                                    onClick={() =>
                                                        handleEditDoctor(doctor)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className={`delete-doctor-button ${doctor.status === "Inactive" ? "activate" : ""}`}
                                                    onClick={() =>
                                                        handleStatusChange(doctor)
                                                    }
                                                >
                                                    {doctor.status === "Active" ? "Deactivate" : "Activate"}
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-doctors"
                                    >
                                        No doctors found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {/* Add Doctor Modal */}
            {showAddDoctor && (
                <AddDoctor
                    onClose={() =>
                        setShowAddDoctor(false)
                    }

                    onDoctorAdded={(newDoctor) => {

                        setDoctors((prevDoctors) => [
                            ...prevDoctors,
                            newDoctor
                        ]);

                    }}
                />
            )}

            {/* Edit Doctor Modal */}
            {selectedDoctor && (

                <EditDoctor
                    doctor={selectedDoctor}

                    onClose={() =>
                        setSelectedDoctor(null)
                    }

                    onDoctorUpdated={(updatedDoctor) => {

                        setDoctors((prevDoctors) =>
                            prevDoctors.map((doctor) =>
                                doctor.id === updatedDoctor.id
                                    ? updatedDoctor
                                    : doctor
                            )
                        );

                    }}
                />

            )}

        </div>
    );
}

export default DoctorList;