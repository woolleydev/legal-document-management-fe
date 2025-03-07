import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadDocument = async (fileName: string, filePath: string) => {
    try {
        const response = await axios.post(API_URL, { fileName, filePath });
        return response.data;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};
