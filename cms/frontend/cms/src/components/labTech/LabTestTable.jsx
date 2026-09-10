import { useEffect, useState } from "react";
import "./LabTestTable.css";
import { getLabTests } from "../../services/labTestService";

function LabTestTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [labTests, setLabTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLabTests = async () => {
            try {
                const data = await getLabTests();

                console.log("LAB TESTS:", data);

                setLabTests(data);
            } catch (error) {
                console.error(
                    "Error fetching lab tests:",
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLabTests();
    }, []);

    const filteredLabTests = labTests.filter((test) => {
        const search = searchTerm.toLowerCase();

        return (
            String(test.test_id || "")
                .toLowerCase()
                .includes(search) ||

            String(test.test_name || "")
                .toLowerCase()
                .includes(search) ||

            String(test.department || "")
                .toLowerCase()
                .includes(search)
        );
    });

    return (
        <div className="lab-test-section">

            {/* Header / Search */}
            <div className="lab-test-controls">

                <div>
                    <h2 className="lab-test-title">
                        Laboratory Tests
                    </h2>

                    <p className="lab-test-subtitle">
                        View all available laboratory tests
                    </p>
                </div>

                <div className="lab-test-search-container">

                    <span className="lab-test-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search test..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Loading */}
            {loading ? (

                <div className="lab-test-loading">
                    Loading laboratory tests...
                </div>

            ) : (

                <div className="lab-test-table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Test ID</th>
                                <th>Test Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>TAT</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredLabTests.length > 0 ? (

                                filteredLabTests.map((test) => (

                                    <tr key={test.test_id}>

                                        <td className="lab-test-id">
                                            {test.test_id}
                                        </td>

                                        <td className="lab-test-name">
                                            {test.test_name}
                                        </td>

                                        <td>
                                            {test.department || "-"}
                                        </td>

                                        <td className="lab-test-price">
                                            ₹{Number(test.price).toFixed(2)}
                                        </td>

                                        <td>
                                            {test.tat || "-"}
                                        </td>

                                        <td>

                                            <span
                                                className={`lab-test-status ${
                                                    test.status
                                                        ?.toLowerCase()
                                                        .replace(
                                                            " ",
                                                            "-"
                                                        )
                                                }`}
                                            >
                                                {test.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="lab-test-empty"
                                    >
                                        No laboratory tests found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default LabTestTable;