import { useState } from "react";
import "./MedicineDetails.css";

function MedicineDetails({
    medicine,
    onClose,
    onEdit,
    onDelete,
    onRestock
}) {
                const [selectedMedicine, setSelectedMedicine] = useState(null);
const [showDetails, setShowDetails] = useState(false);
const [showEdit, setShowEdit] = useState(false);
    if (!medicine) return null;

    const getStockStatus = (stock) => {

        if (stock === 0) {
            return "Out of Stock";
        }

        if (stock <= 10) {
            return "Low Stock";
        }

        return "In Stock";
    };

    const status = getStockStatus(
        medicine.stock_quantity
    );

    return (
        <div className="medicine-details-overlay">

            <div className="medicine-details-card">

                {/* Header */}
                <div className="medicine-details-header">

                    <div>
                        <h2>Medicine Details</h2>

                        <p>
                            Medicine ID: {medicine.medicine_id}
                        </p>
                    </div>

                    <button
                        className="medicine-details-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Body */}
                <div className="medicine-details-body">

                    {/* Medicine Information */}
                    <div className="medicine-detail-section">

                        <h3>Medicine Information</h3>

                        <div className="medicine-details-grid">

                            <div className="medicine-detail-item">
                                <span>Medicine Name</span>

                                <strong>
                                    {medicine.medicine_name}
                                </strong>
                            </div>


                            <div className="medicine-detail-item">
                                <span>Category</span>

                                <strong>
                                    {medicine.medicine_type}
                                </strong>
                            </div>


                            <div className="medicine-detail-item">
                                <span>Manufacturer</span>

                                <strong>
                                    {medicine.manufacturer_name}
                                </strong>
                            </div>


                            <div className="medicine-detail-item">
                                <span>Price Per Unit</span>

                                <strong>
                                    ₹{medicine.price_per_unit}
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* Date Information */}
                    <div className="medicine-detail-section">

                        <h3>Date Information</h3>

                        <div className="medicine-details-grid">

                            <div className="medicine-detail-item">
                                <span>Manufacture Date</span>

                                <strong>
                                    {medicine.manufacture_date}
                                </strong>
                            </div>


                            <div className="medicine-detail-item">
                                <span>Expiry Date</span>

                                <strong>
                                    {medicine.expiry_date}
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* Stock Information */}
                    <div className="medicine-detail-section">

                        <h3>Stock Information</h3>

                        <div className="medicine-details-grid">

                            <div className="medicine-detail-item">
                                <span>Stock Quantity</span>

                                <strong>
                                    {medicine.stock_quantity}
                                </strong>
                            </div>


                            <div className="medicine-detail-item">

                                <span>Status</span>

                                <span
                                    className={`medicine-detail-status ${
                                        status
                                            .toLowerCase()
                                            .replaceAll(" ", "-")
                                    }`}
                                >
                                    {status}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Actions */}
                <div className="medicine-details-actions">

                    <button
                        className="medicine-restock-button"
                        onClick={() =>
                            onRestock(medicine)
                        }
                    >
                        Restock
                    </button>

                    <button
                        className="medicine-edit-button"
                        onClick={() =>
                            onEdit(medicine)
                        }
                    >
                        Edit
                    </button>

                    <button
                        className="medicine-delete-button"
                        onClick={() =>
                            onDelete(medicine)
                        }
                    >
                        Delete
                    </button>

                    <button
                        className="medicine-close-action-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MedicineDetails;
