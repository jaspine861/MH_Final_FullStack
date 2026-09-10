// import { useEffect, useState } from "react";
// import "./DepartmentList.css";
// import EditDepartment from "./EditDepartment";
// import AddDepartment from "./AddDepartment";
// function DepartmentList() {

//     const [departments, setDepartments] = useState([]);
//     const [showAddDepartment, setShowAddDepartment] = useState(false);
//     const [editingDepartment, setEditingDepartment] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchDepartments();
//     }, []);

//     const fetchDepartments = async () => {

//         try {

//             const response = await fetch(
//                 "http://127.0.0.1:8000/api/v1/departments/"
//             );

//             const data = await response.json();

//             setDepartments(data);

//         } catch (error) {

//             console.error(
//                 "Error fetching departments:",
//                 error
//             );

//         } finally {

//             setLoading(false);

//         }
//     };

//     const handleDeactivate = async (department) => {

//         const confirmDeactivate = window.confirm(
//             `Are you sure you want to deactivate ${department.name}?`
//         );

//         if (!confirmDeactivate) {
//             return;
//         }

//         try {

//             const response = await fetch(
//                 `http://127.0.0.1:8000/api/v1/departments/${department.department_id}/`,
//                 {
//                     method: "PATCH",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         is_active: false,
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to deactivate department");
//             }

//             const updatedDepartment = await response.json();

//             setDepartments((prevDepartments) =>
//                 prevDepartments.map((item) =>
//                     item.id === updatedDepartment.id
//                         ? updatedDepartment
//                         : item
//                 )
//             );

//         } catch (error) {

//             console.error(error);

//             alert(
//                 "Failed to deactivate department"
//             );

//         }
//     };

//     return (
//         <div className="department-section">

//             <div className="department-header">

//                 <h2>
//                     Departments
//                 </h2>

//                 <button
//                     className="add-department-button"
//                     onClick={() =>
//                         setShowAddDepartment(true)
//                     }
//                 >
//                     + Add Department
//                 </button>

//             </div>

//             {loading ? (

//                 <p>
//                     Loading departments...
//                 </p>

//             ) : (

//                 <div className="department-table-container">

//                     <table>

//                         <thead>

//                             <tr>

//                                 <th>
//                                     Department ID
//                                 </th>

//                                 <th>
//                                     Department Name
//                                 </th>

//                                 <th>
//                                     Description
//                                 </th>

//                                 <th>
//                                     Status
//                                 </th>

//                                 <th>
//                                     Action
//                                 </th>

//                             </tr>

//                         </thead>

//                         <tbody>

//                             {departments.length > 0 ? (

//                                 departments.map(
//                                     (department) => (

//                                         <tr
//                                             key={department.department_id}
//                                         >

//                                             <td>
//                                                 {department.department_id
//                                                 }
//                                             </td>

//                                             <td>
//                                                 {department.name}
//                                             </td>

//                                             <td>
//                                                 {department.description || "-"}
//                                             </td>

//                                             <td>

//                                                 <span
//                                                     className={
//                                                         department.is_active
//                                                             ? "department-status active"
//                                                             : "department-status inactive"
//                                                     }
//                                                 >
//                                                     {department.is_active
//                                                         ? "Active"
//                                                         : "Inactive"}
//                                                 </span>

//                                             </td>

//                                             <td>

//                                                 <div className="department-actions">

//                                                     <button
//                                                         className="edit-department-button"
//                                                         onClick={() =>
//                                                             setEditingDepartment(
//                                                                 department
//                                                             )
//                                                         }
//                                                     >
//                                                         Edit
//                                                     </button>

//                                                     {department.is_active && (

//                                                         <button
//                                                             className="deactivate-department-button"
//                                                             onClick={() =>
//                                                                 handleDeactivate(
//                                                                     department
//                                                                 )
//                                                             }
//                                                         >
//                                                             Deactivate
//                                                         </button>

//                                                     )}

//                                                 </div>

//                                             </td>

//                                         </tr>

//                                     )
//                                 )

//                             ) : (

//                                 <tr>

//                                     <td
//                                         colSpan="5"
//                                     >
//                                         No departments found
//                                     </td>

//                                 </tr>

//                             )}

//                         </tbody>

//                     </table>

//                 </div>

//             )}
//           {showAddDepartment && (
//     <AddDepartment
//         onClose={() =>
//             setShowAddDepartment(false)
//         }

//         onDepartmentAdded={(newDepartment) => {

