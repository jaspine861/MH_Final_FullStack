import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/lab-tests/";


export const getTests = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};


export const addTest = async (testData) => {

    const response = await axios.post(
        API_URL,
        testData
    );

    return response.data;

};


export const getTest = async (id) => {

    const response = await axios.get(
        `${API_URL}${id}/`
    );

    return response.data;

};


export const updateTest = async (id, testData) => {

    const response = await axios.put(
        `${API_URL}${id}/`,
        testData
    );

    return response.data;

};


export const deleteTest = async (id) => {

    const response = await axios.delete(
        `${API_URL}${id}/`
    );

    return response.data;

};