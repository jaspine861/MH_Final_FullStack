import { useState } from "react";
import "./EditPatientPopup.css";
import { updatePatient } from "../../services/patientService";

function EditPatientPopup({ patient, onClose, onUpdated }) {

    const [formData, setFormData] = useState({
        full_name: patient?.full_name || "",
        date_of_birth: patient?.date_of_birth || "",
        gender: patient?.gender || "",
        blood_group: patient?.blood_group || "",
        phone: patient?.phone || "",
        email: patient?.email || "",
        address: patient?.address || "",
        emergency_contact: patient?.emergency_contact || "",
        allergies: patient?.allergies || "",
        status: patient?.status || "Active"
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setSaving(true);

        console.log("PATIENT TO UPDATE:", patient);
        console.log("PATIENT ID:", patient.patient_id);

        const updatedPatient = await updatePatient(
            patient.patient_id,
            formData
        );

        console.log(
            "UPDATED PATIENT:",
            updatedPatient
        );

        alert("Patient updated successfully.");

        if (onUpdated) {
            onUpdated(updatedPatient);
        }

        onClose();

    } catch (error) {

        console.error(
            "UPDATE PATIENT ERROR:",
            error.response?.data || error
        );

        alert("Failed to update patient.");

    } finally {

        setSaving(false);

    }
};

    return (

        <div className="edit-patient-overlay">

            <div className="edit-patient-popup">

                {/* Header */}

                <div className="edit-patient-header">

                    <div>

                        <h2>
                            Edit Patient
                        </h2>

                        <p>
                            Patient ID: P
                            {String(patient.patient_id).padStart(3, "0")}
                        </p>

                    </div>

                    <button
                        className="edit-patient-close"
                        onClick={onClose}
                        disabled={saving}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="edit-patient-form">


                        {/* Full Name */}

                        <div className="edit-form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Date of Birth */}

                        <div className="edit-form-group">

                            <label>
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Gender */}

                        <div className="edit-form-group">

                            <label>
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Gender
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


                        {/* Blood Group */}

                        <div className="edit-form-group">

                            <label>
                                Blood Group
                            </label>

                            <select
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Blood Group
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


                        {/* Phone */}

                        <div className="edit-form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Email */}

                        <div className="edit-form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Emergency Contact */}

                        <div className="edit-form-group">

                            <label>
                                Emergency Contact
                            </label>

                            <input
                                type="text"
                                name="emergency_contact"
                                value={formData.emergency_contact}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Status */}

                        <div className="edit-form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Admitted">
                                    Admitted
                                </option>

                                <option value="Discharged">
                                    Discharged
                                </option>

                            </select>

                        </div>


                        {/* Address */}

                        <div className="edit-form-group full-width">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                            />

                        </div>


                        {/* Allergies */}

                        <div className="edit-form-group full-width">

                            <label>
                                Allergies
                            </label>

                            <textarea
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Enter allergies..."
                            />

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="edit-patient-actions">

                        <button
                            type="button"
                            className="edit-cancel-button"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-save-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Changes"}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditPatientPopup;
