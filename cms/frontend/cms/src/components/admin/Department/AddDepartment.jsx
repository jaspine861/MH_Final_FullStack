import { useState } from "react";
import "./AddDepartment.css";

function AddDepartment({ onClose, onDepartmentAdded }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
                "http://127.0.0.1:8000/api/v1/departments/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        description: description.trim(),
                        is_active: true,
                    }),
                }
            );

            if (!response.ok) {

                const errorData = await response.json();

                console.error(
                    "Department error:",
                    errorData
                );

                throw new Error(
                    "Failed to create department"
                );
            }

            const newDepartment =
                await response.json();

            console.log(
                "DEPARTMENT CREATED:",
                newDepartment
            );

            if (onDepartmentAdded) {
                onDepartmentAdded(newDepartment);
            }

            alert(
                "Department added successfully!"
            );

            onClose();

        } catch (error) {

            console.error(
                "Error adding department:",
                error
            );

            alert(
                "Failed to add department"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="department-popup-overlay">

            <div className="department-popup">

                {/* Header */}

                <div className="department-popup-header">

                    <h2>
                        Add Department
                    </h2>

                    <button
                        className="department-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="department-form"
                >

                    <div className="department-form-group">

                        <label>
                            Department Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter department name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    <div className="department-form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            placeholder="Enter department description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            rows="4"
                        />

                    </div>


                    {/* Actions */}

                    <div className="department-form-actions">

                        <button
                            type="button"
                            className="department-cancel-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="department-save-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Department"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddDepartment;