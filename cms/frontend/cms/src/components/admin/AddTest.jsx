// import { useState } from "react";
// import "./AddTest.css";
// import { addTest } from "../../services/testService";
// function AddTest({ onClose, onTestAdded }) {

//     const [formData, setFormData] = useState({
//         test_name: "",
//         normal_range: "",
//         sample_required: "",
//         unit: "",
//         department: "",
//         tat: "",
//         price: "",
//         description: "",
//         status: "Available"
//     });

//     const [loading, setLoading] = useState(false);


//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));

//     };


//  const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//         setLoading(true);

//         const data = await addTest({
//             test_name: formData.test_name,
//             normal_range: formData.normal_range,
//             sample_required: formData.sample_required,
//             unit: formData.unit,
//             department: formData.department,
//             tat: formData.tat,
//             price: formData.price,
//             description: formData.description
//         });

//         console.log("Test Added:", data);

//         if (onTestAdded) {
//             onTestAdded(data);
//         }

//         onClose();

//     } catch (error) {

//         console.error(
//             "STATUS:",
//             error.response?.status
//         );

//         console.error(
//             "BACKEND ERROR:",
//             error.response?.data
//         );

//         alert(
//             JSON.stringify(
//                 error.response?.data ||
//                 "Something went wrong"
//             )
//         );

//     } finally {

//         setLoading(false);

//     }
// };


//     return (
//         <div className="add-test-overlay">

//             <div className="add-test-card">

//                 {/* Header */}
//                 <div className="add-test-header">

//                     <div>

//                         <h2>Add Lab Test</h2>

//                         <p>
//                             Enter laboratory test information
//                         </p>

//                     </div>

//                     <button
//                         type="button"
//                         className="close-button"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>


//                 {/* Form */}
//                 <form onSubmit={handleSubmit}>

//                     <div className="test-form">


//                         {/* Test ID */}
//                         <div className="form-group">

//                             <label>
//                                 Test ID
//                             </label>

//                             <input
//                                 type="text"
//                                 value="Auto Generated"
//                                 readOnly
//                             />

//                         </div>


//                         {/* Test Name */}
//                         <div className="form-group">

//                             <label>
//                                 Test Name
//                             </label>

//                             <input
//                                 type="text"
//                                 name="test_name"
//                                 value={formData.test_name}
//                                 onChange={handleChange}
//                                 placeholder="Enter test name"
//                                 required
//                             />

//                         </div>


//                         {/* Normal Range */}
//                         <div className="form-group">

//                             <label>
//                                 Normal Range
//                             </label>

//                             <input
//                                 type="text"
//                                 name="normal_range"
//                                 value={formData.normal_range}
//                                 onChange={handleChange}
//                                 placeholder="e.g. 70 - 100"
//                                 required
//                             />

//                         </div>


//                         {/* Sample Required */}
//                         <div className="form-group">

//                             <label>
//                                 Sample Required
//                             </label>

//                             <input
//                                 type="text"
//                                 name="sample_required"
//                                 value={formData.sample_required}
//                                 onChange={handleChange}
//                                 placeholder="e.g. Blood"
//                                 required
//                             />

//                         </div>


//                         {/* Unit */}
//                         <div className="form-group">

//                             <label>
//                                 Unit
//                             </label>

//                             <input
//                                 type="text"
//                                 name="unit"
//                                 value={formData.unit}
//                                 onChange={handleChange}
//                                 placeholder="e.g. mg/dL"
//                                 required
//                             />

//                         </div>


//                         {/* Department */}
//                         <div className="form-group">

//                             <label>
//                                 Department
//                             </label>

//                             <select
//                                 name="department"
//                                 value={formData.department}
//                                 onChange={handleChange}
//                                 required
//                             >

//                                 <option value="">
//                                     Select Department
//                                 </option>

//                                 <option value="Hematology">
//                                     Hematology
//                                 </option>

//                                 <option value="Biochemistry">
//                                     Biochemistry
//                                 </option>

//                                 <option value="Microbiology">
//                                     Microbiology
//                                 </option>

//                                 <option value="Pathology">
//                                     Pathology
//                                 </option>

//                                 <option value="Immunology">
//                                     Immunology
//                                 </option>

//                                 <option value="Radiology">
//                                     Radiology
//                                 </option>

//                             </select>

//                         </div>


//                         {/* TAT */}
//                         <div className="form-group">

//                             <label>
//                                 TAT
//                             </label>

//                             <input
//                                 type="text"
//                                 name="tat"
//                                 value={formData.tat}
//                                 onChange={handleChange}
//                                 placeholder="e.g. 2 Hours"
//                                 required
//                             />

//                         </div>


//                         {/* Price */}
//                         <div className="form-group">

//                             <label>
//                                 Price
//                             </label>

//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 placeholder="Enter price"
//                                 min="0"
//                                 step="0.01"
//                                 required
//                             />

//                         </div>


//                         {/* Description */}
//                         <div className="form-group full-width">

//                             <label>
//                                 Description
//                             </label>

//                             <textarea
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleChange}
//                                 placeholder="Enter test description..."
//                                 rows="4"
//                             />

//                         </div>


//                         {/* Status */}
//                         <div className="form-group">

//                             <label>
//                                 Status
//                             </label>

//                             <select
//                                 name="status"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                             >

//                                 <option value="Available">
//                                     Available
//                                 </option>

