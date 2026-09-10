import { useEffect, useState } from "react";
import "./ConsultationPopup.css";
import PatientHistory from "./PatientHistory";
import { createConsultation } from "../../services/consultationService";
import { getMedicines } from "../../services/medicineService";
import { getTests } from "../../services/testService";
import { getPatientHistory } from "../../services/consultationService";
function ConsultationPopup({
      appointment,
    consultation,
    mode,
    onClose,
    onConsultationCompleted
}) {

    const [medicines, setMedicines] = useState([]);
    const [tests, setTests] = useState([]);
   const [showPatientHistory, setShowPatientHistory] =
    useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [saving, setSaving] = useState(false);

    /* ============================= */
    /* BASIC CONSULTATION DATA */
    /* ============================= */

    const [formData, setFormData] = useState({
        appointment: appointment?.appointment_id || "",
        patient_id: appointment?.patient_id || "",
        doctor_id: localStorage.getItem("doctorId") || "",

        symptoms: appointment?.reason || "",
        diagnosis: "",
        doctor_notes: "",
        medical_advice: "",

        consultation_date:
            new Date().toISOString().split("T")[0],

        follow_up_date: "",
        notes: ""
    });


    /* ============================= */
    /* PRESCRIBED MEDICINES */
    /* ============================= */

    const [prescribedMedicines, setPrescribedMedicines] =
        useState([]);


    /* ============================= */
    /* PRESCRIBED TESTS */
    /* ============================= */

    const [prescribedTests, setPrescribedTests] =
        useState([]);

          useEffect(() => {

    if (!consultation) {
        return;
    }

    console.log("LOADED CONSULTATION:", consultation);

    setFormData({
        appointment: consultation.appointment || "",
        patient_id: consultation.patient_id || "",
        doctor_id: consultation.doctor_id || "",
        symptoms: consultation.symptoms || "",
        diagnosis: consultation.diagnosis || "",
        doctor_notes: consultation.doctor_notes || "",
        medical_advice: consultation.medical_advice || "",
        consultation_date:
            consultation.consultation_date || "",
        follow_up_date:
            consultation.follow_up_date || "",
        notes: consultation.notes || ""
    });

    setPrescribedMedicines(
        consultation.prescribed_medicines || []
    );

    setPrescribedTests(
        consultation.prescribed_tests || []
    );

}, [consultation]);
    /* ============================= */
    /* LOAD MEDICINES + TESTS */
    /* ============================= */

    useEffect(() => {

        const loadData = async () => {

            try {

                const [medicineData, testData] =
                    await Promise.all([
                        getMedicines(),
                        getTests()
                    ]);

                console.log(
                    "MEDICINES:",
                    medicineData
                );

                console.log(
                    "TESTS:",
                    testData
                );

                setMedicines(medicineData);
                setTests(testData);

            } catch (error) {

                console.error(
                    "Error loading medicines/tests:",
                    error
                );

                alert(
                    "Failed to load medicines and tests."
                );

            } finally {

                setLoadingData(false);

            }
        };

        loadData();

    }, []);


    /* ============================= */
    /* NORMAL FORM CHANGE */
    /* ============================= */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    /* ============================= */
    /* ADD MEDICINE */
    /* ============================= */

    const addMedicineRow = () => {

        setPrescribedMedicines((prev) => [

            ...prev,

            {
                medicine_id: "",
                medicine_name: "",
                dosage: "",

                morning: false,
                afternoon: false,
                night: false,

                food_timing: "",

                duration: ""
            }

        ]);

    };


    /* ============================= */
    /* REMOVE MEDICINE */
    /* ============================= */

    const removeMedicineRow = (index) => {

        setPrescribedMedicines((prev) =>
            prev.filter((_, i) => i !== index)
        );

    };


    /* ============================= */
    /* MEDICINE CHANGE */
    /* ============================= */

    const handleMedicineChange = (
        index,
        field,
        value
    ) => {

        setPrescribedMedicines((prev) => {

            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                [field]: value
            };

            return updated;

        });

    };


    /* ============================= */
    /* SELECT MEDICINE */
    /* ============================= */

    // const handleMedicineSelect = (
    //     index,
    //     medicineId
    // ) => {

    //     const selectedMedicine =
    //         medicines.find(
    //             (medicine) =>
    //                 String(medicine.medicine_id) ===
    //                 String(medicineId)
    //         );

    //     if (!selectedMedicine) {
    //         return;
    //     }

    //     setPrescribedMedicines((prev) => {

    //         const updated = [...prev];

    //         updated[index] = {

    //             ...updated[index],

    //             medicine_id:
    //                 selectedMedicine.medicine_id,

    //             medicine_name:
    //                 selectedMedicine.medicine_name

    //         };

    //         return updated;

    //     });

    // };
