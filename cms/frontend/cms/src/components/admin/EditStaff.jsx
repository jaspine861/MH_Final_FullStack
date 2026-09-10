// import { useState } from "react";
// import "./EditStaff.css";
// import { updateStaff } from "../../services/staffService";
// function EditStaff({ staff, onClose, onStaffUpdated }) {

//     const [formData, setFormData] = useState({
//         name: staff.name || "",
//         date_of_birth: staff.date_of_birth || "",
//         gender: staff.gender || "",
//         blood_group: staff.blood_group || "",
//         phone: staff.phone || "",
//         email: staff.email || "",
//         address: staff.address || "",
//         emergency_contact: staff.emergency_contact || "",
//         department: staff.department || "",
//         qualification: staff.qualification || "",
//         username: staff.username || "",
//         password: staff.password || ""
//     });

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//         console.log("STAFF ID:", staff.id);
//         console.log("DATA SENT:", formData);

//         const updatedStaff = await updateStaff(
//             staff.id,
//             formData
//         );

//         console.log("UPDATED STAFF:", updatedStaff);

//         if (onStaffUpdated) {
//             onStaffUpdated(updatedStaff);
//         }

//         onClose();

//     } catch (error) {

//         console.error("UPDATE ERROR:", error);

//         if (error.response) {
//             console.log("STATUS:", error.response.status);
//             console.log("RESPONSE:", error.response.data);
//         }

//         alert("Failed to update staff");

//     }
// };

//     return (
//         <div className="edit-staff-overlay">

//             <div className="edit-staff-card">

//                 {/* Header */}

//                 <div className="edit-staff-header">

//                     <h2>Edit Staff</h2>

//                     <button
//                         className="edit-close-button"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>

//                 <form onSubmit={handleSubmit}>

//                     {/* Staff ID */}

//                     <div className="edit-form-group">

//                         <label>Staff ID</label>

//                         <input
//                             type="text"
//                             value={staff.staff_id}
//                             disabled
//                         />

//                     </div>


//                     {/* Name */}

//                     <div className="edit-form-group">

//                         <label>Name</label>

//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* DOB + Gender */}

//                     <div className="edit-form-row">

//                         <div className="edit-form-group">

//                             <label>Date of Birth</label>

//                             <input
//                                 type="date"
//                                 name="date_of_birth"
//                                 value={formData.date_of_birth}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>


//                         <div className="edit-form-group">

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

//                                 <option value="Male">
//                                     Male
//                                 </option>

//                                 <option value="Female">
//                                     Female
//                                 </option>

//                                 <option value="Other">
//                                     Other
//                                 </option>

//                             </select>

//                         </div>

//                     </div>


//                     {/* Phone + Email */}

//                     <div className="edit-form-row">

//                         <div className="edit-form-group">

//                             <label>Phone</label>

//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                             />

//                         </div>


//                         <div className="edit-form-group">

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


//                     {/* Department + Qualification */}

//                     <div className="edit-form-row">

//                         <div className="edit-form-group">

//                             <label>Department</label>

//                             <select
//                                 name="department"
//                                 value={formData.department}
//                                 onChange={handleChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select department
//                                 </option>

//                                 <option value="Reception">
//                                     Reception
//                                 </option>

//                                 <option value="Pharmacy">
//                                     Pharmacy
//                                 </option>

//                                 <option value="Nursing">
//                                     Nursing
//                                 </option>

//                                 <option value="Lab">
//                                     Lab
//                                 </option>

//                                 <option value="Accounts">
//                                     Accounts
//                                 </option>

//                                 <option value="Admin">
//                                     Admin
//                                 </option>

//                                 <option value="Other">
//                                     Other
//                                 </option>

//                             </select>

//                         </div>


//                         <div className="edit-form-group">

//                             <label>Qualification</label>

//                             <input
//                                 type="text"
//                                 name="qualification"
//                                 value={formData.qualification}
//                                 onChange={handleChange}
//                             />

//                         </div>

//                     </div>


//                     {/* Blood Group */}

//                     <div className="edit-form-group">

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

