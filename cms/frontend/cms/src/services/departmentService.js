import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/departments/";

export const getDepartments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addDepartment = async (departmentData) => {
    const response = await axios.post(API_URL, departmentData);
    return response.data;
};

export const updateDepartment = async (id, departmentData) => {
    const response = await axios.put(
        `${API_URL}${id}/`,
        departmentData
    );
    return response.data;
};

export const deactivateDepartment = async (id) => {
    const response = await axios.patch(
        `${API_URL}${id}/`,
        { is_active: false }
    );
    return response.data;
};

