
import { useEffect, useState } from "react";
import "./PatientReport.css";
import { getPrescribedTests } from "../../services/prescribedTestService";
import PatientReportPopup from "./PatientReportPopup";

function PatientReport() {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const data = await getPrescribedTests();

                console.log("REPORT DATA:", data);

                const reportData = data
                    .filter((item) => item.status === "completed")
                    .map((item) => ({
                        report_id: `REP${String(
                            item.lab_prescription_id
                        ).padStart(3, "0")}`,

                        lab_prescription_id:
                            item.lab_prescription_id,

                        patient_id:
                            item.patient_id,

                        test_name:
                            item.test_name,

                        doctor_id:
                            item.doctor_id,

                        date:
                            item.report_date || "-",

                        status:
                            item.status === "completed"
                                ? "Completed"
                                : "Under Review",

                        results:
                            item.results || {},

                        technician_notes:
                            item.technician_notes || "",
                    }));

                setReports(reportData);

            } catch (error) {
                console.error(
                    "Error loading reports:",
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);


    const filteredReports = reports.filter((report) => {

        const matchesStatus =
            selectedFilter === "All" ||
            report.status === selectedFilter;

        const search =
            searchTerm.toLowerCase();

        const matchesSearch =
            String(report.report_id)
                .toLowerCase()
                .includes(search) ||

            String(report.patient_id)
                .toLowerCase()
                .includes(search) ||

            String(report.test_name)
                .toLowerCase()
                .includes(search) ||

            String(report.doctor_id)
                .toLowerCase()
                .includes(search);

        return matchesStatus && matchesSearch;
    });


 const handleViewReport = (report) => {
    setSelectedReport(report);
};


    return (
        <div className="patient-report-section">

            <div className="patient-report-controls">

                <div className="report-filter-container">

                    <button
                        className={`report-filter-button ${
                            showFilter
                                ? "report-filter-active"
                                : ""
                        }`}
                        onClick={() =>
                            setShowFilter(!showFilter)
                        }
                    >
                        <span>⚱</span>
                        Filter
                    </button>

                    {showFilter && (

                        <div className="report-filter-options">

                            {[
                                "All",
                                "Completed",
                                "Under Review"
                            ].map((option) => (

                                <button
                                    key={option}
                                    className={
                                        selectedFilter === option
                                            ? "report-filter-option selected"
                                            : "report-filter-option"
                                    }
                                    onClick={() => {
                                        setSelectedFilter(option);
                                        setShowFilter(false);
                                    }}
                                >
                                    {option}
                                </button>

                            ))}

                        </div>

                    )}

                </div>


                <div className="report-search-container">

                    <span className="report-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>


            {loading ? (

                <p>Loading reports...</p>

            ) : (

                <div className="patient-report-table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Patient</th>
                                <th>Test</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        <tbody>

                            {filteredReports.length > 0 ? (

                                filteredReports.map(
                                    (report) => (

                                        <tr
                                            key={
                                                report.lab_prescription_id
                                            }
                                        >

                                            <td>
                                                {
                                                    report.report_id
                                                }
                                            </td>

                                            <td>
                                                P
                                                {String(
                                                    report.patient_id
                                                ).padStart(
                                                    3,
                                                    "0"
                                                )}
                                            </td>

                                            <td>
                                                {
                                                    report.test_name
                                                }
                                            </td>

                                            <td>
                                                {
                                                    report.doctor_id ||
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                {
                                                    report.date
                                                }
                                            </td>

                                            <td>

                                                <span
                                                    className={`report-status ${
                                                        report.status
                                                            .toLowerCase()
                                                            .replace(
                                                                " ",
                                                                "-"
                                                            )
                                                    }`}
                                                >
                                                    {
                                                        report.status
                                                    }
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="report-action-button"
                                                    onClick={() =>
                                                        handleViewReport(
                                                            report
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign:
                                                "center",
                                            padding:
                                                "25px"
                                        }}
                                    >
                                        No reports found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
        {selectedReport && (
    <PatientReportPopup
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
    />
)}
        </div>
    );
}

export default PatientReport;
