import "./PatientReportPopup.css";

function PatientReportPopup({ report, onClose }) {

    if (!report) return null;

    return (
        <div className="patient-report-popup-overlay">

            <div className="patient-report-popup">

                {/* Header */}
                <div className="patient-report-popup-header">

                    <h2>Patient Report</h2>

                    <button
                        className="patient-report-popup-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Report Information */}
                <div className="patient-report-info">

                    <div className="patient-report-info-item">
                        <label>Report ID</label>
                        <span>{report.report_id}</span>
                    </div>

                    <div className="patient-report-info-item">
                        <label>Patient</label>
                        <span>
                            P
                            {String(report.patient_id).padStart(3, "0")}
                        </span>
                    </div>

                    <div className="patient-report-info-item">
                        <label>Test</label>
                        <span>{report.test_name}</span>
                    </div>

                    <div className="patient-report-info-item">
                        <label>Doctor</label>
                        <span>{report.doctor_id || "-"}</span>
                    </div>

                    <div className="patient-report-info-item">
                        <label>Date</label>
                        <span>{report.date}</span>
                    </div>

                    <div className="patient-report-info-item">
                        <label>Status</label>

                        <span
                            className={`popup-report-status ${
                                report.status
                                    .toLowerCase()
                                    .replace(" ", "-")
                            }`}
                        >
                            {report.status}
                        </span>

                    </div>

                </div>


                {/* Test Results */}
                <div className="patient-report-results">

                    <h3>Test Results</h3>

                    {Object.keys(report.results || {}).length > 0 ? (

                        <div className="patient-report-results-list">

                            {Object.entries(report.results).map(
                                ([parameter, value]) => (

                                    <div
                                        className="patient-report-result-row"
                                        key={parameter}
                                    >

                                        <span className="result-parameter">
                                            {parameter}
                                        </span>

                                        <span className="result-value">
                                            {value || "-"}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="no-results">
                            No test results available.
                        </p>

                    )}

                </div>


                {/* Technician Notes */}
                <div className="patient-report-technician-notes">

                    <h3>Technician Notes</h3>

                    <div className="technician-notes-box">

                        {report.technician_notes
                            ? report.technician_notes
                            : "No technician notes available."}

                    </div>

                </div>


                {/* Footer */}
                <div className="patient-report-popup-actions">

                    <button
                        className="patient-report-close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PatientReportPopup;
