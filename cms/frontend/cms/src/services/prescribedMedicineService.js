// import axios from "axios";

// const API_URL =
//     "http://127.0.0.1:8000/api/v1/prescribed-medicines/";

// export const getPrescribedMedicines = async () => {

//     const response = await axios.get(API_URL);

//     return response.data;
// };


// export const updatePrescribedMedicineStatus = async (
//     prescriptionId,
//     status
// ) => {

//     const response = await axios.patch(
//         `${API_URL}${prescriptionId}/`,
//         {
//             status: status
//         }
//     );

//     return response.data;
// };
import axios from "axios";

const API_URL =
    "http://127.0.0.1:8000/api/v1/prescribed-medicines/";

export const getPrescribedMedicines = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updatePrescribedMedicineStatus = async (
    prescriptionId,
    status
) => {
    const response = await axios.patch(
        `${API_URL}${prescriptionId}/`,
        {
            status,
        }
    );

    return response.data;
};

export const getMedicinesByConsultation = async (consultationId) => {
    const response = await axios.get(
        `${API_URL}consultation/${consultationId}/`
    );

    return response.data;
};