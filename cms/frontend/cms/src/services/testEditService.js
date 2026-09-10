import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/lab-tests/";

export const editTest = async (databaseId, testData) => {
    const response = await axios.patch(
        `${API_URL}${databaseId}/`,
        testData
    );

    return response.data;
};