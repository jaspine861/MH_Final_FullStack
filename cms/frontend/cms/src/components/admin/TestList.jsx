import { useEffect, useState } from "react";
import "./TestList.css";

import { getTests } from "../../services/testService";
import { editTest } from "../../services/testEditService";

import AddTest from "./AddTest";
import ViewTest from "./ViewTest";
import EditTest from "./EditTest";

function TestList() {

    const [tests, setTests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [showAddTest, setShowAddTest] = useState(false);

    const [showViewTest, setShowViewTest] = useState(false);

    const [showEditTest, setShowEditTest] = useState(false);

    const [selectedTest, setSelectedTest] = useState(null);


    // =========================
    // FETCH TESTS
    // =========================

    const fetchTests = async () => {

        try {

            setLoading(true);

            const data = await getTests();

            console.log("TESTS:", data);

            setTests(data);

        } catch (error) {

            console.error(
                "ERROR FETCHING TESTS:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchTests();

    }, []);


    // =========================
    // ADD TEST
    // =========================

    const handleTestAdded = (newTest) => {

        setTests((prev) => [
            ...prev,
            newTest
        ]);

        setShowAddTest(false);
    };


    // =========================
    // VIEW TEST
    // =========================

    const handleViewTest = (test) => {

        setSelectedTest(test);

        setShowViewTest(true);
    };


    // =========================
    // EDIT TEST
    // =========================

    const handleEditTest = (test) => {

        console.log(
            "EDITING TEST:",
            test
        );

        setSelectedTest(test);

        setShowEditTest(true);

        setShowViewTest(false);
    };


    // =========================
    // UPDATED TEST
    // =========================

    const handleTestUpdated = (updatedTest) => {

        console.log(
            "UPDATED TEST:",
            updatedTest
        );

        setTests((prevTests) => {

            return prevTests.map((test) => {

                if (
                    test.test_id ===
                    updatedTest.test_id
                ) {

                    return {
                        ...test,
                        ...updatedTest,
                    };

                }

                return test;

            });

        });

        setShowEditTest(false);

        setSelectedTest(null);
    };


    // =========================
    // ACTIVATE / DEACTIVATE
    // =========================

    const handleStatusChange = async (test) => {

        const newStatus =
            test.status === "Available"
                ? "Maintenance"
                : "Available";


        try {

            console.log(
                `Changing ${test.test_id} status to ${newStatus}`
            );


            // =========================
            // CONVERT TEST ID
            // TEST002 -> 2
            // =========================

            const match = String(
                test.test_id
            ).match(/^TEST(\d+)$/);


            if (!match) {

                console.error(
                    "Invalid test ID:",
                    test.test_id
                );

                return;
            }


            const databaseId =
                Number(match[1]);


            console.log(
                "DATABASE ID:",
                databaseId
            );


            // =========================
            // UPDATE STATUS
            // =========================

            const updatedTest =
                await editTest(
                    databaseId,
                    {
                        status: newStatus
                    }
                );


            console.log(
                "STATUS UPDATED:",
                updatedTest
            );


            // =========================
            // UPDATE TABLE
            // =========================

            setTests((prevTests) => {

                return prevTests.map((item) => {

                    if (
                        item.test_id ===
                        test.test_id
                    ) {

                        return {
                            ...item,
                            ...updatedTest,
                            status: newStatus
                        };

                    }

                    return item;

                });

            });


        } catch (error) {

            console.error(
                "ERROR CHANGING TEST STATUS:",
                error
            );

            console.log(
                "STATUS:",
                error.response?.status
            );

            console.log(
                "RESPONSE:",
                error.response?.data
            );


            alert(
                "Failed to change test status."
            );
        }
    };


    // =========================
    // SEARCH
    // =========================

    const filteredTests = tests.filter((test) => {

        const search =
            searchTerm
                .toLowerCase()
                .trim();


        return (

            test.test_id
                ?.toLowerCase()
                .includes(search)

            ||

            test.test_name
                ?.toLowerCase()
                .includes(search)

            ||

            test.department
                ?.toLowerCase()
                .includes(search)

        );

    });


    return (

        <div className="test-section">


            {/* =========================
                TOP CONTROLS
            ========================= */}

            <div className="test-controls">


                {/* SEARCH */}

                <input
                    type="text"
                    className="test-search"
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(
                            e.target.value
                        )
                    }
                />


                {/* ADD TEST */}

                <button
                    className="add-test-button"
                    onClick={() =>
                        setShowAddTest(true)
                    }
                >
                    + Add Test
                </button>

            </div>


            {/* =========================
                TABLE
            ========================= */}

            {loading ? (

                <p className="loading-text">
                    Loading tests...
                </p>

            ) : (

                <div className="test-table-container">

                    <table className="test-table">


                        {/* =========================
                            TABLE HEADER
                        ========================= */}

                        <thead>

                            <tr>

                                <th>
                                    Test ID
                                </th>

                                <th>
                                    Test Name
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    TAT
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        {/* =========================
                            TABLE BODY
                        ========================= */}

                        <tbody>

                            {filteredTests.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-tests"
                                    >
                                        No tests found
                                    </td>

                                </tr>

                            ) : (

                                filteredTests.map(
                                    (test) => (

                                        <tr
                                            key={
                                                test.test_id
                                            }
                                        >


                                            {/* TEST ID */}

                                            <td>
                                                {
                                                    test.test_id
                                                }
                                            </td>


                                            {/* TEST NAME */}

                                            <td>
                                                {
                                                    test.test_name
                                                }
                                            </td>


                                            {/* DEPARTMENT */}

                                            <td>
                                                {
                                                    test.department
                                                }
                                            </td>


                                            {/* PRICE */}

                                            <td>
                                                ₹
                                                {
                                                    test.price
                                                }
                                            </td>


                                            {/* TAT */}

                                            <td>
                                                {
                                                    test.tat
                                                }
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        test.status ===
                                                        "Available"
                                                            ? "status-available"
                                                            : "status-maintenance"
                                                    }
                                                >
                                                    {
                                                        test.status
                                                    }
                                                </span>

                                            </td>


                                            {/* =========================
                                                ACTIONS

                                                ONLY:
                                                VIEW
                                                EDIT
                                                ACTIVATE / DEACTIVATE

                                                NO DELETE
                                            ========================= */}

                                            <td>

                                                <div className="test-actions">


                                                    {/* VIEW */}

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            handleViewTest(
                                                                test
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    {/* EDIT */}

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEditTest(
                                                                test
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    {/* =========================
                                                        DEACTIVATE
                                                    ========================= */}

                                                    {test.status ===
                                                    "Available" ? (

                                                        <button
                                                            className="deactivate-button"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    test
                                                                )
                                                            }
                                                        >
                                                            Deactivate
                                                        </button>

                                                    ) : (


                                                        /* =========================
                                                            ACTIVATE
                                                        ========================= */

                                                        <button
                                                            className="activate-button"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    test
                                                                )
                                                            }
                                                        >
                                                            Activate
                                                        </button>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* =========================
                ADD TEST MODAL
            ========================= */}

            {showAddTest && (

                <AddTest
                    onClose={() =>
                        setShowAddTest(false)
                    }
                    onTestAdded={
                        handleTestAdded
                    }
                />

            )}


            {/* =========================
                VIEW TEST MODAL
            ========================= */}

            {showViewTest &&
                selectedTest && (

                    <ViewTest
                        test={selectedTest}

                        onClose={() => {

                            setShowViewTest(false);

                            setSelectedTest(null);

                        }}

                        onEdit={
                            handleEditTest
                        }
                    />

                )}


            {/* =========================
                EDIT TEST MODAL
            ========================= */}

            {showEditTest &&
                selectedTest && (

                    <EditTest
                        test={selectedTest}

                        onClose={() => {

                            setShowEditTest(false);

                            setSelectedTest(null);

                        }}

                        onTestUpdated={
                            handleTestUpdated
                        }
                    />

                )}

        </div>
    );
}

export default TestList;