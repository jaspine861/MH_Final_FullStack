import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/staff/";

// Get all staff
export const getStaff = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get single staff member
export const getStaffById = async (id) => {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
};

// Add new staff
export const addStaff = async (staffData) => {
    const response = await axios.post(API_URL, staffData);
    return response.data;
};

// Update staff
export const updateStaff = async (id, staffData) => {
    const response = await axios.put(
        `${API_URL}${id}/`,
        staffData
    );
    return response.data;
};

// Delete staff
export const deleteStaff = async (id) => {
    const response = await axios.delete(
        `${API_URL}${id}/`
    );
    return response.data;
};

export const deactivateStaff = async (id) => {
    const response = await axios.patch(
        `${API_URL}${id}/`,
        {
            is_active: false,
            status: "Inactive"
        }
    );

    return response.data;
};

export const activateStaff = async (id) => {
    const response = await axios.patch(
        `${API_URL}${id}/`,
        {
            is_active: true,
            status: "Active"
        }
    );

    return response.data;
};