import { useEffect, useState } from "react";
import "./EditTest.css";

import {
editTest
} from "../../services/testEditService";

import {
getDepartments
} from "../../services/departmentService";

function EditTest({
test,
onClose,
onTestUpdated
}) {


const [formData, setFormData] = useState({

    test_name:
        test?.test_name || "",

    department:
        test?.department || "",

    price:
        test?.price || "",

    tat:
        test?.tat || "",

    status:
        test?.status || "Available"

});


const [departments, setDepartments] =
    useState([]);


const [error, setError] =
    useState("");


const [loading, setLoading] =
    useState(false);


const [loadingDepartments, setLoadingDepartments] =
    useState(true);


// =========================
// LOAD DEPARTMENTS
// =========================

useEffect(() => {

    const fetchDepartments = async () => {

        try {

            setLoadingDepartments(true);

            const data =
                await getDepartments();

            console.log(
                "DEPARTMENTS:",
                data
            );

            setDepartments(data);

        } catch (error) {

            console.error(
                "ERROR FETCHING DEPARTMENTS:",
                error
            );

            setError(
                "Failed to load departments."
            );

        } finally {

            setLoadingDepartments(false);

        }

    };


    fetchDepartments();

}, []);


// =========================
// GET DATABASE ID
// =========================

const getDatabaseId = (testId) => {

    if (!testId) {

        return null;

    }


    const match =
        String(testId).match(
            /^TEST(\d+)$/
        );


    if (!match) {

        return null;

    }


    return Number(match[1]);

};


// =========================
// HANDLE CHANGE
// =========================

const handleChange = (e) => {

    const {
        name,
        value
    } = e.target;


    setFormData((prev) => ({

        ...prev,

        [name]: value

    }));


    setError("");

};


// =========================
// SUBMIT
// =========================

const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    const databaseId =
        getDatabaseId(
            test?.test_id
        );


    console.log(
        "EDIT TEST:",
        test
    );


    console.log(
        "TEST ID:",
        test?.test_id
    );


    console.log(
        "DATABASE ID:",
        databaseId
    );


    console.log(
        "FORM DATA:",
        formData
    );


    if (!databaseId) {

        setError(
            "Invalid test ID."
        );

        setLoading(false);

        return;

    }


    try {

        const updatedTest =
            await editTest(
                databaseId,
                formData
            );


        console.log(
            "TEST UPDATED:",
            updatedTest
        );


        if (onTestUpdated) {

            onTestUpdated({

                ...test,

                ...updatedTest

            });

        }


        onClose();


    } catch (error) {

        console.error(
            "ERROR UPDATING TEST:",
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


        if (error.response?.data) {

            const backendError =
                error.response.data;


            if (
                typeof backendError ===
                "object"
            ) {

                const messages =
                    Object.entries(
                        backendError
                    )
                        .map(
                            ([field, message]) => {

                                return `${field}: ${
                                    Array.isArray(message)
                                        ? message.join(", ")
                                        : message
                                }`;

                            }
                        )
                        .join("\n");


                setError(messages);


            } else {

                setError(
                    String(backendError)
                );

            }


        } else {

            setError(
                "Failed to update test."
            );

        }


    } finally {

        setLoading(false);

    }

};


return (

    <div className="edit-test-overlay">

        <div className="edit-test-card">


            {/* HEADER */}

            <div className="edit-test-header">

                <div>

                    <h2>
                        Edit Laboratory Test
                    </h2>

                    <p>
                        Update laboratory test information
                    </p>

                </div>


                <button
                    type="button"
                    className="close-button"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {/* TEST ID */}

            <div className="form-group">

                <label>
                    Test ID
                </label>

                <input
                    type="text"
                    value={
                        test?.test_id || ""
                    }
                    disabled
                />

            </div>


            {/* TEST NAME */}

            <div className="form-group">

                <label>
                    Test Name
                </label>

                <input
                    type="text"
                    name="test_name"
                    value={
                        formData.test_name
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

            </div>


            {/* =========================
                DEPARTMENT DATABASE
            ========================= */}

            <div className="form-group">

                <label>
                    Department
                </label>

                <select
                    name="department"
                    value={
                        formData.department
                    }
                    onChange={
                        handleChange
                    }
                    required
                    disabled={
                        loadingDepartments
                    }
                >

                    <option value="">

                        {loadingDepartments
                            ? "Loading departments..."
                            : "Select Department"
                        }

                    </option>


                    {departments.map(
                        (department) => (

                            <option
                                key={
                                    department.id
                                }
                                value={
                                    department.name
                                }
                            >
                                {
                                    department.name
                                }
                            </option>

                        )
                    )}

                </select>

            </div>


            {/* PRICE */}

            <div className="form-group">

                <label>
                    Price
                </label>

                <input
                    type="number"
                    name="price"
                    value={
                        formData.price
                    }
                    onChange={
                        handleChange
                    }
                    min="0"
                    step="0.01"
                    required
                />

            </div>


            {/* TAT */}

            <div className="form-group">

                <label>
                    TAT
                </label>

                <input
                    type="text"
                    name="tat"
                    value={
                        formData.tat
                    }
                    onChange={
                        handleChange
                    }
                    required
                />

            </div>


            {/* STATUS */}

            <div className="form-group">

                <label>
                    Status
                </label>

                <select
                    name="status"
                    value={
                        formData.status
                    }
                    onChange={
                        handleChange
                    }
                >

                    <option value="Available">
                        Available
                    </option>

                    <option value="Maintenance">
                        Maintenance
                    </option>

                </select>

            </div>


            {/* ERROR */}

            {error && (

                <div className="edit-test-error">
                    {error}
                </div>

            )}


            {/* ACTIONS */}

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
                    type="button"
                    className="save-button"
                    onClick={handleSubmit}
                    disabled={
                        loading ||
                        loadingDepartments
                    }
                >

                    {loading
                        ? "Updating..."
                        : "Update Test"
                    }

                </button>

            </div>

        </div>

    </div>

);


}

export default EditTest;