//                                 <option value="Maintenance">
//                                     Maintenance
//                                 </option>

//                             </select>

//                         </div>

//                     </div>


//                     {/* Actions */}
//                     <div className="test-actions">

//                         <button
//                             type="button"
//                             className="cancel-button"
//                             onClick={onClose}
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             type="submit"
//                             className="add-button"
//                             disabled={loading}
//                         >
//                             {loading
//                                 ? "Adding..."
//                                 : "Add Test"}
//                         </button>

//                     </div>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default AddTest;
import { useEffect, useState } from "react";
import "./AddTest.css";

import {
addTest,
getTests
} from "../../services/testService";

import {
getDepartments
} from "../../services/departmentService";

function AddTest({ onClose, onTestAdded }) {


const [formData, setFormData] = useState({

    test_name: "",
    normal_range: "",
    sample_required: "",
    unit: "",
    department: "",
    tat: "",
    price: "",
    description: "",
    status: "Available"

});


const [departments, setDepartments] = useState([]);

const [loading, setLoading] = useState(false);

const [loadingDepartments, setLoadingDepartments] =
    useState(true);

const [error, setError] = useState("");


// =========================
// LOAD DEPARTMENTS
// =========================

useEffect(() => {

    const fetchDepartments = async () => {

        try {

            setLoadingDepartments(true);

            const data = await getDepartments();

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


    if (name === "test_name") {

        setError("");

    }

};


// =========================
// HANDLE SUBMIT
// =========================

const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    const enteredTestName =
        formData.test_name.trim();


    // TEST NAME VALIDATION

    if (!enteredTestName) {

        setError(
            "Test name is required."
        );

        return;

    }


    // DEPARTMENT VALIDATION

    if (!formData.department) {

        setError(
            "Please select a department."
        );

        return;

    }


    try {

        setLoading(true);


        // =========================
        // CHECK DUPLICATE TEST NAME
        // =========================

        const existingTests =
            await getTests();


        const duplicateTest =
            existingTests.some((test) => {

                const existingName =
                    test.test_name
                        ?.trim()
                        .toLowerCase();


                return (
                    existingName ===
                    enteredTestName.toLowerCase()
                );

            });


        if (duplicateTest) {

            setError(
                "A laboratory test with this name already exists."
            );

            return;

        }


        // =========================
        // ADD TEST
        // =========================

        const data = await addTest({

            test_name:
                enteredTestName,

            normal_range:
                formData.normal_range.trim(),

            sample_required:
                formData.sample_required.trim(),

            unit:
                formData.unit.trim(),

            department:
                formData.department,

            tat:
                formData.tat.trim(),

            price:
                formData.price,

            description:
                formData.description.trim(),

            status:
                formData.status

        });


        console.log(
            "TEST ADDED:",
            data
        );


        if (onTestAdded) {

            onTestAdded(data);

        }


        onClose();


    } catch (error) {

        console.error(
            "ERROR ADDING TEST:",
            error
        );


        console.error(
            "STATUS:",
            error.response?.status
        );


        console.error(
            "BACKEND ERROR:",
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
                "Something went wrong. Please try again."
            );

        }


    } finally {

        setLoading(false);

    }

};


return (

    <div className="add-test-overlay">

        <div className="add-test-card">


            {/* =========================
                HEADER
            ========================= */}

            <div className="add-test-header">

                <div>

                    <h2>
                        Add Lab Test
                    </h2>

                    <p>
                        Enter laboratory test information
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


            {/* =========================
                FORM
            ========================= */}

            <form onSubmit={handleSubmit}>

                <div className="test-form">


                    {/* TEST ID */}

                    <div className="form-group">

                        <label>
                            Test ID
                        </label>

                        <input
                            type="text"
                            value="Auto Generated"
                            readOnly
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
                            placeholder="Enter test name"
                            required
                        />

                    </div>


                    {/* NORMAL RANGE */}

                    <div className="form-group">

                        <label>
                            Normal Range
                        </label>

                        <input
                            type="text"
                            name="normal_range"
                            value={
                                formData.normal_range
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. 70 - 100"
                            required
                        />

                    </div>


                    {/* SAMPLE REQUIRED */}

                    <div className="form-group">

                        <label>
                            Sample Required
                        </label>

                        <input
                            type="text"
                            name="sample_required"
                            value={
                                formData.sample_required
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. Blood"
                            required
                        />

                    </div>


                    {/* UNIT */}

                    <div className="form-group">

                        <label>
                            Unit
                        </label>

                        <input
                            type="text"
                            name="unit"
                            value={
                                formData.unit
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="e.g. mg/dL"
                            required
                        />

                    </div>


                    {/* =========================
                        DEPARTMENT FROM DATABASE
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
                            placeholder="e.g. 2 Hours"
                            required
                        />

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
                            placeholder="Enter price"
                            min="0"
                            step="0.01"
                            required
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="form-group full-width">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Enter test description..."
                            rows="4"
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

                </div>


                {/* ERROR */}

                {error && (

                    <div className="form-error">
                        {error}
                    </div>

                )}


                {/* ACTIONS */}

                <div className="test-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="add-button"
                        disabled={
                            loading ||
                            loadingDepartments
                        }
                    >

                        {loading
                            ? "Checking..."
                            : "Add Test"
                        }

                    </button>

                </div>

            </form>

        </div>

    </div>

);


}

export default AddTest;