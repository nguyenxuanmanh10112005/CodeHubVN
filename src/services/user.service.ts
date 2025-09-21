import { apiClient } from '@/lib/axios';
import { ApiResponse, UserDetailResponse, PageResponse, UserStatus, CreateUserRequest } from '@/types/api';

export interface UserSearchParams {
    page?: number;
    search?: string;
}

export const userApi = {
    getAllUsers: async () => {
        const response = await apiClient.get<ApiResponse<UserDetailResponse[]>>('/api/v1/users');
        return response.data;
    },

    create: async (data: { username: string; email: string; password: string }) => {
        const response = await apiClient.post<ApiResponse<CreateUserRequest>>('/api/v1/users', data);
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<ApiResponse<UserDetailResponse>>(`/api/v1/users/${id}`);
        return response.data;
    },

    deleteById: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<void>>(`/api/v1/users/${id}`);
        return response.data;
    }

};