//             setDepartments((prevDepartments) => [
//                 ...prevDepartments,
//                 newDepartment
//             ]);

//         }}
//     />
// )}
// {editingDepartment && (
//     <EditDepartment
//         department={editingDepartment}

//         onClose={() =>
//             setEditingDepartment(null)
//         }

//         onDepartmentUpdated={(updatedDepartment) => {

//             setDepartments((prevDepartments) =>
//     prevDepartments.map((item) =>
//         item.department_id === updatedDepartment.department_id
//             ? updatedDepartment
//             : item
//     )
// );

//         }}
//     />
// )}
//         </div>
//     );
// }

// export default DepartmentList;

import { useEffect, useState } from "react";
import "./DepartmentList.css";
import EditDepartment from "./EditDepartment";
import AddDepartment from "./AddDepartment";

function DepartmentList() {

    const [departments, setDepartments] = useState([]);
    const [showAddDepartment, setShowAddDepartment] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/v1/departments/"
            );

            const data = await response.json();

            setDepartments(data);

        } catch (error) {

            console.error(
                "Error fetching departments:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const handleDeactivate = async (department) => {

        const confirmDeactivate = window.confirm(
            `Are you sure you want to deactivate ${department.name}?`
        );

        if (!confirmDeactivate) {
            return;
        }

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/departments/${department.department_id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        is_active: false,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to deactivate department");
            }

            const updatedDepartment = await response.json();

            setDepartments((prevDepartments) =>
                prevDepartments.map((item) =>
                    item.department_id === updatedDepartment.department_id
                        ? updatedDepartment
                        : item
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to deactivate department"
            );

        }
    };

    const handleActivate = async (department) => {

        const confirmActivate = window.confirm(
            `Are you sure you want to activate ${department.name}?`
        );

        if (!confirmActivate) {
            return;
        }

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/api/v1/departments/${department.department_id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        is_active: true,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to activate department");
            }

            const updatedDepartment = await response.json();

            setDepartments((prevDepartments) =>
                prevDepartments.map((item) =>
                    item.department_id === updatedDepartment.department_id
                        ? updatedDepartment
                        : item
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to activate department"
            );

        }
    };

    return (
        <div className="department-section">

            <div className="department-header">

                <h2>
                    Departments
                </h2>

                <button
                    className="add-department-button"
                    onClick={() =>
                        setShowAddDepartment(true)
                    }
                >
                    + Add Department
                </button>

            </div>

            {loading ? (

                <p>
                    Loading departments...
                </p>

            ) : (

                <div className="department-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Department ID
                                </th>

                                <th>
                                    Department Name
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {departments.length > 0 ? (

                                departments.map(
                                    (department) => (

                                        <tr
                                            key={department.department_id}
                                        >

                                            <td>
                                                {department.department_id}
                                            </td>

                                            <td>
                                                {department.name}
                                            </td>

                                            <td>
                                                {department.description || "-"}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        department.is_active
                                                            ? "department-status active"
                                                            : "department-status inactive"
                                                    }
                                                >
                                                    {department.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="department-actions">

                                                    <button
                                                        className="edit-department-button"
                                                        onClick={() =>
                                                            setEditingDepartment(
                                                                department
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    {department.is_active ? (

                                                        <button
                                                            className="deactivate-department-button"
                                                            onClick={() =>
                                                                handleDeactivate(
                                                                    department
                                                                )
                                                            }
                                                        >
                                                            Deactivate
                                                        </button>

                                                    ) : (

                                                        <button
                                                            className="activate-department-button"
                                                            onClick={() =>
                                                                handleActivate(
                                                                    department
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

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                    >
                                        No departments found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

            {showAddDepartment && (
                <AddDepartment
                    onClose={() =>
                        setShowAddDepartment(false)
                    }

                    onDepartmentAdded={(newDepartment) => {

                        setDepartments((prevDepartments) => [
                            ...prevDepartments,
                            newDepartment
                        ]);

                    }}
                />
            )}

            {editingDepartment && (
                <EditDepartment
                    department={editingDepartment}

                    onClose={() =>
                        setEditingDepartment(null)
                    }

                    onDepartmentUpdated={(updatedDepartment) => {

                        setDepartments((prevDepartments) =>
                            prevDepartments.map((item) =>
                                item.department_id === updatedDepartment.department_id
                                    ? updatedDepartment
                                    : item
                            )
                        );

                    }}
                />
            )}

        </div>
    );
}

export default DepartmentList;