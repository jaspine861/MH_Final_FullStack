import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/patients/";

export const getPatients = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addPatient = async (patientData) => {
    const response = await axios.post(API_URL, patientData);
    return response.data;
};


export const updatePatient = async (id, patientData) => { const response = await axios.put( `${API_URL}${id}/`, patientData ); return response.data; };