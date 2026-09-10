import { useState } from "react";
import "./AddPatient.css";
import { addPatient } from "../../services/patientService";
import RegistrationPaymentPopup from "./RegistrationPaymentPopup";
import AddAppointment from "./AddAppointment";
function AddPatient({ onClose, onPatientAdded }) {

    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        bloodGroup: "",
        address: "",
        emergencyContact: "",
        allergies: ""
    });

    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
const [createdPatient, setCreatedPatient] = useState(null);
   const [selectedPatient, setSelectedPatient] = useState(null);
const [showAppointment, setShowAppointment] = useState(false);
    const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));

    setErrors((prev) => ({
        ...prev,
        [name]: ""
    }));
};

const validateForm = () => {

    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
        newErrors.fullName = "Name should contain only letters";
    } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = "Name must be at least 3 characters";
    }

    // Date of Birth
    if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required";
    } else {
        const today = new Date();
        const selectedDate = new Date(formData.dateOfBirth);

        today.setHours(0, 0, 0, 0);

        // if (selectedDate > today) {
        //     newErrors.dateOfBirth =
        //         "Date of birth cannot be in the future";
        // }
    }

    // Gender
    if (!formData.gender) {
        newErrors.gender = "Please select gender";
    }

    // Phone
    if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
        newErrors.phone =
            "Phone number must contain exactly 10 digits";
    }

    // Email - optional
    if (formData.email.trim()) {
        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim()
            )
        ) {
            newErrors.email = "Enter a valid email address";
        }
    }

    // Blood Group
    if (
        formData.bloodGroup &&
        ![
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ].includes(formData.bloodGroup)
    ) {
        newErrors.bloodGroup = "Invalid blood group";
    }

    // Emergency Contact - optional
    if (formData.emergencyContact.trim()) {

        if (
            !/^\d{10}$/.test(
                formData.emergencyContact.trim()
            )
        ) {
            newErrors.emergencyContact =
                "Emergency contact must contain exactly 10 digits";
        }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     setLoading(true);
    //     setError("");

    //     const patientData = {
    //         full_name: formData.fullName,
    //         date_of_birth: formData.dateOfBirth,
    //         gender: formData.gender,
    //         phone: formData.phone,
    //         email: formData.email,
    //         blood_group: formData.bloodGroup,
    //         address: formData.address,
    //         emergency_contact: formData.emergencyContact,
    //         allergies: formData.allergies
    //     };

    //     try {

    //         const newPatient = await addPatient(patientData);

    //         console.log("Patient added:", newPatient);

    //         // Tell PatientList that a new patient was added
    //         if (onPatientAdded) {
    //             onPatientAdded(newPatient);
    //         }

    //         onClose();

    //     } catch (error) {

    //         console.error("Error adding patient:", error);

    //         setError(
    //             error.response?.data
    //                 ? JSON.stringify(error.response.data)
    //                 : "Failed to add patient"
    //         );

    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {

    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
        return;
    }

    setLoading(true);
    setError("");

    const patientData = {
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        blood_group: formData.bloodGroup,
        address: formData.address,
        emergency_contact: formData.emergencyContact,
        allergies: formData.allergies
    };

    try {

        const newPatient = await addPatient(patientData);

        console.log("Patient added:", newPatient);

        // if (onPatientAdded) {
        //     onPatientAdded(newPatient);
        // }

        setCreatedPatient(newPatient);
setShowPaymentPopup(true);

    } catch (error) {

        console.error("Error adding patient:", error);

        setError(
            error.response?.data
                ? JSON.stringify(error.response.data)
                : "Failed to add patient"
        );

    } finally {

        setLoading(false);

    }
};

    return (
        <div className="add-patient-overlay">

            <div className="add-patient-card">

                <div className="add-patient-header">

                    <h2>Add Patient</h2>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <div className="form-group">

                        <label>Full Name</label>

                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                          {errors.fullName && (
        <span className="field-error">
            {errors.fullName}
        </span>
    )}

                    </div>


                    <div className="form-row">

                        {/* Date of Birth */}
                        <div className="form-group">

                            <label>Date of Birth</label>

                            {/* <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            /> */}

                            <input
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleChange}
    max={today}
    required
/>

                            {errors.dateOfBirth && (
    <span className="field-error">
        {errors.dateOfBirth}
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

                        </div>

                    </div>


                    {/* Blood Group */}
                    <div className="form-group">

                        <label>Blood Group</label>

                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
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
                        />

                    </div>


                    {/* Emergency Contact */}
                    <div className="form-group">

                        <label>Emergency Contact</label>

                        <input
                            type="tel"
                            name="emergencyContact"
                            placeholder="Enter emergency contact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                        />

                        {errors.emergencyContact && (
    <span className="field-error">
        {errors.emergencyContact}
    </span>
)}

                    </div>


                    {/* Allergies */}
                    <div className="form-group">

                        <label>Allergies</label>

                        <textarea
                            name="allergies"
                            placeholder="Enter allergies, if any"
                            value={formData.allergies}
                            onChange={handleChange}
                            rows="3"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Patient"}
                        </button>

                    </div>

                </form>

            </div>
        {showPaymentPopup && createdPatient && (
    <RegistrationPaymentPopup
        patient={createdPatient}

        onClose={() => {
            setShowPaymentPopup(false);
        }}

        onPaymentCompleted={() => {

            if (onPatientAdded) {
                onPatientAdded(createdPatient);
            }

            setShowPaymentPopup(false);
            setCreatedPatient(null);
            onClose();

        }}

        onAddAppointment={(patient) => {

            // Close payment/receipt popup
            setShowPaymentPopup(false);

            // Select newly created patient
            setSelectedPatient(patient);

            // Open appointment popup
            setShowAppointment(true);

        }}
    />
)}
{showAppointment && selectedPatient && (
    <AddAppointment
        patient={selectedPatient}

        onClose={() => {
            setShowAppointment(false);
            setSelectedPatient(null);
        }}

        onAppointmentBooked={(appointment) => {

            console.log(
                "Appointment booked:",
                appointment
            );

            setShowAppointment(false);
            setSelectedPatient(null);
        }}
    />
)}
        </div>
    );
}

export default AddPatient;