import { useEffect, useState } from "react";
import "./PrescriptionManagement.css";

import {
    getPrescribedMedicines,
} from "../../services/prescribedMedicineService";

import DispenseMedicinesPopup from "./DispenseMedicinesPopup";

function PrescriptionManagement() {

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedPrescription, setSelectedPrescription] =
        useState(null);

    const [prescriptions, setPrescriptions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    // Fetch prescribed medicines
    useEffect(() => {

        const fetchPrescriptions = async () => {

            try {

                const data =
                    await getPrescribedMedicines();

                console.log(
                    "PRESCRIBED MEDICINES:",
                    data
                );

                setPrescriptions(data);

            } catch (error) {

                console.error(
                    "Error fetching prescribed medicines:",
                    error.response?.data || error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPrescriptions();

    }, []);


    // Search
    const filteredPrescriptions =
        prescriptions.filter(
            (prescription) => {

                const search =
                    searchTerm.toLowerCase();

                return (

                    String(
                        prescription.patient_id || ""
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(
                        prescription.doctor_id || ""
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(
                        prescription.medicine_name || ""
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(
                        prescription.status || ""
                    )
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    // Open popup
    const handleOpenPrescription = (prescription) => {

        console.log(
            "OPEN PRESCRIPTION:",
            prescription
        );

        setSelectedPrescription(prescription);

    };


    return (

        <div className="prescription-section">


            {/* Search */}

            <div className="prescription-controls">

                <div className="prescription-search-container">

                    <span className="prescription-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search prescription..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* Loading */}

            {loading ? (

                <p>
                    Loading prescriptions...
                </p>

            ) : (

                <div className="prescription-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>Patient</th>

                                <th>Doctor</th>

                                <th>Prescription</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                filteredPrescriptions.length > 0
                                    ? (

                                        filteredPrescriptions.map(
                                            (prescription) => (

                                                <tr
                                                    key={
                                                        prescription.prescription_id
                                                    }
                                                >

                                                    {/* Patient */}

                                                    <td>

                                                        P
                                                        {
                                                            String(
                                                                prescription.patient_id || ""
                                                            ).padStart(
                                                                3,
                                                                "0"
                                                            )
                                                        }

                                                    </td>


                                                    {/* Doctor */}

                                                    <td>

                                                        {
                                                            prescription.doctor_id ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* Prescription */}

                                                    <td>

                                                        {
                                                            prescription.medicine_name ||
                                                            "-"
                                                        }

                                                        {
                                                            prescription.dosage &&
                                                            ` - ${prescription.dosage}`
                                                        }

                                                    </td>


                                                    {/* Status */}

                                                    <td>

                                                        <span
                                                            className={`prescription-status ${
                                                                prescription.status
                                                                    ?.toLowerCase()
                                                            }`}
                                                        >

                                                            {
                                                                prescription.status ===
                                                                "completed"
                                                                    ? "Completed"
                                                                    : "Pending"
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* Action */}

                                                    <td>

                                                        <button
                                                            className="prescription-action-button"

                                                            disabled={
                                                                prescription.status
                                                                    ?.toLowerCase() ===
                                                                "completed"
                                                            }

                                                            onClick={() =>
                                                                handleOpenPrescription(
                                                                    prescription
                                                                )
                                                            }
                                                        >

                                                            {
                                                                prescription.status
                                                                    ?.toLowerCase() ===
                                                                "completed"
                                                                    ? "Completed"
                                                                    : "Open"
                                                            }

                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "25px"
                                                }}
                                            >

                                                No prescriptions found

                                            </td>

                                        </tr>

                                    )
                            }

                        </tbody>

                    </table>

                </div>

            )}


            {/* Dispense Medicines Popup */}

            {
                selectedPrescription && (

                <DispenseMedicinesPopup
    prescription={selectedPrescription}
    onClose={() => setSelectedPrescription(null)}
    onPaymentSuccess={() => {
        setPrescriptions((prev) =>
            prev.map((item) =>
                item.consultation_id === selectedPrescription.consultation_id
                    ? { ...item, status: "completed" }
                    : item
            )
        );
    }}
/>

                )
            }

        </div>

    );

}

export default PrescriptionManagement;
