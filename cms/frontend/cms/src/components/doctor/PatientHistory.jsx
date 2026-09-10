import { useEffect, useState } from "react";
import { getPatientHistory } from "../../services/consultationService";
import "./PatientHistory.css";

function PatientHistory({
    patientId,
    onClose
}) {

   const [history, setHistory] = useState({
    consultations: [],
    lab_reports: []
});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadHistory = async () => {

            try {

                const data = await getPatientHistory(
                    patientId
                );

                console.log(
                    "PATIENT HISTORY:",
                    data
                );

                setHistory(data);

            } catch (error) {

                console.error(
                    "PATIENT HISTORY ERROR:",
                    error
                );

                alert(
                    "Failed to load patient history."
                );

            } finally {

                setLoading(false);

            }
        };

        loadHistory();

    }, [patientId]);


    return (

        <div className="history-overlay">

            <div className="history-card">

                {/* HEADER */}

                <div className="history-header">

                    <div>

                        <h2>
                            Patient History
                        </h2>

                        <p>
                            Previous consultations and
                            laboratory reports
                        </p>

                    </div>

                    <button
                        type="button"
                        className="history-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* BODY */}

                {loading ? (

                    <div className="history-loading">

                        Loading patient history...

                    </div>

                ) : (

                    <div className="history-body">

                        {/* ================================= */}
                        {/* CONSULTATION HISTORY */}
                        {/* ================================= */}

                        <div className="history-section">

                            <h3>
                                Previous Consultations
                            </h3>


                            {history?.consultations?.length === 0 ? (

                                <div className="history-empty">

                                    No previous consultations found.

                                </div>

                            ) : (

                                history?.consultations?.map(
                                    (item) => (

                                        <div
                                            className="consultation-history-card"
                                            key={
                                                item.consultation_id
                                            }
                                        >

                                            <div className="history-item-header">

                                                <h4>
                                                    Consultation #
                                                    {
                                                        item.consultation_id
                                                    }
                                                </h4>

                                                <span>
                                                    {
                                                        item.consultation_date
                                                    }
                                                </span>

                                            </div>


                                            <div className="history-detail">

                                                <strong>
                                                    Diagnosis
                                                </strong>

                                                <p>
                                                    {
                                                        item.diagnosis
                                                    }
                                                </p>

                                            </div>


                                            <div className="history-detail">

                                                <strong>
                                                    Symptoms
                                                </strong>

                                                <p>
                                                    {
                                                        item.symptoms
                                                    }
                                                </p>

                                            </div>


                                            {item.doctor_notes && (

                                                <div className="history-detail">

                                                    <strong>
                                                        Doctor Notes
                                                    </strong>

                                                    <p>
                                                        {
                                                            item.doctor_notes
                                                        }
                                                    </p>

                                                </div>

                                            )}


                                            {item.medical_advice && (

                                                <div className="history-detail">

                                                    <strong>
                                                        Medical Advice
                                                    </strong>

                                                    <p>
                                                        {
                                                            item.medical_advice
                                                        }
                                                    </p>

                                                </div>

                                            )}


                                            {/* MEDICINES */}

                                            {item.prescribed_medicines?.length > 0 && (

                                                <div className="history-detail">

                                                    <strong>
                                                        Prescribed Medicines
                                                    </strong>

                                                    <ul>

                                                        {item.prescribed_medicines.map(
                                                            (medicine) => (

                                                                <li
                                                                    key={
                                                                        medicine.prescription_id
                                                                    }
                                                                >

                                                                    {medicine.medicine_name}

                                                                    {" - "}

                                                                    {medicine.dosage}

                                                                    {" - "}

                                                                    {medicine.duration}

                                                                    {" days"}

                                                                </li>

                                                            )
                                                        )}

                                                    </ul>

                                                </div>

                                            )}


                                            {/* TESTS */}

                                            {item.prescribed_tests?.length > 0 && (

                                                <div className="history-detail">

                                                    <strong>
                                                        Prescribed Tests
                                                    </strong>

                                                    <ul>

                                                        {item.prescribed_tests.map(
                                                            (test) => (

                                                                <li
                                                                    key={
                                                                        test.lab_prescription_id
                                                                    }
                                                                >

                                                                    {test.test_name}

                                                                    {" - "}

                                                                    <span>
                                                                        {
                                                                            test.status
                                                                        }
                                                                    </span>

                                                                </li>

                                                            )
                                                        )}

                                                    </ul>

                                                </div>

                                            )}

                                        </div>

                                    )
                                )

                            )}

                        </div>


                        {/* ================================= */}
                        {/* LAB REPORTS */}
                        {/* ================================= */}

                        <div className="history-section">

                            <h3>
                                Laboratory Reports
                            </h3>


                            {history?.lab_reports?.length === 0 ? (

                                <div className="history-empty">

                                    No laboratory reports found.

                                </div>

                            ) : (

                                history?.lab_reports?.map(
                                    (report) => (

                                        <div
                                            className="lab-report-card"
                                            key={
                                                report.lab_prescription_id
                                            }
                                        >

                                            <div className="history-item-header">

                                                <h4>
                                                    {
                                                        report.test_name
                                                    }
                                                </h4>

                                                <span>
                                                    {
                                                        report.report_date
                                                    }
                                                </span>

                                            </div>


                                            <p>

                                                <strong>
                                                    Status:
                                                </strong>{" "}

                                                {
                                                    report.status
                                                }

                                            </p>


                                            <div className="lab-results">

                                                <strong>
                                                    Results
                                                </strong>

                                                <pre>
                                                    {JSON.stringify(
                                                        report.results,
                                                        null,
                                                        2
                                                    )}
                                                </pre>

                                            </div>


                                            {report.technician_notes && (

                                                <div>

                                                    <strong>
                                                        Technician Notes
                                                    </strong>

                                                    <p>
                                                        {
                                                            report.technician_notes
                                                        }
                                                    </p>

                                                </div>

                                            )}

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}

export default PatientHistory;