import { useEffect, useState } from "react";
import "./TestManagement.css";
import TestResultPopup from "./TestResultPopup";
// import {
//     getPrescribedTests,
//     updatePrescribedTestStatus,
// } from "../../services/testService";
import { getPrescribedTests,updatePrescribedTestStatus } from "../../services/prescribedTestService";
import { createLabBill } from "../../services/labBillService";
import LabBillPopup from "./LabBillPopup";
function TestManagement1() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [showFilter, setShowFilter] = useState(false);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTest, setSelectedTest] = useState(null);
    const [generatedBill, setGeneratedBill] = useState(null);

    useEffect(() => {
        const loadTests = async () => {
            try {
                const data = await getPrescribedTests();

                console.log("ACTUAL PRESCRIBED TESTS:", data);

                setTests(data);
            } catch (error) {
                console.error(
                    "Error loading prescribed tests:",
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        loadTests();
    }, []);

  

    const filteredTests = tests.filter((test) => {
        const currentStatus =
            test.status?.toLowerCase();

        const matchesStatus =
            selectedFilter === "All" ||
            currentStatus ===
                selectedFilter.toLowerCase();

        const search =
            searchTerm.toLowerCase();

        const matchesSearch =
            String(test.patient_id || "")
                .toLowerCase()
                .includes(search) ||

            String(test.patient_name || "")
                .toLowerCase()
                .includes(search) ||

            String(test.test_name || "")
                .toLowerCase()
                .includes(search) ||

            String(test.doctor_name || test.doctor_id || "")
                .toLowerCase()
                .includes(search);

        return matchesStatus && matchesSearch;
    });

    return (
        <div className="test-section">

            <div className="test-controls">

                <div className="test-filter-container">

                    <button
                        className={`test-filter-button ${
                            showFilter
                                ? "test-filter-active"
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
                        <div className="test-filter-options">

                            {[
                                "All",
                                "Pending",
                                "Completed",
                            ].map((option) => (

                                <button
                                    key={option}
                                    className={
                                        selectedFilter === option
                                            ? "test-filter-option selected"
                                            : "test-filter-option"
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

                <div className="test-search-container">

                    <span className="test-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search patient or test..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            {loading ? (

                <p>Loading tests...</p>

            ) : (

                <div className="test-table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Test</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredTests.length > 0 ? (

                                filteredTests.map((test) => (

                                    <tr
                                        key={
                                            test.lab_prescription_id
                                        }
                                    >

                                        <td>
                                            P
                                            {String(
                                                test.patient_id || ""
                                            ).padStart(3, "0")}
                                        </td>

                                        <td>
                                            {test.test_name}
                                        </td>

                                        <td>
                                            {test.doctor_name ||
                                                test.doctor_id ||
                                                "-"}
                                        </td>

                                        <td>

                                            <span
                                                className={`test-status ${
                                                    test.status?.toLowerCase()
                                                }`}
                                            >
                                                {test.status}
                                            </span>

                                        </td>

                                        <td>

                                           {test.status?.toLowerCase() === "pending" ? (
    <button
        className="test-action-button"
        onClick={() => setSelectedTest(test)}
    >
        View
    </button>
) : (
    <button
        className="test-action-button completed"
        disabled
    >
        Completed
    </button>
)}

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px",
                                        }}
                                    >
                                        No tests found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
            {selectedTest && (
<TestResultPopup
    test={selectedTest}
    onClose={() => setSelectedTest(null)}

  onGenerateBill={async (
    test,
    results,
    notes,
    paymentMethod
) => {

    try {

        console.log("Test:", test);
        console.log("Results:", results);
        console.log("Notes:", notes);
        console.log("Payment Method:", paymentMethod);

        // 1. Complete the test
        const updatedTest =
            await updatePrescribedTestStatus(
                test.lab_prescription_id,
                "completed",
                results,
                notes
            );

        console.log(
            "UPDATED TEST:",
            updatedTest
        );


        // 2. Update test list
        setTests((prevTests) =>
            prevTests.map((item) =>
                item.lab_prescription_id ===
                test.lab_prescription_id
                    ? {
                        ...item,
                        ...updatedTest,
                        status: "completed",
                        results: results,
                        technician_notes: notes
                    }
                    : item
            )
        );


        // 3. Create Lab Bill
        const bill = await createLabBill({
    lab_prescription_id: test.lab_prescription_id,
    payment_method: paymentMethod
});

        console.log(
            "LAB BILL CREATED:",
            bill
        );


        // 4. Save bill for popup
        setGeneratedBill(bill);


        // 5. Close test result popup
        setSelectedTest(null);


    } catch (error) {

        console.error(
            "Error completing test and generating bill:",
            error.response?.data || error
        );

        alert(
            "Failed to complete test and generate bill."
        );

    }

}}
/>
)}
{generatedBill && (
    <LabBillPopup
        bill={generatedBill}
        onClose={() => setGeneratedBill(null)}
    />
)}
        </div>
    );
}

export default TestManagement1;
