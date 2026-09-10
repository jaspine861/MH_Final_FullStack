// import { useState,useEffect } from "react";
// import "./EditDoctor.css";
// import { updateDoctor } from "../../services/doctorService";
// import { getDepartments } from "../../services/departmentService";
// function EditDoctor({ doctor, onClose, onDoctorUpdated }) {

//     const [formData, setFormData] = useState({
//         name: doctor.name || "",
//         department: doctor.department || "",
//         fees: doctor.fees || "",
//         experience: doctor.experience || "",
//         username: doctor.username || "",
//         password: doctor.password || "",
//         date_of_birth: doctor.date_of_birth || "",
//         gender: doctor.gender || "",
//         phone: doctor.phone || "",
//         email: doctor.email || "",
//         blood_group: doctor.blood_group || "",
//         address: doctor.address || "",
//         emergency_contact: doctor.emergency_contact || "",
//         status: doctor.status || "Active"
//     });

//     const [loading, setLoading] = useState(false);
//     const [departments, setDepartments] = useState([]);
//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };
//                 useEffect(() => {
//     const fetchDepartments = async () => {
//         try {
//             const data = await getDepartments();

//             const activeDepartments = data.filter(
//                 (department) => department.is_active
//             );

//             setDepartments(activeDepartments);

//         } catch (error) {
//             console.error(
//                 "Error fetching departments:",
//                 error
//             );
//         }
//     };

//     fetchDepartments();
// }, []);
//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setLoading(true);

//             const updatedDoctor = await updateDoctor(
//                 doctor.id,
//                 formData
//             );

//             console.log("Doctor updated:", updatedDoctor);

//             onDoctorUpdated(updatedDoctor);

//             onClose();

//         } catch (error) {

//             console.error("Error updating doctor:", error);

//             if (error.response) {
//                 console.log("Status:", error.response.status);
//                 console.log("Response:", error.response.data);
//             }

//             alert("Failed to update doctor");

//         } finally {

//             setLoading(false);
//         }
//     };

//     return (
//         <div className="edit-doctor-overlay">

//             <div className="edit-doctor-card">

//                 <div className="edit-doctor-header">

//                     <h2>Edit Doctor</h2>

//                     <button
//                         className="close-button"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>

//                 <form onSubmit={handleSubmit}>

//                     {/* Doctor ID */}
//                     <div className="form-group">

//                         <label>Doctor ID</label>

//                         <input
//                             type="text"
//                             value={doctor.doctor_id}
//                             disabled
//                         />

//                     </div>


//                     {/* Name */}
//                     <div className="form-group">

//                         <label>Doctor Name</label>

//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* Department + Fees */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Department</label>

//                            <select
//     name="department"
//     value={formData.department}
//     onChange={handleChange}
//     required
// >
//     <option value="">
//         Select Department
//     </option>

//     {departments.map((department) => (
//         <option
//             key={department.department_id}
//             value={department.name}
//         >
//             {department.name}
//         </option>
//     ))}
// </select>

//                         </div>


//                         <div className="form-group">

//                             <label>Fees</label>

//                             <input
//                                 type="number"
//                                 name="fees"
//                                 value={formData.fees}
//                                 onChange={handleChange}
//                                 min="0"
//                                 step="0.01"
//                                 required
//                             />

//                         </div>

//                     </div>


//                     {/* Experience + Username */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Experience (Years)</label>

//                             <input
//                                 type="number"
//                                 name="experience"
//                                 value={formData.experience}
//                                 onChange={handleChange}
//                                 min="0"
//                                 required
//                             />

//                         </div>


//                         <div className="form-group">

//                             <label>Username</label>

//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                     </div>


//                     {/* Password */}
//                     <div className="form-group">

//                         <label>Password</label>

//                         <input
//                             type="text"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* DOB + Gender */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Date of Birth</label>

//                             <input
//                                 type="date"
//                                 name="date_of_birth"
//                                 value={formData.date_of_birth}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>


//                         <div className="form-group">

//                             <label>Gender</label>

//                             <select
//                                 name="gender"
//                                 value={formData.gender}
//                                 onChange={handleChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select gender
//                                 </option>

//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                                 <option value="Other">Other</option>

//                             </select>

//                         </div>

//                     </div>


//                     {/* Phone + Email */}
//                     <div className="form-row">

//                         <div className="form-group">

//                             <label>Phone</label>

//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>


//                         <div className="form-group">

