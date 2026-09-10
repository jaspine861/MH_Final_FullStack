import { useState } from "react";
import "./EditDepartment.css";

function EditDepartment({
    department,
    onClose,
    onDepartmentUpdated
}) {

    const [name, setName] = useState(
        department.name || ""
    );

    const [description, setDescription] = useState(
        department.description || ""
    );

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            alert("Please enter department name");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                // `http://127.0.0.1:8000/api/v1/departments/${department.id}/`,
                `http://127.0.0.1:8000/api/v1/departments/${department.department_id}/`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: name.trim(),
                        description: description.trim(),
                    }),
                }
            );

            if (!response.ok) {

                const errorData =
                    await response.json();

                console.error(
                    "Department update error:",
                    errorData
                );

                throw new Error(
                    "Failed to update department"
                );
            }

            const updatedDepartment =
                await response.json();

            console.log(
                "DEPARTMENT UPDATED:",
                updatedDepartment
            );

            if (onDepartmentUpdated) {
                onDepartmentUpdated(
                    updatedDepartment
                );
            }

            alert(
                "Department updated successfully!"
            );

            onClose();

        } catch (error) {

            console.error(
                "Error updating department:",
                error
            );

            alert(
                "Failed to update department"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="edit-department-overlay">

            <div className="edit-department-popup">

                <div className="edit-department-header">

                    <h2>
                        Edit Department
                    </h2>

                    <button
                        className="edit-department-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="edit-department-form"
                >

                    <div className="edit-department-group">

                        <label>
                            Department Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter department name"
                        />

                    </div>


                    <div className="edit-department-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Enter department description"
                            rows="4"
                        />

                    </div>


                    <div className="edit-department-actions">

                        <button
                            type="button"
                            className="edit-department-cancel"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-department-save"
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : "Update Department"}
                        </button>

                    </div>

                </form>

            </div>
             
        </div>
    );
}

export default EditDepartment;