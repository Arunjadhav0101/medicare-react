import axios from 'axios';

const API_URL = '/api/bloodbank';

export const getBloodInventory = async () => {
    const response = await axios.get(`${API_URL}/inventory`);
    return response.data;
};

export const registerDonor = async (donorData: any) => {
    const response = await axios.post(`${API_URL}/donate`, donorData);
    return response.data;
};

export const requestBlood = async (requestData: any) => {
    // requestData should now include user_id if available
    const response = await axios.post(`${API_URL}/request`, requestData);
    return response.data;
};

export const getUserRequests = async (userId: string | number) => {
    const response = await axios.get(`${API_URL}/requests/user/${userId}`);
    return response.data;
};

export const getDonors = async () => {
    const response = await axios.get(`${API_URL}/donors`);
    return response.data;
};

export const getRequests = async () => {
    const response = await axios.get(`${API_URL}/requests`);
    return response.data;
};

export const updateDonorStatus = async (id: number, status: string) => {
    const response = await axios.put(`${API_URL}/donors/${id}/status`, { status });
    return response.data;
};

export const updateRequestStatus = async (id: number, status: string) => {
    const response = await axios.put(`${API_URL}/requests/${id}/status`, { status });
    return response.data;
};