//                             <label>Email</label>

//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>

//                     </div>


//                     {/* Blood Group */}
//                     <div className="form-group">

//                         <label>Blood Group</label>

//                         <select
//                             name="blood_group"
//                             value={formData.blood_group}
//                             onChange={handleChange}
//                         >

//                             <option value="">
//                                 Select blood group
//                             </option>

//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>

//                         </select>

//                     </div>


//                     {/* Address */}
//                     <div className="form-group">

//                         <label>Address</label>

//                         <textarea
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             rows="3"
//                         ></textarea>

//                     </div>


//                     {/* Emergency Contact */}
//                     <div className="form-group">

//                         <label>Emergency Contact</label>

//                         <input
//                             type="tel"
//                             name="emergency_contact"
//                             value={formData.emergency_contact}
//                             onChange={handleChange}
//                         />

//                     </div>


//                     {/* Status */}
//                     <div className="form-group">

//                         <label>Status</label>

//                         <select
//                             name="status"
//                             value={formData.status}
//                             onChange={handleChange}
//                         >

//                             <option value="Active">Active</option>
//                             <option value="On Leave">On Leave</option>
//                             <option value="Inactive">Inactive</option>

//                         </select>

//                     </div>


//                     {/* Buttons */}
//                     <div className="form-actions">

//                         <button
//                             type="button"
//                             className="cancel-button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="save-button"
//                             disabled={loading}
//                         >
//                             {loading ? "Updating..." : "Update Doctor"}
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default EditDoctor;

import { useState, useEffect } from "react";
import "./EditDoctor.css";
import { updateDoctor } from "../../services/doctorService";
import { getDepartments } from "../../services/departmentService";

function EditDoctor({ doctor, onClose, onDoctorUpdated }) {

    const [formData, setFormData] = useState({
        name: doctor.name || "",
        department: doctor.department || "",
        fees: doctor.fees || "",
        experience: doctor.experience || "",
        username: doctor.username || "",
        password: doctor.password || "",
        date_of_birth: doctor.date_of_birth || "",
        gender: doctor.gender || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        blood_group: doctor.blood_group || "",
        address: doctor.address || "",
        emergency_contact: doctor.emergency_contact || "",
        status: doctor.status || "Active"
    });

    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();

                const activeDepartments = data.filter(
                    (department) => department.is_active === true
                );

                setDepartments(activeDepartments);

            } catch (error) {
                console.error(
                    "Error fetching departments:",
                    error
                );
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const updatedDoctor = await updateDoctor(
                doctor.id,
                formData
            );

            console.log("Doctor updated:", updatedDoctor);

            onDoctorUpdated(updatedDoctor);

            onClose();

        } catch (error) {

            console.error("Error updating doctor:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);
            }

            alert("Failed to update doctor");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="edit-doctor-overlay">

            <div className="edit-doctor-card">

                <div className="edit-doctor-header">

                    <h2>Edit Doctor</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Doctor ID */}
                    <div className="form-group">

                        <label>Doctor ID</label>

                        <input
                            type="text"
                            value={doctor.doctor_id}
                            disabled
                        />

                    </div>


                    {/* Name */}
                    <div className="form-group">

                        <label>Doctor Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Department + Fees */}
                    <div className="form-row">

                        <div className="form-group">

                            <label>Department</label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Department
                                </option>

                                {departments.map((department) => (

                                    <option
                                        key={department.department_id}
                                        value={department.name}
                                    >
                                        {department.name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <div className="form-group">

                            <label>Fees</label>

                            <input
                                type="number"
                                name="fees"
                                value={formData.fees}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>

                    </div>


                    {/* Experience + Username */}
                    <div className="form-row">

                        <div className="form-group">

                            <label>Experience (Years)</label>

                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Username</label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* Password */}
                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* DOB + Gender */}
                    <div className="form-row">

                        <div className="form-group">

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Gender</label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Phone + Email */}
                    <div className="form-row">

                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* Blood Group */}
                    <div className="form-group">

                        <label>Blood Group</label>

                        <select
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select blood group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                    </div>


                    {/* Address */}
                    <div className="form-group">

                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>

                    </div>


                    {/* Emergency Contact */}
                    <div className="form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="tel"
                            name="emergency_contact"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Status */}
                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <option value="Active">
                                Active
                            </option>

                            <option value="On Leave">
                                On Leave
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    {/* Buttons */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Doctor"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditDoctor;