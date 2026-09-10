import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/appointments/";

export const getAppointments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addAppointment = async (appointmentData) => {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
};