//                     <div className="edit-form-group">

//                         <label>Address</label>

//                         <textarea
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             rows="3"
//                         />

//                     </div>


//                     {/* Emergency Contact */}

//                     <div className="edit-form-group">

//                         <label>Emergency Contact</label>

//                         <input
//                             type="tel"
//                             name="emergency_contact"
//                             value={formData.emergency_contact}
//                             onChange={handleChange}
//                         />

//                     </div>


//                     {/* Username */}

//                     <div className="edit-form-group">

//                         <label>Username</label>

//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* Password */}

//                     <div className="edit-form-group">

//                         <label>Password</label>

//                         <input
//                             type="text"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />

//                     </div>


//                     {/* Buttons */}

//                     <div className="edit-form-actions">

//                         <button
//                             type="button"
//                             className="edit-cancel-button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="edit-save-button"
//                         >
//                             Save Changes
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default EditStaff;
import { useState } from "react";
import "./EditStaff.css";
import { updateStaff } from "../../services/staffService";

function EditStaff({ staff, onClose, onStaffUpdated }) {

    const [formData, setFormData] = useState({
        name: staff.name || "",
        date_of_birth: staff.date_of_birth || "",
        gender: staff.gender || "",
        blood_group: staff.blood_group || "",
        phone: staff.phone || "",
        email: staff.email || "",
        address: staff.address || "",
        emergency_contact: staff.emergency_contact || "",
        department: staff.department || "",
        qualification: staff.qualification || "",
        username: staff.username || "",
        password: staff.password || ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Remove error when user starts correcting field
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };


    // =========================
    // VALIDATION
    // =========================

    const validateForm = () => {

        const newErrors = {};

        // Name
        if (!formData.name.trim()) {

            newErrors.name = "Name is required";

        } else if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {

            newErrors.name = "Name can contain only letters and spaces";

        } else if (formData.name.trim().length < 2) {

            newErrors.name = "Name must contain at least 2 characters";
        }


        // DOB
        if (!formData.date_of_birth) {

            newErrors.date_of_birth = "Date of birth is required";

        } else {

            const today = new Date();
            const selectedDate = new Date(formData.date_of_birth);

            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate > today) {
                newErrors.date_of_birth =
                    "Date of birth cannot be in the future";
            }
        }


        // Gender
        if (!formData.gender) {
            newErrors.gender = "Please select gender";
        }


        // Phone
        if (!formData.phone.trim()) {

            newErrors.phone = "Phone number is required";

        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {

            newErrors.phone =
                "Phone number must contain exactly 10 digits";
        }


        // Email
        if (!formData.email.trim()) {

            newErrors.email = "Email is required";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim()
            )
        ) {

            newErrors.email = "Enter a valid email address";
        }


        // Department
        if (!formData.department) {
            newErrors.department = "Please select department";
        }


        // Qualification
        if (
            formData.qualification.trim() &&
            !/^[A-Za-z0-9 .,&()/-]+$/.test(
                formData.qualification.trim()
            )
        ) {

            newErrors.qualification =
                "Qualification contains invalid characters";
        }


        // Emergency Contact
        if (formData.emergency_contact.trim()) {

            if (
                !/^[0-9]{10}$/.test(
                    formData.emergency_contact.trim()
                )
            ) {

                newErrors.emergency_contact =
                    "Emergency contact must contain exactly 10 digits";
            }
        }


        // Username
        if (!formData.username.trim()) {

            newErrors.username = "Username is required";

        } else if (
            formData.username.trim().length < 4 ||
            formData.username.trim().length > 20
        ) {

            newErrors.username =
                "Username must be between 4 and 20 characters";

        } else if (
            !/^[A-Za-z0-9_]+$/.test(
                formData.username.trim()
            )
        ) {

            newErrors.username =
                "Username can contain letters, numbers and underscore only";
        }


        // Password
        if (!formData.password) {

            newErrors.password = "Password is required";

        } else if (formData.password.length < 8) {

            newErrors.password =
                "Password must contain at least 8 characters";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validate before API request
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {

            console.log("STAFF ID:", staff.id);
            console.log("DATA SENT:", formData);

            const updatedStaff = await updateStaff(
                staff.id,
                formData
            );

            console.log(
                "UPDATED STAFF:",
                updatedStaff
            );

            if (onStaffUpdated) {
                onStaffUpdated(updatedStaff);
            }

            onClose();

        } catch (error) {

            console.error(
                "UPDATE ERROR:",
                error
            );

            if (error.response) {

                console.log(
                    "STATUS:",
                    error.response.status
                );

                console.log(
                    "RESPONSE:",
                    error.response.data
                );
            }

            setErrors({
                submit:
                    error.response?.data?.detail ||
                    "Failed to update staff"
            });

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="edit-staff-overlay">

            <div className="edit-staff-card">

                {/* Header */}

                <div className="edit-staff-header">

                    <h2>Edit Staff</h2>

                    <button
                        type="button"
                        className="edit-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* Staff ID */}

                    <div className="edit-form-group">

                        <label>Staff ID</label>

                        <input
                            type="text"
                            value={staff.staff_id}
                            disabled
                        />

                    </div>


                    {/* Name */}

                    <div className="edit-form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter staff name"
                            required
                        />

                        {errors.name && (
                            <span className="field-error">
                                {errors.name}
                            </span>
                        )}

                    </div>


                    {/* DOB + Gender */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                required
                            />

                            {errors.date_of_birth && (
                                <span className="field-error">
                                    {errors.date_of_birth}
                                </span>
                            )}

                        </div>


                        <div className="edit-form-group">

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

                            {errors.gender && (
                                <span className="field-error">
                                    {errors.gender}
                                </span>
                            )}

                        </div>

                    </div>


                    {/* Phone + Email */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter 10 digit phone number"
                                maxLength="10"
                                required
                            />

                            {errors.phone && (
                                <span className="field-error">
                                    {errors.phone}
                                </span>
                            )}

                        </div>


                        <div className="edit-form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />

                            {errors.email && (
                                <span className="field-error">
                                    {errors.email}
                                </span>
                            )}

                        </div>

                    </div>


                    {/* Department + Qualification */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>Department</label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select department
                                </option>

                                <option value="Reception">
                                    Reception
                                </option>

                                <option value="Pharmacy">
                                    Pharmacy
                                </option>

                                <option value="Nursing">
                                    Nursing
                                </option>

                                <option value="Lab">
                                    Lab
                                </option>

                                <option value="Accounts">
                                    Accounts
                                </option>

                                <option value="Admin">
                                    Admin
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                            {errors.department && (
                                <span className="field-error">
                                    {errors.department}
                                </span>
                            )}

                        </div>


                        <div className="edit-form-group">

                            <label>Qualification</label>

                            <input
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                placeholder="Enter qualification"
                            />

                            {errors.qualification && (
                                <span className="field-error">
                                    {errors.qualification}
                                </span>
                            )}

                        </div>

                    </div>


                    {/* Blood Group */}

                    <div className="edit-form-group">

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

                    <div className="edit-form-group">

                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            rows="3"
                        />

                    </div>


                    {/* Emergency Contact */}

                    <div className="edit-form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="tel"
                            name="emergency_contact"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                            placeholder="Enter 10 digit emergency contact"
                            maxLength="10"
                        />

                        {errors.emergency_contact && (
                            <span className="field-error">
                                {errors.emergency_contact}
                            </span>
                        )}

                    </div>


                    {/* Username */}

                    <div className="edit-form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />

                        {errors.username && (
                            <span className="field-error">
                                {errors.username}
                            </span>
                        )}

                    </div>


                    {/* Password */}

                    <div className="edit-form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                        />

                        {errors.password && (
                            <span className="field-error">
                                {errors.password}
                            </span>
                        )}

                    </div>


                    {/* Submit Error */}

                    {errors.submit && (
                        <p className="staff-error">
                            {errors.submit}
                        </p>
                    )}


                    {/* Buttons */}

                    <div className="edit-form-actions">

                        <button
                            type="button"
                            className="edit-cancel-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-save-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditStaff;