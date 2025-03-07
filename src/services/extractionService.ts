import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;    

export const getExtractions = async (documentId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${documentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching extractions:", error);
        throw error;
    }
};
