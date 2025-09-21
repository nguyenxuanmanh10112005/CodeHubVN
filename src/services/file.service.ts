import { apiClient } from '@/lib/axios';
import { ApiResponse } from '@/types/api';

export interface FileResponse {
    fileName: string;
    fileType: string;
    url: string;
}

export const fileApi = {
    // POST /files/minio/upload - Upload file to Minio
    uploadFile: async (file: File): Promise<ApiResponse<FileResponse>> => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await apiClient.post<ApiResponse<FileResponse>>(
            '/files/minio/upload', 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    },

    // Helper function to upload multiple files
    uploadFiles: async (files: File[]): Promise<FileResponse[]> => {
        const uploadPromises = files.map(file => fileApi.uploadFile(file));
        const responses = await Promise.all(uploadPromises);
        return responses.map(response => response.result);
    }
};