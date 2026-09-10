import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/lab-bills/";


// Get all laboratory bills
export const getLabBills = async () => {

    const response = await axios.get(API_URL);

    return response.data;
};


// Create laboratory bill
export const createLabBill = async (billData) => {

    const response = await axios.post(
        API_URL,
        billData
    );

    return response.data;
};


// Get single laboratory bill
export const getLabBill = async (id) => {

    const response = await axios.get(
        `${API_URL}${id}/`
    );

    return response.data;
};