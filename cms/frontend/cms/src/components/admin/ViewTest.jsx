// import "./ViewTest.css";

// function ViewTest({ test, onClose, onEdit, onDelete }) {

//     return (
//         <div className="view-test-overlay">

//             <div className="view-test-card">

//                 {/* Header */}
//                 <div className="view-test-header">

//                     <div>
//                         <h2>Test Details</h2>
//                         <p>Laboratory test information</p>
//                     </div>

//                     <button
//                         className="view-test-close-icon"
//                         onClick={onClose}
//                     >
//                         ×
//                     </button>

//                 </div>


//                 {/* Details */}
//                 <div className="test-details">

//                     <div className="test-detail-item">
//                         <label>Test ID</label>
//                         <span>{test.test_id}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Test Name</label>
//                         <span>{test.test_name}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Category</label>
//                         <span>{test.category}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Normal Range</label>
//                         <span>{test.range_normal || "-"}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Sample Required</label>
//                         <span>{test.sample_required}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Unit</label>
//                         <span>{test.unit || "-"}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Department</label>
//                         <span>{test.department}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>TAT</label>
//                         <span>{test.tat}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Price</label>
//                         <span>₹{test.price}</span>
//                     </div>

//                     <div className="test-detail-item">
//                         <label>Status</label>
//                         <span>{test.status}</span>
//                     </div>

//                     <div className="test-detail-item full-width">
//                         <label>Description</label>
//                         <span>
//                             {test.description || "-"}
//                         </span>
//                     </div>

//                 </div>


//                 {/* Actions */}
//                 <div className="view-test-actions">

//                     <button
//                         className="edit-test-button"
//                         onClick={() => onEdit(test)}
//                     >
//                         Edit
//                     </button>

//                     <button
//                         className="delete-test-button"
//                         onClick={() => onDelete(test)}
//                     >
//                         Delete
//                     </button>

//                     <button
//                         className="close-test-button"
//                         onClick={onClose}
//                     >
//                         Close
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ViewTest;

import "./ViewTest.css";

function ViewTest({ test, onClose, onEdit }) {


if (!test) {
    return null;
}

return (
    <div className="view-test-overlay">

        <div className="view-test-card">

            {/* HEADER */}
            <div className="view-test-header">

                <div>
                    <h2>Laboratory Test Details</h2>
                    <p>View laboratory test information</p>
                </div>

                <button
                    type="button"
                    className="close-button"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {/* TEST DETAILS */}
            <div className="test-details">

                <div className="detail-group">
                    <label>Test ID</label>
                    <p>{test.test_id}</p>
                </div>

                <div className="detail-group">
                    <label>Test Name</label>
                    <p>{test.test_name}</p>
                </div>

                <div className="detail-group">
                    <label>Normal Range</label>
                    <p>{test.normal_range}</p>
                </div>

                <div className="detail-group">
                    <label>Sample Required</label>
                    <p>{test.sample_required}</p>
                </div>

                <div className="detail-group">
                    <label>Unit</label>
                    <p>{test.unit}</p>
                </div>

                <div className="detail-group">
                    <label>Department</label>
                    <p>{test.department}</p>
                </div>

                <div className="detail-group">
                    <label>TAT</label>
                    <p>{test.tat}</p>
                </div>

                <div className="detail-group">
                    <label>Price</label>
                    <p>₹{test.price}</p>
                </div>

                <div className="detail-group">
                    <label>Status</label>

                    <span
                        className={
                            test.status === "Available"
                                ? "view-status available"
                                : "view-status maintenance"
                        }
                    >
                        {test.status}
                    </span>

                </div>

                <div className="detail-group full-width">
                    <label>Description</label>
                    <p>
                        {test.description || "No description available"}
                    </p>
                </div>

            </div>


            {/* ACTIONS */}
            <div className="view-test-actions">

                <button
                    type="button"
                    className="cancel-button"
                    onClick={onClose}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(test)}
                >
                    Edit
                </button>

            </div>

        </div>

    </div>
);


}

export default ViewTest;