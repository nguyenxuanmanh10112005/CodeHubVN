import { ApiResponse } from '@/types/api';
import { apiClient } from '@/lib/axios';

interface CreateQrSePayRequest {
    amount: number;
    description: string;
}

export const paymentApi = {
    async createQrSePay(request: CreateQrSePayRequest): Promise<string> {
        const response = await apiClient.post<ApiResponse<string>>('/payments/sepay/creation', request);
        return response.data.result;
    }
};