const handleMedicineSelect = (index, medicineId) => {

    const selectedMedicine = medicines.find(
        (medicine) =>
            String(medicine.medicine_id) === String(medicineId)
    );

    if (!selectedMedicine) {
        return;
    }

    setPrescribedMedicines((prev) => {

        const updated = [...prev];

        updated[index] = {
            ...updated[index],

            medicine_id:
                selectedMedicine.medicine_id,

            medicine_name:
                selectedMedicine.medicine_name,

            price:
                Number(selectedMedicine.price || 0)
        };

        return updated;
    });
};

    /* ============================= */
    /* ADD TEST */
    /* ============================= */

   const addTestRow = () => {
    setPrescribedTests((prev) => [
        ...prev,
        {
            test_id: "",
            test_name: ""
        }
    ]);
};


    /* ============================= */
    /* REMOVE TEST */
    /* ============================= */

    const removeTestRow = (index) => {

        setPrescribedTests((prev) =>
            prev.filter((_, i) => i !== index)
        );

    };


    /* ============================= */
    /* SELECT TEST */
    /* ============================= */

const handleTestSelect = (index, testId) => {
    const selectedTest = tests.find(
        (test) => String(test.test_id) === String(testId)
    );

    if (!selectedTest) return;

    setPrescribedTests((prev) => {
        const updated = [...prev];

        updated[index] = {
            ...updated[index],
            test_id: selectedTest.test_id,
            test_name: selectedTest.test_name,
        };

        return updated;
    });
};


    /* ============================= */
    /* TEST STATUS CHANGE */
    /* ============================= */

   


    /* ============================= */
    /* SUBMIT */
    /* ============================= */

   const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setSaving(true);

        const consultationData = {

            appointment:
                formData.appointment,

            patient_id:
                Number(formData.patient_id),

            doctor_id:
                formData.doctor_id,

            symptoms:
                formData.symptoms,

            diagnosis:
                formData.diagnosis,

            doctor_notes:
                formData.doctor_notes,

            medical_advice:
                formData.medical_advice,

            consultation_date:
                formData.consultation_date,

            follow_up_date:
                formData.follow_up_date || null,

            notes:
                formData.notes,

            prescribed_medicines:
                prescribedMedicines,

            prescribed_tests:
                prescribedTests
                    .filter(
                        (test) =>
                            test.test_id !== "" &&
                            test.test_id !== null &&
                            test.test_id !== undefined
                    )
                    .map((test) => ({
                        test_id: test.test_id
                    }))
        };

        console.log(
            "CONSULTATION DATA:",
            consultationData
        );

        console.log(
            "TEST PAYLOAD:",
            JSON.stringify(
                consultationData.prescribed_tests,
                null,
                2
            )
        );

        const data = await createConsultation(
            consultationData
        );

        console.log(
            "CONSULTATION CREATED:",
            data
        );

        if (onConsultationCompleted) {
            onConsultationCompleted(data);
        }

        alert(
            "Consultation completed successfully!"
        );

        onClose();

    } catch (error) {

        console.log(
            "CONSULTATION ERROR FULL:",
            JSON.stringify(
                error.response?.data || error,
                null,
                2
            )
        );

        alert(
            JSON.stringify(
                error.response?.data ||
                "Failed to save consultation."
            )
        );

    } finally {

        setSaving(false);

    }
};


    return (

        <div className="consultation-overlay">

            <div className="consultation-card">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="consultation-header">

                    <div>

                        <h2>
                            Start Consultation
                        </h2>

                        <p>
                            Enter consultation details
                            for the patient
                        </p>

                    </div>


                    {/* <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button> */}
                    <div className="header-actions">

    <button
        type="button"
        className="patient-history-button"
        onClick={() => setShowPatientHistory(true)}
    >
        📋 Patient History
    </button>

    <button
        type="button"
        className="close-button"
        onClick={onClose}
    >
        ×
    </button>

</div>
                </div>


                {/* ================================= */}
                {/* LOADING */}
                {/* ================================= */}

                {loadingData ? (

                    <div className="consultation-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading medicines and tests...
                        </p>

                    </div>

                ) : (


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* ================================= */}
                        {/* SCROLLABLE BODY */}
                        {/* ================================= */}

                        <div className="consultation-body">


                            {/* ================================= */}
                            {/* CONSULTATION DETAILS */}
                            {/* ================================= */}

                            <div className="form-section">

                                <div className="section-title">

                                    <div>

                                        <h3>
                                            Consultation Details
                                        </h3>

                                        <p>
                                            Patient information and
                                            consultation findings
                                        </p>

                                    </div>

                                </div>


                                <div className="consultation-form">


                                    {/* Appointment ID */}

                                    <div className="form-group">

                                        <label>
                                            Appointment ID
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                formData.appointment
                                            }
                                            readOnly
                                        />

                                    </div>


                                    {/* Patient ID */}

                                    <div className="form-group">

                                        <label>
                                            Patient ID
                                        </label>

                                        <input
                                            type="text"
                                            value={`P${String(
                                                formData.patient_id
                                            ).padStart(3, "0")}`}
                                            readOnly
                                        />

                                    </div>


                                    {/* Symptoms */}

                                    <div className="form-group full-width">

                                        <label>
                                            Symptoms
                                        </label>

                                        <textarea
                                            name="symptoms"
                                            value={
                                                formData.symptoms
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter patient symptoms..."
                                            rows="3"
                                            required
                                        />

                                    </div>


                                    {/* Diagnosis */}

                                    {/* <div className="form-group full-width">

                                        <label>
                                            Diagnosis
                                        </label>

                                        <textarea
                                            name="diagnosis"
                                            value={
                                                formData.diagnosis
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter diagnosis..."
                                            rows="3"
                                            required
                                        />

                                    </div> */}
{/* Diagnosis */}

<div className="form-group full-width">

    <label>
        Diagnosis
        {consultation && (
            <span style={{ marginLeft: "8px", color: "#888", fontSize: "12px" }}>
                (Read Only)
            </span>
        )}
    </label>

    <textarea
        name="diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
        placeholder="Enter diagnosis..."
        rows="3"
        required
        readOnly={!!consultation}
    />

</div>

                                    {/* Doctor Notes */}

                                    <div className="form-group full-width">

                                        <label>
                                            Doctor Notes
                                        </label>

                                        <textarea
                                            name="doctor_notes"
                                            value={
                                                formData.doctor_notes
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter consultation notes..."
                                            rows="3"
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ================================= */}
                            {/* MEDICINES */}
                            {/* ================================= */}

                            <div className="form-section">

                                <div className="section-title">

                                    <div>

                                        <h3>
                                            Prescribed Medicines
                                        </h3>

                                        <p>
                                            Add medicines and dosage
                                            instructions
                                        </p>

                                    </div>


                                    <button
                                        type="button"
                                        className="add-item-button"
                                        onClick={
                                            addMedicineRow
                                        }
                                    >
                                        + Add Medicine
                                    </button>

                                </div>


                                {prescribedMedicines.length === 0 && (

                                    <div className="empty-prescription">

                                        <span>
                                            💊
                                        </span>

                                        <p>
                                            No medicines prescribed
                                        </p>

                                        <small>
                                            Click "Add Medicine" to
                                            prescribe a medicine
                                        </small>

                                    </div>

                                )}


                                {prescribedMedicines.map(
                                    (medicine, index) => (

                                        <div
                                            className="prescription-card"
                                            key={index}
                                        >


                                            <div className="prescription-header">

                                                <span>
                                                    Medicine {index + 1}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="remove-item-button"
                                                    onClick={() =>
                                                        removeMedicineRow(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>

                                            </div>


                                            <div className="prescription-grid">


                                                {/* Medicine */}

                                                <div className="form-group">

                                                    <label>
                                                        Medicine
                                                    </label>

                                                    <select
                                                        value={
                                                            medicine.medicine_id
                                                        }
                                                        onChange={(e) =>
                                                            handleMedicineSelect(
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >

                                                        <option value="">
                                                            Select Medicine
                                                        </option>

                                                        {medicines.map(
                                                            (item) => (

                                                                <option
                                                                    key={
                                                                        item.medicine_id
                                                                    }
                                                                    value={
                                                                        item.medicine_id
                                                                    }
                                                                >
                                                                    {
                                                                        item.medicine_name
                                                                    }
                                                                </option>

                                                            )
                                                        )}

                                                    </select>

                                                </div>


                                                {/* Dosage */}

                                                <div className="form-group">

                                                    <label>
                                                        Dosage (per time)
                                                    </label>

                                                 <input
    type="number"
    min="1"
    placeholder="Example: 1"
    value={medicine.dosage}
    onChange={(e) =>
        handleMedicineChange(
            index,
            "dosage",
            e.target.value
        )
    }
    required
/>

                                                </div>


                                                {/* Duration */}

                                                <div className="form-group">

                                                    <label>
                                                        Dosage (per time)
                                                    </label>

                                                   <input
    type="number"
    min="1"
    placeholder="Example: 5"
    value={medicine.duration}
    onChange={(e) =>
        handleMedicineChange(
            index,
            "duration",
            e.target.value
        )
    }
    required
/>

                                                </div>


                                                {/* Food Timing */}

                                                <div className="form-group">

                                                    <label>
                                                        Food Timing
                                                    </label>

                                                    <select
                                                        value={
                                                            medicine.food_timing
                                                        }
                                                        onChange={(e) =>
                                                            handleMedicineChange(
                                                                index,
                                                                "food_timing",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    >

                                                        <option value="">
                                                            Select
                                                        </option>

                                                        <option value="Before Food">
                                                            Before Food
                                                        </option>

                                                        <option value="After Food">
                                                            After Food
                                                        </option>

                                                    </select>

                                                </div>


                                                {/* ================================= */}
                                                {/* MEDICINE TIME */}
                                                {/* ================================= */}

                                                <div className="medicine-time-group">

                                                    <label>
                                                        Medication Time
                                                    </label>


                                                    <div className="time-options">


                                                        <label
                                                            className={
                                                                medicine.morning
                                                                    ? "time-option active"
                                                                    : "time-option"
                                                            }
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    medicine.morning
                                                                }
                                                                onChange={(e) =>
                                                                    handleMedicineChange(
                                                                        index,
                                                                        "morning",
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />

                                                            <span>
                                                                Morning
                                                            </span>

                                                        </label>


                                                        <label
                                                            className={
                                                                medicine.afternoon
                                                                    ? "time-option active"
                                                                    : "time-option"
                                                            }
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    medicine.afternoon
                                                                }
                                                                onChange={(e) =>
                                                                    handleMedicineChange(
                                                                        index,
                                                                        "afternoon",
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />

                                                            <span>
                                                                Afternoon
                                                            </span>

                                                        </label>


                                                        <label
                                                            className={
                                                                medicine.night
                                                                    ? "time-option active"
                                                                    : "time-option"
                                                            }
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    medicine.night
                                                                }
                                                                onChange={(e) =>
                                                                    handleMedicineChange(
                                                                        index,
                                                                        "night",
                                                                        e.target.checked
                                                                    )
                                                                }
                                                            />

                                                            <span>
                                                                Night
                                                            </span>

                                                        </label>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* ================================= */}
                            {/* LAB TESTS */}
                            {/* ================================= */}

                            <div className="form-section">

                                <div className="section-title">

                                    <div>

                                        <h3>
                                            Prescribed Tests
                                        </h3>

                                        <p>
                                            Select laboratory tests
                                            for the patient
                                        </p>

                                    </div>


                                    <button
                                        type="button"
                                        className="add-item-button"
                                        onClick={
                                            addTestRow
                                        }
                                    >
                                        + Add Test
                                    </button>

                                </div>


                                {prescribedTests.length === 0 && (

                                    <div className="empty-prescription">

                                        <span>
                                            🧪
                                        </span>

                                        <p>
                                            No tests prescribed
                                        </p>

                                        <small>
                                            Click "Add Test" to prescribe
                                            a laboratory test
                                        </small>

                                    </div>

                                )}


                                {prescribedTests.map(
                                    (test, index) => (

                                        <div
                                            className="test-prescription-card"
                                            key={index}
                                        >


                                            <div className="test-number">

                                                Test {index + 1}

                                            </div>


                                            <div className="form-group">

                                                <label>
                                                    Test
                                                </label>

                                                <select
                                                    value={
                                                        test.test_id
                                                    }
                                                    onChange={(e) =>
                                                        handleTestSelect(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                >

                                                    <option value="">
                                                        Select Test
                                                    </option>

                                                    {tests.map(
                                                        (item) => (

                                                            <option
                                                                key={
                                                                    item.test_id
                                                                }
                                                                value={
                                                                    item.test_id
                                                                }
                                                            >
                                                                {
                                                                    item.test_name
                                                                }
                                                            </option>

                                                        )
                                                    )}

                                                </select>

                                            </div>




                                            <button
                                                type="button"
                                                className="remove-test-button"
                                                onClick={() =>
                                                    removeTestRow(
                                                        index
                                                    )
                                                }
                                            >
                                                ×
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>


                            {/* ================================= */}
                            {/* MEDICAL ADVICE */}
                            {/* ================================= */}

                            <div className="form-section">

                                <div className="section-title">

                                    <div>

                                        <h3>
                                            Medical Advice
                                        </h3>

                                        <p>
                                            Additional instructions
                                            for the patient
                                        </p>

                                    </div>

                                </div>


                                <div className="form-group">

                                    <label>
                                        Medical Advice
                                    </label>

                                    <textarea
                                        name="medical_advice"
                                        value={
                                            formData.medical_advice
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter medical advice..."
                                        rows="3"
                                    />

                                </div>

                            </div>


                            {/* ================================= */}
                            {/* FOLLOW UP */}
                            {/* ================================= */}

                            <div className="form-section">

                                <div className="section-title">

                                    <div>

                                        <h3>
                                            Follow-up & Notes
                                        </h3>

                                        <p>
                                            Schedule follow-up and
                                            add additional notes
                                        </p>

                                    </div>

                                </div>


                                <div className="consultation-form">


                                    <div className="form-group">

                                        <label>
                                            Follow-up Date
                                        </label>

                                        <input
                                            type="date"
                                            name="follow_up_date"
                                            value={
                                                formData.follow_up_date
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label>
                                            Consultation Date
                                        </label>

                                        <input
                                            type="date"
                                            name="consultation_date"
                                            value={
                                                formData.consultation_date
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="form-group full-width">

                                        <label>
                                            Additional Notes
                                        </label>

                                        <textarea
                                            name="notes"
                                            value={
                                                formData.notes
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter any additional notes..."
                                            rows="3"
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* FOOTER */}
                        {/* ================================= */}

                        <div className="consultation-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onClose}
                                disabled={saving}
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                className="complete-button"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Complete Consultation"}

                            </button>

                        </div>

                    </form>

                )}

            </div>
          {showPatientHistory && (

    <PatientHistory
        patientId={formData.patient_id}
        onClose={() =>
            setShowPatientHistory(false)
        }
    />

)}
        </div>

    );

}

export default ConsultationPopup;