import { useState } from "react";
import "./EditMedicinePopup.css";
import { updateMedicine } from "../../services/medicineService";

function EditMedicinePopup({
    medicine,
    onClose,
    onMedicineUpdated
}) {

    const [formData, setFormData] = useState({
        medicine_name: medicine?.medicine_name || "",
        medicine_type: medicine?.medicine_type || "",
        manufacturer_name: medicine?.manufacturer_name || "",
        price_per_unit: medicine?.price_per_unit || "",
        manufacture_date: medicine?.manufacture_date || "",
        expiry_date: medicine?.expiry_date || "",
        stock_quantity: medicine?.stock_quantity || ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const updatedMedicine = await updateMedicine(
                medicine.medicine_id,
                formData
            );

            console.log(
                "Medicine updated:",
                updatedMedicine
            );

            onMedicineUpdated(updatedMedicine);

            onClose();

        } catch (error) {

            console.error(
                "Error updating medicine:",
                error
            );

            if (error.response) {

                console.log(
                    "Status:",
                    error.response.status
                );

                console.log(
                    "Response:",
                    error.response.data
                );

            }

            alert("Failed to update medicine");

        } finally {

            setLoading(false);

        }

    };

    if (!medicine) return null;

    return (

        <div className="edit-medicine-overlay">

            <div className="edit-medicine-card">

                {/* Header */}

                <div className="edit-medicine-header">

                    <div>

                        <h2>Edit Medicine</h2>

                        <p>
                            Medicine ID: {medicine.medicine_id}
                        </p>

                    </div>

                    <button
                        className="edit-medicine-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Form */}

                <form onSubmit={handleSubmit}>

                    {/* Medicine Name + Type */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>
                                Medicine Name
                            </label>

                            <input
                                type="text"
                                name="medicine_name"
                                value={formData.medicine_name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="edit-form-group">

                            <label>
                                Category
                            </label>

                            <input
                                type="text"
                                name="medicine_type"
                                value={formData.medicine_type}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* Manufacturer */}

                    <div className="edit-form-group">

                        <label>
                            Manufacturer
                        </label>

                        <input
                            type="text"
                            name="manufacturer_name"
                            value={formData.manufacturer_name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Price + Stock */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>
                                Price Per Unit
                            </label>

                            <input
                                type="number"
                                name="price_per_unit"
                                value={formData.price_per_unit}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />

                        </div>


                        <div className="edit-form-group">

                            <label>
                                Stock Quantity
                            </label>

                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                min="0"
                                required
                            />

                        </div>

                    </div>


                    {/* Dates */}

                    <div className="edit-form-row">

                        <div className="edit-form-group">

                            <label>
                                Manufacture Date
                            </label>

                            <input
                                type="date"
                                name="manufacture_date"
                                value={formData.manufacture_date}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="edit-form-group">

                            <label>
                                Expiry Date
                            </label>

                            <input
                                type="date"
                                name="expiry_date"
                                value={formData.expiry_date}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="edit-medicine-actions">

                        <button
                            type="button"
                            className="edit-cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-save-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditMedicinePopup;