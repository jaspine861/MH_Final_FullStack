import { useEffect, useState } from "react";
import "./BillingManagement.css";

import { getAppointmentBills } from "../../services/appointmentBillService";

import AppointmentBillPopup from "./AppointmentBillPopup";
function BillingManagement() {

const [bills, setBills] = useState([]);
const [loading, setLoading] = useState(true);

const [searchTerm, setSearchTerm] = useState("");

const [selectedBill, setSelectedBill] = useState(null);
const [showBill, setShowBill] = useState(false);


// Fetch bills
useEffect(() => {

    const fetchBills = async () => {

        try {

            setLoading(true);

            const data = await getAppointmentBills();

            console.log("APPOINTMENT BILLS:", data);

            setBills(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading bills:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    fetchBills();

}, []);


// Search
const filteredBills = bills.filter((bill) => {

    const search =
        searchTerm
            .trim()
            .toLowerCase();

    if (!search) {
        return true;
    }

    return (

        String(
            bill.appointment_number || ""
        )
            .toLowerCase()
            .includes(search) ||

        String(
            bill.patient_name || ""
        )
            .toLowerCase()
            .includes(search) ||

        String(
            bill.patient_id || ""
        )
            .toLowerCase()
            .includes(search) ||

        String(
            bill.doctor_name || ""
        )
            .toLowerCase()
            .includes(search) ||

        String(
            bill.department || ""
        )
            .toLowerCase()
            .includes(search) ||

        String(
            bill.id || ""
        )
            .toLowerCase()
            .includes(search)

    );

});


// Open bill
const handleOpenBill = (bill) => {

    setSelectedBill(bill);

    setShowBill(true);

};


return (

    <div className="billing-management">


        {/* Header */}

        <div className="billing-page-header">

            <div>

                <h2>
                    Billing Management
                </h2>

                <p>
                    View and manage appointment bills
                </p>

            </div>

        </div>


        {/* Search */}

        <div className="billing-controls">

            <div className="billing-search">

                <span>
                    ⌕
                </span>

                <input
                    type="text"
                    placeholder="Search bill, patient, doctor..."
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

            <div className="billing-result-count">

                Showing{" "}

                <strong>
                    {filteredBills.length}
                </strong>{" "}

                bill
                {filteredBills.length !== 1
                    ? "s"
                    : ""}

            </div>

        )}


        {/* Table */}

        {loading ? (

            <div className="billing-loading">
                Loading bills...
            </div>

        ) : (

            <div className="billing-table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Bill ID
                            </th>

                            <th>
                                Patient
                            </th>

                            <th>
                                Department
                            </th>

                            <th>
                                Amount
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

                        {filteredBills.length > 0 ? (

                            filteredBills.map(
                                (bill) => (

                                    <tr
                                        key={bill.id}
                                    >

                                        {/* Bill ID */}

                                        <td>

                                            <strong>
                                                BILL
                                                {String(
                                                    bill.id
                                                ).padStart(
                                                    3,
                                                    "0"
                                                )}
                                            </strong>

                                        </td>


                                        {/* Patient */}

                                        <td>

                                            <div className="billing-patient-cell">

                                                <div className="billing-patient-avatar">

                                                    {String(
                                                        bill.patient_name ||
                                                        "P"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()}

                                                </div>

                                                <div>

                                                    <strong>
                                                        {
                                                            bill.patient_name ||
                                                            "-"
                                                        }
                                                    </strong>

                                                    <span>
                                                        P
                                                        {String(
                                                            bill.patient_id
                                                        ).padStart(
                                                            3,
                                                            "0"
                                                        )}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Department */}

                                        <td>

                                            <span className="billing-department">

                                                {
                                                    bill.department ||
                                                    "-"
                                                }

                                            </span>

                                        </td>


                                        {/* Amount */}

                                        <td>

                                            <strong className="billing-amount">

                                                ₹
                                                {Number(
                                                    bill.amount || 0
                                                ).toFixed(2)}

                                            </strong>

                                        </td>


                                        {/* Status */}

                                        <td>

                                            <span
                                                className={`billing-status ${
                                                    bill.payment_status
                                                        ?.toLowerCase() ===
                                                    "paid"
                                                        ? "paid"
                                                        : "pending"
                                                }`}
                                            >

                                                {
                                                    bill.payment_status
                                                        ? bill.payment_status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                          bill.payment_status.slice(
                                                              1
                                                          )
                                                        : "Pending"
                                                }

                                            </span>

                                        </td>


                                        {/* Action */}

                                        <td>

                                            <button
                                                className="open-bill-button"
                                                onClick={() =>
                                                    handleOpenBill(
                                                        bill
                                                    )
                                                }
                                            >
                                                Open
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="no-bills"
                                >

                                    <div>

                                        <span>
                                            ₹
                                        </span>

                                        <p>
                                            No bills found
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


        {/* Bill Popup */}

        {showBill &&
            selectedBill && (

               <AppointmentBillPopup
    bill={selectedBill}
    onClose={() => {
        setShowBill(false);
        setSelectedBill(null);
    }}
/>

            )}

    </div>

);

}

export default BillingManagement;
