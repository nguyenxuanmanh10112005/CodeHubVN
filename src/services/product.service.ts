import { apiClient } from '@/lib/axios';
import {
    ApiResponse,
    CreateProductRequest,
    CreateProductResponse,
    ProductDetailResponse,
    UpdateProductRequest,
    UpdateProductResponse,
    PageResponse
} from '@/types/api';

export const productApi = {
    getAllProducts: async () => {
        try {
            const response = await apiClient.get<ApiResponse<ProductDetailResponse[]>>('/products');
            return response.data;
        } catch (error) {
            console.warn('GET /products endpoint not available in backend');
            return {
                code: 200,
                message: 'No products endpoint available',
                result: []
            };
        }
    },

    // Note: There's no GET /products/featured endpoint in backend
    getFeaturedProducts: async (limit?: number) => {
        console.warn('GET /products/featured endpoint not available in backend');
        return {
            code: 200,
            message: 'Featured products not available',
            result: []
        };
    },

    createProduct: async (data: CreateProductRequest) => {
        const response = await apiClient.post<ApiResponse<CreateProductResponse>>('/products', data);
        return response.data;
    },

    getProduct: async (id: string) => {
        const response = await apiClient.get<ApiResponse<ProductDetailResponse>>(`/products/${id}`);
        return response.data;
    },

    updateProduct: async (data: UpdateProductRequest) => {
        const response = await apiClient.put<ApiResponse<UpdateProductResponse>>('/products', data);
        return response.data;
    },

    deleteProduct: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<void>>(`/products/${id}`);
        return response.data;
    }

};