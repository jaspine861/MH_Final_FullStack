import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/doctor/login/";

export const doctorLogin = async (loginData) => {
    const response = await axios.post(API_URL, loginData);
    return response.data;
};