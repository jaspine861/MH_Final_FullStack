import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/bills/";

export const getBills = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createBill = async (billData) => {
    const response = await axios.post(
        API_URL,
        billData
    );

    return response.data;
};

export const getBill = async (billId) => {
    const response = await axios.get(
        `${API_URL}${billId}/`
    );

    return response.data;
};