


import { useState, useEffect } from "react";
import "./AddDoctor.css";
import { addDoctor } from "../../services/doctorService";
import { getDepartments } from "../../services/departmentService";

function AddDoctor({ onClose, onDoctorAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        fees: "",
        experience: "",
        username: "",
        password: "",
        date_of_birth: "",
        gender: "",
        phone: "",
        email: "",
        blood_group: "",
        address: "",
        emergency_contact: ""
    });
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState([]);

    const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });

    // Clear error when user starts correcting the field
    setErrors({
        ...errors,
        [name]: ""
    });
};

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments();

                console.log("DEPARTMENT API DATA:", data);

                const activeDepartments = data.filter(
                    (department) => department.is_active === true
                );

                console.log("ACTIVE DEPARTMENTS:", activeDepartments);

                setDepartments(activeDepartments);

            } catch (error) {
                console.error(
                    "Error fetching departments:",
                    error.response?.data || error
                );
            }
        };

        fetchDepartments();
    }, []);
     
const validateForm = () => {

    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
        newErrors.name = "Doctor name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
        newErrors.name = "Name should contain only letters";
    } else if (formData.name.trim().length < 3) {
        newErrors.name = "Name must be at least 3 characters";
    }

    // Department
    if (!formData.department) {
        newErrors.department = "Please select a department";
    }

    // Fees
    if (formData.fees === "") {
        newErrors.fees = "Fees is required";
    } else if (Number(formData.fees) < 0) {
        newErrors.fees = "Fees cannot be negative";
    }

    // Experience
    if (formData.experience === "") {
        newErrors.experience = "Experience is required";
    } else if (Number(formData.experience) < 0) {
        newErrors.experience = "Experience cannot be negative";
    }

    // Username
    if (!formData.username.trim()) {
        newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 4) {
        newErrors.username = "Username must be at least 4 characters";
    }

    // Password
    if (!formData.password) {
        newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
    }

    // Date of birth
    if (!formData.date_of_birth) {
        newErrors.date_of_birth = "Date of birth is required";
    } else {
        const today = new Date();
        const selectedDate = new Date(formData.date_of_birth);

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            newErrors.date_of_birth = "Date of birth cannot be in the future";
        }
    }

    // Gender
    if (!formData.gender) {
        newErrors.gender = "Please select gender";
    }

    // Phone
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number must contain exactly 10 digits";
    }

    // Email
    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
        newErrors.email = "Enter a valid email address";
    }

    // Emergency contact
    if (formData.emergency_contact.trim()) {
        if (!/^\d{10}$/.test(formData.emergency_contact.trim())) {
            newErrors.emergency_contact =
                "Emergency contact must contain exactly 10 digits";
        }
    }

    // Blood group
    if (
        formData.blood_group &&
        !["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
            .includes(formData.blood_group)
    ) {
        newErrors.blood_group = "Invalid blood group";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

   const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    try {

        setLoading(true);

        const newDoctor = await addDoctor(formData);

        console.log("Doctor added:", newDoctor);

        onDoctorAdded(newDoctor);

        onClose();

    } catch (error) {

        console.error("Error adding doctor:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        alert("Failed to add doctor");

    } finally {

        setLoading(false);
    }
};

    return (
        <div className="add-doctor-overlay">

            <div className="add-doctor-card">

                <div className="add-doctor-header">

                    <h2>Add Doctor</h2>

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

                        <label>Doctor Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter doctor name"
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
                                placeholder="Enter consultation fees"
                                value={formData.fees}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />

                            {errors.fees && (
    <span className="field-error">
        {errors.fees}
    </span>
)}

                        </div>

                    </div>


                    {/* Experience + Username */}
                    <div className="form-row">

                        <div className="form-group">

                            <label>Experience (Years)</label>

                            <input
                                type="number"
                                name="experience"
                                placeholder="Enter experience"
                                value={formData.experience}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                            {errors.experience && (
    <span className="field-error">
        {errors.experience}
    </span>
)}

                        </div>


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

                            {errors.date_of_birth && (
    <span className="field-error">
        {errors.date_of_birth}
    </span>
)}

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
                            {loading ? "Adding..." : "Add Doctor"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddDoctor;