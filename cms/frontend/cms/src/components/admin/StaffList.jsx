

import { useEffect, useState } from "react";
import "./StaffList.css";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";
import { getStaff, deactivateStaff ,activateStaff} from "../../services/staffService";

function StaffList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
    // Fetch staff from backend
    useEffect(() => {

        const fetchStaff = async () => {

            try {

                const data = await getStaff();

                console.log("STAFF API DATA:", data);

                setStaff(data);

            } catch (error) {

                console.error("Error fetching staff:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchStaff();

    }, []);

    // Search
    const filteredStaff = staff.filter((member) => {

        const search = searchTerm.toLowerCase();

        return (
            String(member.staff_id)
                .toLowerCase()
                .includes(search) ||

            String(member.name)
                .toLowerCase()
                .includes(search) ||

            String(member.department)
                .toLowerCase()
                .includes(search) ||

            String(member.phone)
                .toLowerCase()
                .includes(search)
        );
    });

    const handleAddStaff = () => {
        console.log("Add Staff clicked");
    };

 const handleEditStaff = (member) => {
    setSelectedStaff(member);
};
 const handleDeactivateStaff = async (member) => {

    const confirmDeactivate = window.confirm(
        `Are you sure you want to deactivate ${member.name}?`
    );

    if (!confirmDeactivate) {
        return;
    }

    try {

        const updatedStaff = await deactivateStaff(member.id);

        setStaff((prevStaff) =>
            prevStaff.map((staffMember) =>
                staffMember.id === member.id
                    ? updatedStaff
                    : staffMember
            )
        );

        console.log("Staff deactivated successfully");

    } catch (error) {

        console.error(
            "Error deactivating staff:",
            error
        );

        console.log(
            "Response:",
            error.response?.data
        );

        alert("Failed to deactivate staff");
    }
};
    const handleActivateStaff = async (member) => {

    const confirmActivate = window.confirm(
        `Are you sure you want to activate ${member.name}?`
    );

    if (!confirmActivate) {
        return;
    }

    try {

        const updatedStaff = await activateStaff(member.id);

        setStaff((prevStaff) =>
            prevStaff.map((staffMember) =>
                staffMember.id === member.id
                    ? updatedStaff
                    : staffMember
            )
        );

        console.log("Staff activated successfully");

    } catch (error) {

        console.error(
            "Error activating staff:",
            error
        );

        alert("Failed to activate staff");
    }
};
    return (
        <div className="staff-section">

            {/* Add Staff + Search */}
            <div className="staff-controls">

                <button
                    className="add-staff-button"
                    onClick={() => setShowAddStaff(true)}
                >
                    <span>+</span>
                    Add Staff
                </button>

                <div className="staff-search-container">

                    <span className="staff-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                </div>

            </div>

            {/* Loading */}
            {loading ? (

                <p>Loading staff...</p>

            ) : (

                /* Staff Table */
                <div className="staff-table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Staff ID</th>
                                <th>Staff Name</th>
                                <th>Department</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredStaff.length > 0 ? (

                                filteredStaff.map((member) => (

                                    <tr key={member.staff_id}>

                                        {/* Staff ID */}
                                        <td>
                                            {member.staff_id}
                                        </td>

                                        {/* Name */}
                                        <td>
                                            {member.name}
                                        </td>

                                        {/* Department */}
                                        <td>
                                            {member.department}
                                        </td>

                                        {/* Phone */}
                                        <td>
                                            {member.phone}
                                        </td>

                                        {/* Status */}
                                        <td>

                                            <span
                                                className={`staff-status ${
                                                    member.status
                                                        ?.toLowerCase()
                                                        .replace(" ", "-")
                                                }`}
                                            >
                                                {member.status}
                                            </span>

                                        </td>

                                        {/* Actions */}
                                        <td>

                                            <div className="staff-action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        handleEditStaff(member)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                               {/* <button
    className="deactivate-button"
    onClick={() =>
        handleDeactivateStaff(member)
    }
    disabled={member.is_active === false}
>
    {member.is_active === false
        ? "Inactive"
        : "Deactivate"}
</button> */}
{member.is_active ? (

    <button
        className="deactivate-button"
        onClick={() =>
            handleDeactivateStaff(member)
        }
    >
        Deactivate
    </button>

) : (

    <button
        className="activate-button"
        onClick={() =>
            handleActivateStaff(member)
        }
    >
        Activate
    </button>

)}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-staff"
                                    >
                                        No staff found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}
       {showAddStaff && (
    <AddStaff
        onClose={() => setShowAddStaff(false)}
        onStaffAdded={(newStaff) => {
            setStaff((prevStaff) => [
                ...prevStaff,
                newStaff
            ]);
        }}
    />
)}

{selectedStaff && (
    <EditStaff
        staff={selectedStaff}
        onClose={() => setSelectedStaff(null)}
        onStaffUpdated={(updatedStaff) => {
            setStaff((prevStaff) =>
                prevStaff.map((member) =>
                    member.staff_id === updatedStaff.staff_id
                        ? updatedStaff
                        : member
                )
            );
        }}
    />
)}
        </div>
    );
}

export default StaffList;
