import { useEffect, useState } from "react";
import "./MedicineList.css";
import { getMedicines } from "../../services/medicineService";
import AddMedicine from "./addMedicine";
import MedicineDetails from "./MedicineDetails";
import EditMedicinePopup from "./EditMedicinePopup";

function MedicineList() {

    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [showAddMedicine, setShowAddMedicine] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [editMedicine, setEditMedicine] = useState(null);

    useEffect(() => {

        const fetchMedicines = async () => {

            try {

                const data = await getMedicines();

                console.log("MEDICINE API DATA:", data);

                setMedicines(data);

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


    const getStockStatus = (stock) => {

        if (stock === 0) {
            return "Out of Stock";
        }

        if (stock <= 10) {
            return "Low Stock";
        }

        return "In Stock";
    };


    const filteredMedicines = medicines.filter((medicine) => {

        const search = searchTerm.toLowerCase();

        return (
            String(medicine.medicine_id)
                .toLowerCase()
                .includes(search) ||

            String(medicine.medicine_name)
                .toLowerCase()
                .includes(search) ||

            String(medicine.medicine_type)
                .toLowerCase()
                .includes(search)
        );

    });


  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
};


    return (
        <div className="medicine-section">

            {/* Controls */}
            <div className="medicine-controls">

                {/* Add Medicine */}
             <button
    className="add-medicine-button"
    onClick={() => setShowAddMedicine(true)}
>
    <span>+</span>
    Add Medicine
</button>


                {/* Search */}
                <div className="medicine-search-container">

                    <span className="medicine-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search medicines..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>


            {/* Loading */}
            {loading ? (

                <p>Loading medicines...</p>

            ) : (

                <div className="medicine-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Medicine ID</th>
                                <th>Medicine</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Expiry</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>


                        <tbody>

                            {filteredMedicines.length > 0 ? (

                                filteredMedicines.map(
                                    (medicine) => {

                                        const status =
                                            getStockStatus(
                                                medicine.stock_quantity
                                            );

                                        return (

                                            <tr
                                                key={
                                                    medicine.medicine_id
                                                }
                                            >

                                                <td>
                                                    {
                                                        medicine.medicine_id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.medicine_name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.medicine_type
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.stock_quantity
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.expiry_date
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`medicine-status ${
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

                                                </td>

                                                <td>

                                                    <button
                                                        className="view-medicine-button"
                                                        onClick={() =>
                                                            handleViewMedicine(
                                                                medicine
                                                            )
                                                        }
                                                    >
                                                        View
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
                                        style={{
                                            textAlign: "center",
                                            padding: "25px"
                                        }}
                                    >
                                        No medicines found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
      {showAddMedicine && (
    <AddMedicine
        onClose={() => setShowAddMedicine(false)}
        onMedicineAdded={(newMedicine) => {
            setMedicines((prevMedicines) => [
                ...prevMedicines,
                newMedicine
            ]);
        }}
    />
)}
{selectedMedicine && (
    <MedicineDetails
        medicine={selectedMedicine}

        onClose={() => setSelectedMedicine(null)}

        onEdit={(medicine) => {
            setSelectedMedicine(null);
            setEditMedicine(medicine);
        }}

        onDelete={(medicine) => {
            console.log("Delete:", medicine);
        }}

        onRestock={(medicine) => {
            console.log("Restock:", medicine);
        }}
    />
)}
{editMedicine && (
    <EditMedicinePopup
        medicine={editMedicine}

        onClose={() => {
            setEditMedicine(null);
        }}

        onMedicineUpdated={(updatedMedicine) => {

            setMedicines((prevMedicines) =>
                prevMedicines.map((medicine) =>
                    medicine.medicine_id ===
                    updatedMedicine.medicine_id
                        ? updatedMedicine
                        : medicine
                )
            );

            setEditMedicine(null);
        }}
    />
)}
        </div>
    );
}

export default MedicineList;