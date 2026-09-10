import axios from "axios";

const LAB_TEST_API = "http://127.0.0.1:8000/api/v1/lab-tests/";
const PRESCRIBED_LAB_API =
    "http://127.0.0.1:8000/api/v1/PrescribedLab/";


// Get all available lab tests
export const getAvailableTests = async () => {
    const response = await axios.get(LAB_TEST_API);
    return response.data;
};


// Get all prescribed lab tests
export const getPrescribedTests = async () => {
    const response = await axios.get(PRESCRIBED_LAB_API);
    return response.data;
};