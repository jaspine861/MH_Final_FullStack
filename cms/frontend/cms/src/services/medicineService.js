import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/medicines/";

export const getMedicines = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addMedicine = async (medicineData) => {
    const response = await axios.post(API_URL, medicineData);
    return response.data;
};

export const updateMedicine = async (id, medicineData) => {

    const response = await axios.put(
        `${API_URL}${id}/`,
        medicineData
    );

    return response.data;
};