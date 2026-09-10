import { useState,useEffect } from "react";
import "./AddStaff.css";
import { addStaff } from "../../services/staffService";
import { getDepartments } from "../../services/departmentService";
function AddStaff({ onClose, onStaffAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        date_of_birth: "",
        gender: "",
        blood_group: "",
        phone: "",
        email: "",
        address: "",
        emergency_contact: "",
        department: "",
        qualification: "",
        username: "",
        password: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
   const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));

    // Clear validation error when user starts correcting the field
    setErrors((prev) => ({
        ...prev,
        [name]: ""
    }));

    setError("");
};
        useEffect(() => {
    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();

            // Only active departments
            const activeDepartments = data.filter(
                (department) => department.is_active
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

   const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
        newErrors.name = "Name should contain only letters.";
    } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters.";
    }

    // Date of Birth
    if (!formData.date_of_birth) {
        newErrors.date_of_birth = "Date of birth is required.";
    } else {
        const dob = new Date(formData.date_of_birth);
        const today = new Date();

        if (dob > today) {
            newErrors.date_of_birth = "Date of birth cannot be in the future.";
        }
    }

    // Gender
    if (!formData.gender) {
        newErrors.gender = "Please select a gender.";
    }

    // Phone
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    // Email
    if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
        newErrors.email = "Enter a valid email address.";
    }

    // Department
    if (!formData.department) {
        newErrors.department = "Please select a department.";
    }

    // Qualification
    if (
        formData.qualification.trim() &&
        !/^[A-Za-z0-9\s.,&()+/-]+$/.test(
            formData.qualification.trim()
        )
    ) {
        newErrors.qualification = "Enter a valid qualification.";
    }

    // Emergency Contact
    if (
        formData.emergency_contact.trim() &&
        !/^\d{10}$/.test(formData.emergency_contact.trim())
    ) {
        newErrors.emergency_contact =
            "Emergency contact must contain exactly 10 digits.";
    }

    // Username
    if (!formData.username.trim()) {
        newErrors.username = "Username is required.";
    } else if (
        !/^[A-Za-z0-9_]{4,30}$/.test(formData.username.trim())
    ) {
        newErrors.username =
            "Username must be 4-30 characters and contain only letters, numbers, or underscore.";
    }

    // Password
    if (!formData.password) {
        newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
        newErrors.password =
            "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

   const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Frontend validation
    if (!validateForm()) {
        return;
    }

    setLoading(true);

    try {

        const newStaff = await addStaff(formData);

        console.log("STAFF CREATED:", newStaff);

        if (onStaffAdded) {
            onStaffAdded(newStaff);
        }

        onClose();

    } catch (error) {

        console.error("Error adding staff:", error);

        if (error.response?.data) {
            setError(
                JSON.stringify(error.response.data)
            );
        } else {
            setError(
                "Failed to add staff. Please try again."
            );
        }

    } finally {

        setLoading(false);

    }
};

    return (
        <div className="add-staff-overlay">

            <div className="add-staff-card">

                {/* Header */}
                <div className="add-staff-header">

                    <h2>Add Staff</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter staff name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                         {errors.name && (
        <span className="field-error">
            {errors.name}
        </span>
    )}

                    </div>

                    <div className="form-row">

                        {/* Date of Birth */}
                        <div className="form-group">

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

                        {/* Gender */}
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

                    <div className="form-row">

                        {/* Phone */}
                        <div className="form-group">

                            <label>Phone</label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

  {errors.phone && (
        <span className="field-error">
            {errors.phone}
        </span>
    )}


                        </div>

                        {/* Email */}
                        <div className="form-group">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                              {errors.email && (
        <span className="field-error">
            {errors.email}
        </span>
    )}

                        </div>

                    </div>

                    {/* Department */}
                    <div className="form-group">

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

                    </div>

                    {/* Qualification */}
                    <div className="form-group">

                        <label>Qualification</label>

                        <input
                            type="text"
                            name="qualification"
                            placeholder="Enter qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                        />

                        {errors.qualification && (
    <span className="field-error">
        {errors.qualification}
    </span>
)}

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
                            placeholder="Enter address"
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
                            placeholder="Enter emergency contact"
                            value={formData.emergency_contact}
                            onChange={handleChange}
                        />

                        {errors.emergency_contact && (
    <span className="field-error">
        {errors.emergency_contact}
    </span>
)}

                    </div>

                    {/* Username */}
                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        {errors.username && (
    <span className="field-error">
        {errors.username}
    </span>
)}

                    </div>

                    {/* Password */}
                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {errors.password && (
    <span className="field-error">
        {errors.password}
    </span>
)}

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

                        </select>

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="staff-error">
                            {error}
                        </p>
                    )}

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
                            {loading ? "Adding..." : "Add Staff"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddStaff;
