import React, { useState } from "react";
import "./MedicineDetailsPopup.css";
import { updateMedicine } from "../../services/medicineService";
function MedicineDetailsPopup({ medicine, onClose }) {
      

    const [restockQuantity, setRestockQuantity] = useState("");
const [restocking, setRestocking] = useState(false);
    if (!medicine) {
        return null;
    }


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const d = new Date(date);

        return d.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };


    const getStatus = () => {

        const stock = Number(
            medicine.stock_quantity || 0
        );

        if (stock === 0) {
            return "Out of Stock";
        }

        if (stock <= 10) {
            return "Low Stock";
        }

        if (medicine.expiry_date) {

            const today = new Date();
            const expiry = new Date(
                medicine.expiry_date
            );

            today.setHours(0, 0, 0, 0);
            expiry.setHours(0, 0, 0, 0);

            if (expiry < today) {
                return "Expired";
            }
        }

        return "Available";
    };


    const status = getStatus();

         const handleRestock = async () => {

    const quantity = Number(restockQuantity);

    if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    try {

        setRestocking(true);

        const currentStock = Number(
            medicine.stock_quantity || 0
        );

        const updatedMedicine = await updateMedicine(
            medicine.medicine_id,
            {
                ...medicine,
                stock_quantity: currentStock + quantity
            }
        );
                  console.log("MEDICINE OBJECT:", medicine);
console.log("MEDICINE DB ID:", medicine.id);
console.log("MEDICINE CUSTOM ID:", medicine.medicine_id);
        alert(
            `Medicine restocked successfully. Added ${quantity} units.`
        );

        setRestockQuantity("");

        // Update the medicine object shown in the popup
        Object.assign(medicine, updatedMedicine);

    } catch (error) {

        console.error(
            "RESTOCK ERROR:",
            error.response?.data || error
        );

        alert("Failed to restock medicine.");

    } finally {

        setRestocking(false);

    }
};
    return (

        <div className="medicine-details-overlay">

            <div className="medicine-details-popup">

                {/* Header */}

                <div className="medicine-details-header">

                    <div>

                        <h2>
                            Medicine Details
                        </h2>

                        <p>
                            View medicine information
                        </p>

                    </div>


                    <button
                        className="medicine-details-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                {/* Medicine Header */}

                <div className="medicine-details-title">

                    <div className="medicine-details-avatar">

                        {String(
                            medicine.medicine_name || "M"
                        )
                            .charAt(0)
                            .toUpperCase()}

                    </div>


                    <div>

                        <h3>
                            {
                                medicine.medicine_name ||
                                "-"
                            }
                        </h3>

                        <span>
                            {
                                medicine.medicine_id ||
                                "-"
                            }
                        </span>

                    </div>

                </div>


                {/* Basic Information */}

                <div className="medicine-details-section">

                    <h3>
                        Medicine Information
                    </h3>


                    <div className="medicine-details-grid">

                        <div>

                            <label>
                                Medicine ID
                            </label>

                            <strong>
                                {
                                    medicine.medicine_id ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Medicine Name
                            </label>

                            <strong>
                                {
                                    medicine.medicine_name ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Category
                            </label>

                            <strong>
                                {
                                    medicine.medicine_type ||
                                    "-"
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Manufacturer
                            </label>

                            <strong>
                                {
                                    medicine.manufacturer_name ||
                                    "-"
                                }
                            </strong>

                        </div>

                    </div>
                             <div className="medicine-restock">

    <label>
        Restock Quantity
    </label>

    <div className="medicine-restock-controls">

        <input
            type="number"
            min="1"
            placeholder="Enter quantity"
            value={restockQuantity}
            onChange={(e) =>
                setRestockQuantity(e.target.value)
            }
        />

        <button
            type="button"
            onClick={handleRestock}
            disabled={restocking}
        >
            {restocking
                ? "Restocking..."
                : "Restock"}
        </button>

    </div>

</div>
                </div>


                {/* Stock Information */}

                <div className="medicine-details-section">

                    <h3>
                        Stock Information
                    </h3>


                    <div className="medicine-details-grid">

                        <div>

                            <label>
                                Current Stock
                            </label>

                            <strong className="medicine-stock-value">
                                {
                                    medicine.stock_quantity ??
                                    0
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Quantity
                            </label>

                            <strong>
                                {
                                    medicine.quantity ??
                                    0
                                }
                            </strong>

                        </div>


                        <div>

                            <label>
                                Price Per Unit
                            </label>

                            <strong>
                                ₹
                                {Number(
                                    medicine.price_per_unit ||
                                    0
                                ).toFixed(2)}
                            </strong>

                        </div>


                        <div>

                            <label>
                                Status
                            </label>

                            <span
                                className={`medicine-details-status ${
                                    status
                                        .toLowerCase()
                                        .replaceAll(
                                            " ",
                                            "-"
                                        )
                                }`}
                            >
                                {status}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Dates */}

                <div className="medicine-details-section">

                    <h3>
                        Date Information
                    </h3>


                    <div className="medicine-details-grid">

                        <div>

                            <label>
                                Manufacture Date
                            </label>

                            <strong>
                                {formatDate(
                                    medicine.manufacture_date
                                )}
                            </strong>

                        </div>


                        <div>

                            <label>
                                Expiry Date
                            </label>

                            <strong>
                                {formatDate(
                                    medicine.expiry_date
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Footer */}

                <div className="medicine-details-footer">

                    <button
                        className="medicine-details-close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}

export default MedicineDetailsPopup;