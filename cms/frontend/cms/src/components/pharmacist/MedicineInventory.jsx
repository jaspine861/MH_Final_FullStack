import { useEffect, useState } from "react";
import "./MedicineInventory.css";
import MedicineDetailsPopup from "./MedicineDetailsPopup";
import { getMedicines } from "../../services/medicineService";

function MedicineInventory() {

    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
     const [selectedMedicine, setSelectedMedicine] = useState(null);
const [showMedicineDetails, setShowMedicineDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    // Fetch medicines
    useEffect(() => {

        const fetchMedicines = async () => {

            try {

                setLoading(true);

                const data = await getMedicines();

                console.log("MEDICINES:", data);

                setMedicines(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Error fetching medicines:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        fetchMedicines();

    }, []);


    // Get medicine status
    const getMedicineStatus = (medicine) => {

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


    // Status CSS class
    const getStatusClass = (status) => {

        switch (status) {

            case "Available":
                return "available";

            case "Low Stock":
                return "low-stock";

            case "Out of Stock":
                return "out-of-stock";

            case "Expired":
                return "expired";

            default:
                return "";
        }
    };


    // Format expiry date
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


    // Search
    const filteredMedicines = medicines.filter(
        (medicine) => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();

            if (!search) {
                return true;
            }

            return (

                String(
                    medicine.medicine_id || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    medicine.medicine_name || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    medicine.medicine_type || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    medicine.manufacturer_name || ""
                )
                    .toLowerCase()
                    .includes(search)

            );

        }
    );


    // Open medicine
   const handleOpenMedicine = (medicine) => {

    setSelectedMedicine(medicine);

    setShowMedicineDetails(true);

};


    return (

        <div className="medicine-inventory">

            {/* Header */}

            <div className="medicine-page-header">

                <div>

                    <h2>
                        Medicine Inventory
                    </h2>

                    <p>
                        View medicine stock and expiry information
                    </p>

                </div>

            </div>


            {/* Search */}

            <div className="medicine-controls">

                <div className="medicine-search">

                    <span className="medicine-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search medicine..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            {/* Result Count */}

            {!loading && (

                <div className="medicine-result-count">

                    Showing{" "}

                    <strong>
                        {filteredMedicines.length}
                    </strong>{" "}

                    medicine
                    {filteredMedicines.length !== 1
                        ? "s"
                        : ""}

                </div>

            )}


            {/* Table */}

            {loading ? (

                <div className="medicine-loading">
                    Loading medicines...
                </div>

            ) : (

                <div className="medicine-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Medicine ID
                                </th>

                                <th>
                                    Medicine
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Stock
                                </th>

                                <th>
                                    Expiry
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

                            {filteredMedicines.length > 0 ? (

                                filteredMedicines.map(
                                    (medicine) => {

                                        const status =
                                            getMedicineStatus(
                                                medicine
                                            );

                                        return (

                                            <tr
                                                key={
                                                    medicine.medicine_id
                                                }
                                            >

                                                {/* Medicine ID */}

                                                <td>

                                                    <strong>
                                                        {
                                                            medicine.medicine_id
                                                        }
                                                    </strong>

                                                </td>


                                                {/* Medicine */}

                                                <td>

                                                    <div className="medicine-name-cell">

                                                        <div className="medicine-avatar">

                                                            {String(
                                                                medicine.medicine_name ||
                                                                "M"
                                                            )
                                                                .charAt(0)
                                                                .toUpperCase()}

                                                        </div>

                                                        <div>

                                                            <strong>
                                                                {
                                                                    medicine.medicine_name ||
                                                                    "-"
                                                                }
                                                            </strong>

                                                            <span>
                                                                {
                                                                    medicine.manufacturer_name ||
                                                                    "-"
                                                                }
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* Category */}

                                                <td>

                                                    <span className="medicine-category">

                                                        {
                                                            medicine.medicine_type ||
                                                            "-"
                                                        }

                                                    </span>

                                                </td>


                                                {/* Stock */}

                                                <td>

                                                    <strong
                                                        className={
                                                            Number(
                                                                medicine.stock_quantity
                                                            ) === 0
                                                                ? "stock-zero"
                                                                : Number(
                                                                    medicine.stock_quantity
                                                                ) <= 10
                                                                    ? "stock-low"
                                                                    : "stock-normal"
                                                        }
                                                    >
                                                        {
                                                            medicine.stock_quantity ??
                                                            0
                                                        }
                                                    </strong>

                                                </td>


                                                {/* Expiry */}

                                                <td>

                                                    {
                                                        formatDate(
                                                            medicine.expiry_date
                                                        )
                                                    }

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    <span
                                                        className={`medicine-status ${getStatusClass(
                                                            status
                                                        )}`}
                                                    >

                                                        {status}

                                                    </span>

                                                </td>


                                                {/* Action */}

                                                <td>

                                                    <button
                                                        className="medicine-action-button"
                                                        onClick={() =>
                                                            handleOpenMedicine(
                                                                medicine
                                                            )
                                                        }
                                                    >
                                                        Open
                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-medicines"
                                    >

                                        <div>

                                            <span>
                                                💊
                                            </span>

                                            <p>
                                                No medicines found
                                            </p>

                                            <small>
                                                Try changing your
                                                search.
                                            </small>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
{showMedicineDetails && selectedMedicine && (

    <MedicineDetailsPopup

        medicine={selectedMedicine}

        onClose={() => {

            setShowMedicineDetails(false);

            setSelectedMedicine(null);

        }}

    />

)}
        </div>

    );

}

export default MedicineInventory;